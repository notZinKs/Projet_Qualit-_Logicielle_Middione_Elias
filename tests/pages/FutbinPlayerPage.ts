import { Page, Locator, expect } from '@playwright/test';

export class FutbinPlayerPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async verifierTitreJoueur(nom: string) {
    await expect(this.page.locator('body')).toContainText(nom);
  }

  async verifierFiltreVisible(nomFiltre: string) {
    await expect(this.page.getByText(nomFiltre).first()).toBeVisible();
  }
}