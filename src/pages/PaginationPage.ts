import { Page, expect } from '@playwright/test';
import { AuthPage } from './AuthPage';
import { PaginationElements } from '../elements/PaginationElements';

export class PaginationPage extends AuthPage {
  readonly paginationEl: PaginationElements;

  constructor(page: Page) {
    super(page); // Herda os métodos e propriedades da classe AuthPage
    this.paginationEl = new PaginationElements(page); // Inicializa os elementos da página de paginação
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

  async Pagination() { //CT09
    await this.paginationEl.logoHome.click(); // Acessa a página inicial
    await this.page.waitForLoadState('load'); // Aguarda carregamento da página inicial 
    await this.page.waitForTimeout(1000); // Aguarda estabilização

    await this.paginationEl.moviesBar.hover(); // Hover no menu Movies
    await this.paginationEl.popular.click();   // Clica na opção Top Rated
    await this.page.waitForLoadState('load'); // Aguarda carregamento da página de Top Rated
    await this.page.waitForTimeout(1500); // Aguarda estabilização extra

    await this.loadMoviesWithScroll(); // Realiza a paginação com scroll     
  }

  async loadMoviesWithScroll(maxLoads: number = 3) {
    for (let i = 1; i < maxLoads; i++) {
      const previousCount = await this.paginationEl.movieCards.count();

      // pega sempre o botão "Carregar mais" do paginador ATIVO
      const loadMore = this.paginationEl.activeLoadMore;

      // se não existir ou não estiver visível, acabou as páginas
      if ((await loadMore.count()) === 0 || !(await loadMore.isVisible())) {
        console.log('Sem mais botão "Carregar mais" visível. Saindo do loop.');
        break;
      }

      // garante que está no viewport
      await loadMore.scrollIntoViewIfNeeded();
      await this.page.waitForTimeout(500);

      // clica para carregar próxima página
      await loadMore.click({ force: true });
      await this.page.waitForTimeout(500);

      // espera os novos cards aparecerem (ajax, não navegação)
      await expect.poll(async () => await this.paginationEl.movieCards.count(), { timeout: 15000 })
        .toBeGreaterThan(previousCount);

      console.log(
        `Página extra carregada (${i + 1}/${maxLoads}). Filmes: ${await this.paginationEl.movieCards.count()}`
      );
    }
  }
}
