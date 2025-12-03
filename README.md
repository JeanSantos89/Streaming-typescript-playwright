Este repositório contém uma automação E2E completa utilizando Playwright e TypeScript, desenvolvida com foco em organização, confiabilidade, performance e reprodutibilidade.  
O objetivo é demonstrar boas práticas modernas de QA Engineering, utilizando a plataforma Open-Source TMDB.

A automação cobre os fluxos essenciais de uma plataforma de streaming, incluindo:

- Autenticação e gerenciamento de sessão
- Paginação e carregamento incremental
- Ranking e filtros
- Pesquisa (fluxos positivos e negativos)
- Renderização completa da Home
- Exibição de detalhes de conteúdo
- Listas personalizadas (interesses)

O projeto segue arquitetura modular utilizando Page Object Model (POM), comandos reutilizáveis, helpers e configuração centralizada, garantindo baixo acoplamento e alta manutenibilidade.

---

# 1. Visão Geral do que foi Implementado

A suíte cobre comportamentos críticos da jornada do usuário, como:

- Login e logout com validação de sessão
- Paginação dinâmica (scroll infinito)
- Ranking logado e deslogado
- Pesquisas com múltiplos cenários
- Validações de carregamento da Home
- Exibição de detalhes de conteúdos
- Ações de interesse (CRUD)

Organização padronizada via POM, facilitando expansão contínua.

---

# 2. Catálogo de Casos de Teste (CT01–CT14)

| CT | Página | Nome | Contexto | Descrição |
|----|--------|--------|-----------|--------------|
| CT01 | AuthPage | Login | Deslogado | Realizar login básico. |
| CT02 | AuthPage | Login + Logout | Logado | Fluxo completo de autenticação. |
| CT03 | InterestPage | InterestActions | Logado | CRUD de itens de interesse. |
| CT04 | MoviesPage | RankingFilter | Logado | Aplicar filtros e validar resultados. |
| CT05 | MoviesPage | RankingFilter | Deslogado | Filtros sem login. |
| CT06 | PaginationPage | Pagination | Logado | Scroll + 3 listas paginadas. |
| CT07 | PaginationPage | Pagination | Deslogado | Scroll + paginação pública. |
| CT08 | RankingPage | RankingActionsLogged | Logado | Ranking autenticado. |
| CT09 | RankingPage | RankingActionsUnlogged | Deslogado | Ranking público. |
| CT10 | HomePage | SearchFail | Geral | Pesquisa sem resultados. |
| CT11 | HomePage | SearchHalf | Geral | Pesquisa parcial. |
| CT12 | HomePage | ExpectLoaded | Geral | Carregamento completo da Home. |
| CT13 | HomePage | SearchSuccess | Geral | Busca com retorno. |
| CT14 | HomePage | MoviesCategoria | Geral | Exibir detalhes de conteúdo. |

---

# 3. Importância Técnica de Cada Caso de Teste

### CT01 – Login
- Valida fluxo de autenticação.
- Base para todos os cenários logados.

### CT02 – Login + Logout
- Valida ciclo completo de sessão.
- Evita sessão fantasma.

### CT03 – InterestActions
- Navega pelo site, adiciona conteúdo a lista de favoritos e o remove.

### CT04/CT05 – Ranking + Filtros
- Valida lógica combinada de filtros e ordenação.

### CT06/CT07 – Paginação
- Testa comportamento do infinite scroll.
- Garante carregamento incremental sem travamentos.
- Avalia performance e estabilidade da interface.

### CT08/CT09 – Ranking
- Confirma comportamento de seleção de ranking.

### CT10 – Busca sem resultado
- Valida comportamento de empty state.
- Testa clareza das mensagens e fallback.

### CT11 – Busca parcial
- Exercita heurísticas de pesquisa.
- Valida responsividade com termos incompletos.

### CT12 – Carregamento da Home
- Confirma integridade de módulos principais.
- Evita layout quebrado ou dados ausentes.

### CT13 – Busca com retorno
- Valida o fluxo central de descoberta de conteúdo.

### CT14 – Detalhes do conteúdo
- Testa renderização de sinopse, mídia e metadados.

---

# 4. Por que Playwright e TypeScript?

## 4.1 Por que Playwright?

- Suporte nativo a múltiplos navegadores.
- Contextos independentes por teste.
- Excelente sistema de evidências (vídeo, trace, screenshots).
- API moderna e estável.
- Execução em paralelo com alta performance.
- Maior estabilidade que outras ferramentas em aplicações dinâmicas.

## 4.2 Por que TypeScript?

- Tipagem estática reduz erros comuns.
- IntelliSense robusto facilita manutenção dos Page Objects.
- Código mais seguro, legível e escalável.
- Evita problemas com valores indefinidos ou tipos incorretos.
- É padrão moderno no ecossistema de automação com Playwright.

---

# 5. Decisões de Escopo (Versão Ampliada e Técnica)

## 5.1 Critérios Técnicos de Seleção de Cenários

Foram priorizados cenários que:

1. Exercitam fluxos críticos da plataforma: login, busca, ranking, navegação e detalhes.
2. Têm maior impacto em caso de falha.
3. Possuem alto retorno em automação, devido à repetição e previsibilidade.
4. São estáveis e reprodutíveis utilizando dados do TMDB.
5. Podem ser executados consistentemente em pipeline CI/CD.

## 5.2 Exclusões Deliberadas do Escopo

Não fazem parte do escopo inicial:

- Testes de WebView ou comportamento nativo em mobile.
- Testes suscetíveis a flakiness por alta dependência de eventos assíncronos.

O objetivo foi manter a suíte determinística e livre de flutuações externas.

## 5.3 Critérios de Reprodutibilidade

O escopo foi definido para garantir:

- Zero dependência de dados voláteis.
- Execução repetível em qualquer ambiente.
- Uso intensivo do auto-wait do Playwright para evitar flakiness.
- Padronização via .env.example.

## 5.4 Riscos Reduzidos Através do Escopo Selecionado

- Quebra no fluxo principal da Home.
- Falhas de autenticação e sessão.
- Inconsistências entre catálogo público e logado.
- Problemas de UX em estados vazios.
- Falha no carregamento incremental.
- Falhas na exibição de metadados do conteúdo.

## 5.5 Alinhamento com Plataformas de Streaming Modernas

O escopo cobre pilares essenciais usados por plataformas como Netflix, Disney+, Prime Video:

| Pilar | Exemplo em Streaming | Cobertura no Projeto |
|-------|-----------------------|------------------------|
| Catálogo | Home, Browse | Home e Ranking |
| Descoberta | Busca, sugestões | Busca parcial e completa |
| Autenticação | Login, sessão | Login, logout |
| Personalização | Minha lista | InterestActions |
| Performance | Scroll infinito | Paginação logada e deslogada |

---

# 6. Arquitetura e Organização do Código

A automação utiliza:

- Page Object Model (POM)
- Commands reutilizáveis
- Helpers de navegação, validação e dados
- Configurações globais centralizadas

## Estrutura principal

- MoviesPage.ts  
- RankingPage.ts  
- InterestElements.ts  
- RankingElements.ts  

## Helpers

- assertions.ts  
- navigation.ts  
- testData.ts  

## Benefícios

- Redução de duplicação de código.
- Testes enxutos e focados no comportamento.
- Fácil expansão do projeto.
- Separação clara de responsabilidades.

---

# 7. Como Executar

## Pré-requisitos

- Node.js 18+
- npm instalado

## Instalação

npm install
npx playwright install


## Configurar ambiente

Preencher dados válidos em `.env`.

## Executar todos os testes

npx playwright test


## Abrir relatório

npx playwright show-report


Execução totalmente automatizada e reprodutível.

---

# 8. Evidências de Execução

As evidências ficam no diretório:

evidence/

Inclui em casos de falha:

- Vídeos
- Traces
- Screenshots
- Relatório HTML completo

---
