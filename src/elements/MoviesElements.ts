import { Locator, Page } from '@playwright/test';
import { CommonElements } from './CommonElements';

export class MoviesElements extends CommonElements {
  readonly firstRangeFilter: Locator;
  readonly adventureGenre: Locator;
  readonly actionGenre: Locator;
  readonly ageRangeFilter: Locator;
  readonly languageFilter: Locator;
  readonly filterBtn: Locator;

  constructor(page: Page) {
    super(page);
    this.firstRangeFilter = page.locator('#release_date_gte');
    this.adventureGenre = page.locator('#with_genres li[data-value="12"]');
    this.actionGenre = page.locator('#with_genres li[data-value="28"]');
    // A lista de classificação indicativa muda de acordo com o país do
    // visitante (ex.: BR usa L/10/12/14/16/18, já EUA usa G/PG/PG-13/R/NC-17).
    // Um data-value fixo como "18" só existe para quem é geolocalizado no
    // Brasil; em outra região (ex.: runner do CI) a lista é outra e o
    // elemento nunca existe. Usar a última opção (a mais restritiva da
    // lista, seja qual for o país) evita depender de um país específico.
    this.ageRangeFilter = page.locator('#certification li').last();
    this.languageFilter = page.locator('.k-input-value-text').nth(3);
    this.filterBtn = page.locator('p.load_more a.load_more').first();
  }
}
