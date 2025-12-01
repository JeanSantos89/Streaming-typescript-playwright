# README

Este repositório contém uma automação E2E utilizando Playwright e TypeScript.  
O objetivo é demonstrar organização, priorização e entrega de cenários reprodutíveis, utilizando uma fonte pública (TMDB) para evitar exposição de dados ou dependência de ambientes corporativos da WATCH.

A automação cobre fluxos essenciais, como: autenticação, paginação, ranking, pesquisas, validação de carregamento e exibição de detalhes de conteúdo.

---

# 1. Visão Geral do que foi Implementado

Os testes incluem:

- Login e logout  
- Paginação e ranking (logado e deslogado)  
- Pesquisas (falha, parcial e sucesso)  
- Validação completa do carregamento da Home  
- Exibição de detalhes de conteúdos 

Os testes foram organizados por páginas e responsabilidades, seguindo padrão POM.

---

# 2. Catálogo de Casos de Teste (CT01–CT14)

## Casos de Teste Atuais

| CT  | Página          | Nome                         | Contexto      | Descrição |
|-----|-----------------|------------------------------|----------------|-----------|
| CT01 | AuthPage | Login | Deslogado | Realizar login básico. |
| CT02 | AuthPage | Login + Logout | Logado | Validar fluxo completo de login/logout. |
| CT03 | InterestPage | InterestActions | Logado | Adicionar e remover itens de interesse. |
| CT04 | MoviesPage | RankingFilter | Logado | Aplicar filtros e validar resultados. |
| CT05 | MoviesPage | RankingFilter | Deslogado | Aplicar filtros sem login. |
| CT06 | PaginationPage | Pagination | Logado | Executar scroll e validar 3 listas paginadas. |
| CT07 | PaginationPage | Pagination | Deslogado | Scroll + paginação sem login. |
| CT08 | RankingPage | RankingActionsLogged | Logado | Acessar ranking autenticado. |
| CT09 | RankingPage | RankingActionsUnlogged | Deslogado | Acessar ranking sem login. |
| CT10 | HomePage | SearchFail | Geral | Buscar termo inexistente. |
| CT11 | HomePage | SearchHalf | Geral | Pesquisa parcial. |
| CT12 | HomePage | ExpectLoaded | Geral | Validar carregamento da Home. |
| CT13 | HomePage | SearchSuccess | Geral | Pesquisa básica com retorno. |
| CT14 | HomePage | MoviesCategoria | Geral | Exibir detalhes de conteúdo. |
---

# 4. Por que Playwright e TypeScript?

## 4.1 Por que Playwright?
Playwright foi escolhido por:

- suportar múltiplos browsers de forma nativa (Chromium, Firefox, WebKit);  
- oferecer isolamento real entre testes (contextos independentes);  
- possuir ótimo sistema de evidências (vídeo, trace, screenshots);  
- ter API moderna, estável e simples;  
- executar rápido e com paralelismo otimizado;  
- ser mais consistente que Selenium e Cypress em sites altamente dinâmicos.

Playwright hoje é referência para automações **E2E modernas**.

## 4.2 Por que TypeScript?
TypeScript foi escolhido porque:

- reduz erros comuns via tipagem estática;  
- facilita manutenção dos Page Objects (intellisense completo);  
- melhora leitura, escalabilidade e segurança do código;  
- é padrão atual em projetos modernos, especialmente os que usam Playwright;  
- elimina problemas de valores indefinidos, tipos incorretos e retorno inesperado.  

A combinação Playwright + TypeScript garante **confiabilidade, velocidade e qualidade**.

---

# 5. Como Executar (Reprodutibilidade)

### Pré-requisitos
- Node.js 18+  
- npm instalado  

### Instalar dependências
```
npm install
```

### Instalar navegadores
```
npx playwright install
```

### Executar todos os testes
```
npx playwright test
```

### Abrir relatório
```
npx playwright show-report evidence/report
```

Todos os testes rodam sem intervenção manual.

---

# 6. Evidências de Execução

As evidências completas encontram-se em:

```
evidence/
```

- Relatório HTML → `evidence
