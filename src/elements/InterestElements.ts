import { Locator, Page } from '@playwright/test';

export class InterestElements {
  // --- Locators do fluxo de Interesse ---
  readonly logoHome: Locator;
  readonly firstContentCardHome: Locator;
  readonly watchlistBtn: Locator;
  readonly perfil: Locator;
  readonly goToPerfil: Locator;
  readonly interestList: Locator;
  readonly positiveCountLink: Locator;
  readonly removeItemBtn: Locator;
  readonly successNotification: Locator;

  constructor(page: Page) {
    this.logoHome = page.locator('a.logo'); // Logo que redireciona para a página inicial

    this.firstContentCardHome = page
      .locator('.column_content')
      .first()
      .locator('.card.style_1:not(.loading):not(.spacer)')
      .first(); // Primeiro card de conteúdo carregado na home

    this.watchlistBtn = page.locator('#watchlist'); // Botão de adicionar à watchlist

    this.perfil = page.locator('a.no_click.tooltip_hover[aria-label]'); // Link que indica usuário autenticado

    this.interestList = page.locator('a[href$="watchlist?sort_by=upcoming"]').first();
    // Link para a lista de interesses (watchlist)

    this.goToPerfil = page.locator('a.logged_in[href^="/u/"]'); 
    // Link para acessar o perfil do usuário

    this.positiveCountLink = page.locator('h3', {
      has: page.locator('span.color.pink'),
      hasText: /[1-9]/,
    }); // Item indicado como tendo pelo menos 1 item na watchlist

    this.removeItemBtn = page.locator('a.account_list_action[data-list-type="watchlist"]');
    // Botão para remover item da watchlist

    this.successNotification = page.locator('div.notification.success');
    // Notificação de sucesso após remover item
  }
}