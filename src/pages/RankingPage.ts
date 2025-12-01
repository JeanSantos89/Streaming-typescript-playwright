import { Page, expect } from '@playwright/test';
import { AuthPage } from './AuthPage';
import { RankingElements } from '../elements/RankingElements';

export class RankingPage extends AuthPage {
  // Agrupa os locators em uma classe de elementos
  readonly rankingEl: RankingElements;

  constructor(page: Page) {
    super(page); // Herda os métodos e propriedades da classe AuthPage
    this.rankingEl = new RankingElements(page); // Inicializa os locators da página de Ranking
  }

  async expectLoaded() {
    // Valida que a página inicial foi carregada corretamente verificando a presença do elemento <nav>
    await expect(this.page.locator('nav')).toBeVisible();
  }

  async goto() { //CT04
    // Navega até a página inicial e aguarda o carregamento completo
    await this.page.goto('/');
    await this.page.waitForLoadState('load');
  }

  async RankingActionsLogged() { //CT09
    await this.Auth(); // Realiza o login primeiro
    await this.rankingEl.logoHome.click(); // Acessa a página inicial
    await this.page.waitForLoadState('load'); // Aguarda carregamento da página inicial 
    await this.page.waitForTimeout(1000); // Aguarda estabilização

    await this.rankingEl.moviesBar.hover(); // Hover no menu Movies
    await this.rankingEl.popular.click(); // Clica na opção Top Rated
    await this.page.waitForLoadState('load'); // Aguarda carregamento da página de Top Rated
    await this.page.waitForTimeout(1000); // Aguarda estabilização
  }

  async RankingActionsUnlogged() { //CT10
    await this.rankingEl.logoHome.click(); // Acessa a página inicial
    await this.page.waitForLoadState('load'); // Aguarda carregamento da página inicial 
    await this.page.waitForTimeout(1000); // Aguarda estabilização

    await this.rankingEl.moviesBar.hover(); // Hover no menu Movies
    await this.rankingEl.popular.click(); // Clica na opção Top Rated
    await this.page.waitForLoadState('load'); // Aguarda carregamento da página de Top Rated
    await this.page.waitForTimeout(1000); // Aguarda estabilização
  }
}
