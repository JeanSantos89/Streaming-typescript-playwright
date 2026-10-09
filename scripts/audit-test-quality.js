#!/usr/bin/env node
/**
 * Gate estático que audita os PRÓPRIOS testes, não só roda a suíte.
 *
 * Um teste pode ficar "verde" sem provar nada: clica em tudo certo e nunca
 * verifica o resultado (já aconteceu neste repo: bug de paginação e de geoIP
 * no filtro só apareceram porque alguém olhou o teste, não porque ele falhou).
 * Este script falha o build quando acha:
 *
 *   1) um `test(...)`/`it(...)` cujo corpo não tem nenhuma prova real —
 *      nem um `expect(` direto, nem uma chamada a um método de Page Object
 *      (src/pages, src/elements) que já tem `expect(` no próprio corpo;
 *   2) um assert tautológico óbvio: `expect(X).toBe(X)` com X idêntico,
 *      ou `expect(true).toBe(true)` / `expect(true).toBeTruthy()` com
 *      literal `true`.
 *
 * Uso: node scripts/audit-test-quality.js [glob...]
 * Sem argumento, varre tests/**\/*.spec.ts.
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');

function walk(dir, exts, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === 'node_modules') continue;
      walk(full, exts, out);
    } else if (exts.some((e) => entry.name.endsWith(e))) {
      out.push(full);
    }
  }
  return out;
}

// Dado o texto de um arquivo e o índice do `{` de abertura, devolve o índice
// do `}` que fecha esse bloco (contagem de chaves, ignora o que está dentro
// de strings/template literals/comentários de forma simples o suficiente
// para código de teste real).
function findBlockEnd(text, openBraceIdx) {
  let depth = 0;
  for (let i = openBraceIdx; i < text.length; i++) {
    const ch = text[i];
    if (ch === '{') depth++;
    else if (ch === '}') {
      depth--;
      if (depth === 0) return i;
    }
  }
  return -1;
}

// Extrai blocos `test('nome', async (...) => { ... })` ou `it(...)`.
function extractTestBlocks(text) {
  const blocks = [];
  const callRe = /\b(test|it)(?:\.(?:only|skip))?\s*\(\s*(['"`])((?:[^\\]|\\.)*?)\2\s*,/g;
  let m;
  while ((m = callRe.exec(text))) {
    const name = m[3];
    // O corpo começa no `{` que segue a seta `=>` (ou `function (...) {`),
    // não no primeiro `{` depois do nome — esse pode ser a desestruturação
    // dos parâmetros, ex.: `async ({ page }) => { ... }`.
    const arrowIdx = text.indexOf('=>', m.index);
    if (arrowIdx === -1) continue;
    const braceIdx = text.indexOf('{', arrowIdx);
    if (braceIdx === -1) continue;
    const endIdx = findBlockEnd(text, braceIdx);
    if (endIdx === -1) continue;
    blocks.push({ name, body: text.slice(braceIdx, endIdx + 1) });
    callRe.lastIndex = endIdx;
  }
  return blocks;
}

// Extrai métodos de classe `async nome(...) { ... }` ou `nome(...) { ... }`.
function extractMethods(text) {
  const methods = [];
  const methodRe = /(?:^|\n)\s*(?:private\s+|protected\s+|public\s+)?(?:async\s+)?([a-zA-Z_$][\w$]*)\s*\([^()]*\)\s*(?::\s*[^\{]+)?\{/g;
  let m;
  while ((m = methodRe.exec(text))) {
    const name = m[1];
    if (['constructor', 'if', 'for', 'while', 'switch', 'catch'].includes(name)) continue;
    const braceIdx = text.indexOf('{', m.index + m[0].length - 1);
    const openIdx = text.lastIndexOf('{', m.index + m[0].length);
    const realOpen = text.indexOf('{', m.index);
    if (realOpen === -1) continue;
    const endIdx = findBlockEnd(text, realOpen);
    if (endIdx === -1) continue;
    const body = text.slice(realOpen, endIdx + 1);
    methods.push({ name, body });
  }
  return methods;
}

function hasDirectExpect(body) {
  return /\bexpect\s*(?:\.\w+\s*)?\(/.test(body);
}

function callsProofMethod(body, proofMethodNames) {
  for (const name of proofMethodNames) {
    const re = new RegExp(`\\.${name}\\s*\\(`);
    if (re.test(body)) return name;
  }
  return null;
}

// expect(X).toBe(X) / toEqual(X) com X textualmente idêntico, ou
// expect(true).toBe(true) / toBeTruthy() com literal `true`.
function findTautologies(body) {
  const findings = [];
  const expectCallRe = /expect\s*\(\s*([^()]*?)\s*\)\s*\.\s*(toBe|toEqual|toStrictEqual|toBeTruthy)\s*\(\s*([^()]*?)\s*\)/g;
  let m;
  while ((m = expectCallRe.exec(body))) {
    const [full, arg, matcher, matcherArg] = m;
    if (matcher === 'toBeTruthy') {
      if (arg.trim() === 'true') findings.push(full);
      continue;
    }
    if (arg.trim() !== '' && arg.trim() === matcherArg.trim()) {
      findings.push(full);
    }
  }
  return findings;
}

function main() {
  const specFiles = walk(path.join(ROOT, 'tests'), ['.spec.ts']);
  const pageFiles = [
    ...walk(path.join(ROOT, 'src', 'pages'), ['.ts']),
    ...walk(path.join(ROOT, 'src', 'elements'), ['.ts']),
  ];

  // Monta o conjunto de métodos "prova" (têm expect no próprio corpo).
  // Propaga uma vez: método que chama outro método-prova também vira prova
  // (ex.: viewRankingAsGuest() -> navigateToTopRated() que tem expect()).
  const methodBodies = new Map(); // name -> body (última definição vence; nomes são únicos o bastante neste repo)
  for (const file of pageFiles) {
    const text = fs.readFileSync(file, 'utf8');
    for (const method of extractMethods(text)) {
      methodBodies.set(method.name, method.body);
    }
  }

  const proofMethods = new Set();
  for (const [name, body] of methodBodies) {
    if (hasDirectExpect(body)) proofMethods.add(name);
  }
  // Propagação transitiva (até estabilizar): método A que chama método-prova B vira prova também.
  let changed = true;
  while (changed) {
    changed = false;
    for (const [name, body] of methodBodies) {
      if (proofMethods.has(name)) continue;
      if (callsProofMethod(body, proofMethods)) {
        proofMethods.add(name);
        changed = true;
      }
    }
  }

  const violations = [];

  for (const file of specFiles) {
    const text = fs.readFileSync(file, 'utf8');
    const rel = path.relative(ROOT, file);
    for (const block of extractTestBlocks(text)) {
      const hasExpect = hasDirectExpect(block.body);
      const proofCall = callsProofMethod(block.body, proofMethods);

      if (!hasExpect && !proofCall) {
        violations.push({
          file: rel,
          test: block.name,
          reason: 'nenhum expect() direto e nenhuma chamada a método de Page Object que prove o resultado',
        });
      }

      for (const tauto of findTautologies(block.body)) {
        violations.push({
          file: rel,
          test: block.name,
          reason: `assert tautológico: ${tauto.replace(/\s+/g, ' ').trim()}`,
        });
      }
    }
  }

  if (violations.length === 0) {
    console.log(`audit-test-quality: ok (${specFiles.length} specs, ${proofMethods.size} métodos-prova identificados)`);
    process.exit(0);
  }

  console.error('audit-test-quality: encontrados testes sem prova real ou com assert tautológico:\n');
  for (const v of violations) {
    console.error(`  [${v.file}] "${v.test}" — ${v.reason}`);
  }
  console.error(`\nTotal: ${violations.length} problema(s).`);
  process.exit(1);
}

main();
