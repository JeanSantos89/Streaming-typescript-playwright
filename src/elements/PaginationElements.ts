import { Locator, Page } from '@playwright/test';

export class PaginationElements {
  // --- Locators do fluxo de Interesse ---
  readonly logoHome: Locator;
  readonly moviesBar: Locator;
  readonly popular: Locator;
  readonly LoadMoreMovies: Locator;
  readonly movieCards: Locator;
  readonly activeLoadMore: Locator;

  constructor(page: Page) {
    this.logoHome = page.locator('a.logo'); // Logo que redireciona para a página inicial
    this.moviesBar = page.locator('ul.dropdown_menu.navigation li').first();
    this.popular = page.locator('ul.k-menu-group.k-menu-group-md > li').first();

    // Paginação Locators
    this.LoadMoreMovies = page.locator('a.load_more[href="/movie?page=2"]'); 
    // Botão de carregar mais filmes (segunda página específica)

    this.movieCards = page.locator('.media_items .card.style_1'); 
    // Locator para cards de filmes

    this.activeLoadMore = page.locator('.pagination.infinite:not(.hide) a.load_more');
    // Botão "Carregar mais" do paginador ativo (visível)
  }
}
