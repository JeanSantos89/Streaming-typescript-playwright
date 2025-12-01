import { Page, expect } from '@playwright/test';
import { AuthPage } from './AuthPage';
import { InterestElements } from '../elements/InterestElements';

export class InterestPage extends AuthPage {
  readonly interestEl: InterestElements;

  constructor(page: Page) {
    super(page); // Herda os métodos e propriedades da classe AuthPage
    this.interestEl = new InterestElements(page); // Inicializa a classe de elementos
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

  async interestActions() { //CT08
    await this.Auth(); // Realiza o login primeiro
    await this.interestEl.logoHome.click(); // Acessa a página inicial
    await this.page.waitForLoadState('load'); // Aguarda carregamento da página inicial 
    await this.page.waitForTimeout(1000); // Aguarda estabilização da página

    await expect(this.interestEl.firstContentCardHome).toBeVisible({ timeout: 15000 }); 
    // Aguarda espera que o primeiro card de conteúdo esteja visível

    await this.interestEl.firstContentCardHome.click({ force: true }); 
    // Clica no primeiro card de conteúdo da página inicial

    await this.page.waitForLoadState('load'); 
    // Aguarda carregamento da página de detalhes do conteúdo
    await this.page.waitForTimeout(1000);

    await this.interestEl.watchlistBtn.click(); 
    // Adiciona o conteúdo à watchlist
    await this.page.waitForTimeout(500);

    await this.interestEl.goToPerfil.click(); 
    // Acessa o perfil do usuário

    await this.page.waitForLoadState('load'); 
    // Aguarda carregamento da página de perfil do usuário
    await this.page.waitForTimeout(1000);

    await this.interestEl.interestList.click(); 
    // Acessa a watchlist

    await this.page.waitForLoadState('load'); 
    // Aguarda carregamento da página de watchlist
    await this.page.waitForTimeout(1000);

    // Aguarda que haja pelo menos um item com contagem > 0
    await expect(this.page.locator('h3').filter({ hasText: /[1-9]/ }).filter({ has: this.page.locator('span.color.pink') })).toBeVisible({ timeout: 15000 });
    
    await this.interestEl.positiveCountLink.click({ force: true }); 
    // Clica no item que há pelo menos um item na watchlist

    await this.page.waitForLoadState('load'); 
    // Aguarda carregamento da página de detalhes do conteúdo na watchlist
    await this.page.waitForTimeout(1000);

    await this.interestEl.removeItemBtn.click(); 
    // Remove o conteúdo da watchlist

    await this.page.waitForLoadState('load'); 
    // Aguarda carregamento da página de detalhes após remoção
    await this.page.waitForTimeout(500);

    await expect(this.interestEl.successNotification).toBeVisible({ timeout: 10000 }); 
    // Verifica mensagem de sucesso
  }
}