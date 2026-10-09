import { Page, expect } from '@playwright/test';
import { AuthPage } from './AuthPage';
import { RankingElements } from '../elements/RankingElements';

export class RankingPage extends AuthPage {
  protected readonly rankingEl: RankingElements;

  constructor(page: Page) {
    super(page);
    this.rankingEl = new RankingElements(page);
  }

  async viewRankingAsLoggedUser() {
    await this.login();
    await this.navigateToTopRated();
  }

  async viewRankingAsGuest() {
    await this.navigateToTopRated();
  }

  private async navigateToTopRated() {
    await this.clickAndWait(this.rankingEl.logoHome);
    await this.rankingEl.moviesBar.hover();
    await this.clickAndWait(this.rankingEl.popular);
    // Prova que a navegação realmente trocou de tela: sem isso o teste passava
    // mesmo que o clique no menu "Popular" falhasse silenciosamente.
    await expect(this.rankingEl.movieCards.first()).toBeVisible({ timeout: 15000 });
  }
}
