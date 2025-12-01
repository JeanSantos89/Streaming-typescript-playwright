1. Visão Geral

Este projeto implementa uma suíte de testes automatizados end-to-end utilizando Playwright, cobrindo cenários comuns de plataformas de streaming: navegação de catálogo, filtros, ranking e interações com seções específicas do site.
A solução foi construída seguindo boas práticas de arquitetura de testes, isolamento de responsabilidades e reprodutibilidade.

A trilha utilizada foi baseada no TMDB, por oferecer um domínio público, estável e representativo do fluxo de consumo de conteúdo sem riscos de exposição de dados sensíveis.

2. Escopo Implementado
2.1 Fluxos automatizados

Foram implementados os seguintes testes:

Smoke Test: validações gerais de navegação, disponibilidade e carregamento da página inicial.

Testes de Interesses: verificação do carregamento da página, interações e comportamentos esperados.

Testes de Filtros de Filmes: aplicação de filtros, validação da mudança de resultados, comportamento negativo e consistência das listagens.

Testes de Ranking: navegação para rankings, validação de ordenação e integridade das informações exibidas.

2.2 Arquitetura e Organização

A automação foi desenvolvida utilizando o padrão Page Object Model (POM), com os seguintes componentes:

pages/: abstrações de páginas contendo métodos de interação.

elements/: centralização de seletores e locators.

utils/: funções de navegação padrão, assertions reutilizáveis e massa de dados.

tests/: suíte de testes organizada por contexto.

playwright.config.ts: configuração de ambiente, evidências e relatórios.

Essa abordagem facilita a manutenção, expansão e entendimento da automação.

3. Estrutura do Projeto
/
├── tests/
│   ├── smoke.spec.ts
│   ├── Interest.spec.ts
│   ├── MovieFilter.spec.ts
│   ├── Ranking.spec.ts
│
├── pages/
│   ├── MoviesPage.ts
│   ├── RankingPage.ts
│
├── elements/
│   ├── InterestElements.ts
│   ├── RankingElements.ts
│
├── utils/
│   ├── navigation.ts
│   ├── assertions.ts
│   ├── testData.ts
│
├── playwright.config.ts
├── package.json
└── README-candidato.md

4. Evidências de Execução

As evidências de execução são geradas automaticamente durante os testes e disponibilizadas na pasta:

evidence/

Conteúdo das evidências

Relatório HTML
Local: evidence/report/index.html

Screenshots
Gerados automaticamente em caso de falha.

Vídeos de execução
Gravados em caso de falha.

Arquivos de trace
Registrados na primeira tentativa de retry.

Artefatos gerais
Armazenados em: evidence/test-results/

Como abrir o relatório
npx playwright show-report evidence/report

5. Como Executar
5.1 Instalar dependências
npm install

5.2 Instalar navegadores do Playwright
npx playwright install

5.3 Executar a suíte completa
npx playwright test

5.4 Abrir relatório HTML
npx playwright show-report evidence/report

6. Registro Automático de Evidências

O projeto está configurado para registrar e armazenar evidências de forma automática.

Trecho relevante da configuração:

use: {
  screenshot: 'only-on-failure',
  trace: 'on-first-retry',
  video: 'retain-on-failure'
},
reporter: [
  ['html', { open: 'never', outputFolder: 'evidence/report' }],
  ['list']
],
outputDir: 'evidence/test-results'


Essa configuração garante que:

Testes falhos possuam screenshots, vídeos e traces associados.

O relatório HTML seja gerado em pasta separada.

Todos os artefatos de execução fiquem centralizados e organizados.

7. Decisões de Escopo

A trilha TMDB foi escolhida por ser pública, fornecer uma estrutura estável e representar adequadamente um fluxo de exploração de catálogo similar a plataformas de streaming.

Os cenários relacionados a catálogo, ranking e filtros foram priorizados por serem áreas de alto impacto em plataformas de mídia.

A arquitetura foi planejada com foco em reuso, clareza e escalabilidade.

8. Limitações e Próximos Passos
8.1 Limitações

O TMDB, por ser público, pode sofrer alterações visuais que exijam pequenos ajustes nos seletores.

Fluxos autenticados não foram incluídos neste escopo por não serem essenciais ao objetivo proposto.

8.2 Possíveis evoluções

Implementação de testes visuais usando comparações de snapshots.

Configuração de execução paralela otimizada.

Criação de mocks locais para cenários controlados e previsíveis.

Integração com pipeline de CI/CD.

Ampliação da cobertura de testes para diferentes dispositivos e modos de visualização.
