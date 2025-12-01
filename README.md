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

# 3. Importância de cada Caso de Teste
Por que cada fluxo é importante:

CT01 – Login (Deslogado)
Valida o fluxo mínimo de autenticação, pré-requisito para recursos personalizados e sincronizados.

CT02 – Login + Logout
Garante integridade do ciclo de sessão (criação, manutenção e destruição), crítico para segurança.

CT03 – InterestActions (Logado)
Valida operações CRUD de listas pessoais (ex.: “Minha Lista”), impactando retenção e recomendação.

CT04 – Filtros em Ranking (Logado)
Testa lógica de filtragem + personalização; essencial para algoritmos de descoberta.

CT05 – Filtros em Ranking (Deslogado)
Assegura que visitantes naveguem no catálogo sem limitações, aumentando conversão.

CT06 – Paginação (Logado)
Garante carregamento incremental de conteúdos com dados personalizados.

CT07 – Paginação (Deslogado)
Verifica escalabilidade do catálogo para usuários novos/visitantes.

CT08 – Ranking (Logado)
Testa acesso a rankings adaptados ao perfil, garantindo consistência das regras de negócio.

CT09 – Ranking (Deslogado)
Confirma exibição pública de conteúdos mais populares (vitrine principal).

CT10 – Busca sem resultado
Valida UX de no-content state e mensagens adequadas de fallback.

CT11 – Busca parcial
Testa a responsividade da busca com termos incompletos (auto-suggest/contain search).

CT12 – Carregamento da Home
Verifica renderização inicial dos módulos principais e integridade dos componentes.

CT13 – Busca com resultado
Garante a integridade do fluxo primário de descoberta.

CT14 – Detalhes do conteúdo
Valida componentes críticos (sinopse, mídia, metadados) que antecedem o “play”.

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
# 5. Decisões de Escopo
Priorizei os fluxos mais críticos para a jornada de uso em uma plataforma de streaming, contemplando:
- Cenários autenticados e não autenticados, para garantir consistência na experiência do usuário.
- Fluxos negativos essenciais (ex.: buscas sem resultado), que validam resiliência da aplicação.
- Operações centrais de descoberta e navegação do catálogo (ranking, filtros, cards na home), pilares de engajamento em streaming.
- Uso de mocks/dados falsos, garantindo reprodutibilidade, isolamento dos testes e ausência de dependência de dados voláteis.

---
# 6. Arquitetura e Organização do Código
A automação foi estruturada com foco em **reutilização**, **clareza** e **baixa manutenção**, adotando uma combinação de Page Objects, comandos reutilizáveis e módulos auxiliares.

## Page Objects / Commands

Foi utilizado o padrão **Page Object Model (POM)** para encapsular seletores, interações e comportamentos de cada página.  
Cada classe de página contém:

- Seletores centralizados  
- Métodos de interação (commands)  
- Navegação específica  
- Pequenas validações da própria página  

Arquivos presentes no projeto:
- `MoviesPage.ts`
- `RankingPage.ts`
- `InterestElements.ts`
- `RankingElements.ts`

**Benefícios:**  
- Reduz duplicação  
- Facilita manutenção  
- Torna os testes mais legíveis  
- Permite criação rápida de novos fluxos

---

## Separação entre Testes e Helpers

Para manter os testes enxutos, a lógica compartilhada foi separada em módulos auxiliares:

- `assertions.ts` → verificações reutilizáveis  
- `navigation.ts` → funções de navegação comuns  
- `testData.ts` → massa de dados isolada  

**Vantagens:**  
- Testes focados no comportamento e não em detalhes técnicos  
- Menos repetição de código  
- Manutenção mais simples

---

## Configurações Reaproveitáveis

A configuração global em `playwright.config.ts` centraliza os parâmetros compartilhados por todas as suites:

- URL base  
- Timeout padrão  
- Reporter configurado  
- Browsers de execução  
- Diretórios de evidências  

Isso garante que todos os testes:

- Sigam o mesmo padrão de execução  
- Sejam reproduzíveis em qualquer ambiente  
- Rodem em CI/CD sem ajustes manuais

A combinação de Page Objects, helpers e configuração centralizada garante uma arquitetura simples, escalável e estável.

# 7. Como Executar (Reprodutibilidade)

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

# 8. Evidências de Execução

As evidências completas encontram-se em:

```
evidence/
```

- Relatório HTML → `evidence
