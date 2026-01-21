import { Page, Locator, expect } from '@playwright/test';

export class FutbinHomePage {
  readonly page: Page;
  readonly searchInput: Locator;
  readonly cookieButton: Locator;
  readonly platformBtn: Locator;
  readonly pcOption: Locator;
  readonly pcIcon: Locator;
  readonly objectivesLink: Locator;
  readonly foundationsTab: Locator;
  readonly specificFoundationCard: Locator;

  constructor(page: Page) {
    this.page = page;
    this.searchInput = page.getByRole('searchbox', { name: 'Search for EA FC 26 Player...' }); 
    this.cookieButton = page.getByRole('button', { name: 'Allow all', exact: true });
    this.platformBtn = page.getByRole('button', { name: 'Platform Button' });
    this.pcOption = page.getByLabel('PC', { exact: true });
    this.pcIcon = page.locator('.fa-windows').first();
    this.objectivesLink = page.getByRole('link', { name: 'Objectives' });
    this.foundationsTab = page.getByRole('link', { name: 'Foundations', exact: true });
    this.specificFoundationCard = page.getByRole('link', { name: 'Path to Pro Objectives Reward' });
  }

  async ouvrir() {
    await this.page.goto('https://www.futbin.com/');
    await this.gererCookies();
  }

  async gererCookies() {
    try {
      console.log("Recherche de la bannière cookie...");
      await this.cookieButton.first().waitFor({ state: 'visible', timeout: 5000 });
      await this.cookieButton.first().click();
      console.log("Bannière cookie acceptée.");
    } catch (e) {
      console.log("Pas de bannière cookie détectée ou délai dépassé.");
    }
  }

  async rechercher(joueur: string) { 

    await this.searchInput.fill(joueur);
    await this.page.waitForTimeout(1000); 
  }

  async validerRecherche() {
    await this.searchInput.press('Enter');
  }

  async naviguerVersMenu(menuName: string) {
    await this.page.getByRole('link', { name: menuName, exact: true }).first().click();
  }
  
  async allerVersPageLogin() {
    await this.page.getByRole('button', { name: 'Log in' }).click();
  }

  async ouvrirMenuPlateforme() {
    await this.platformBtn.click();
  }

  async choisirPC() {
    await this.pcOption.click();
  }

  async verifierOptionPCActive() {
    await this.platformBtn.click();
    await expect(this.pcOption).toBeVisible();
  }

  async cliquerObjectives() {
    await this.objectivesLink.first().click();
  }

  async cliquerFoundations() {
    await this.foundationsTab.click();
  }

  async ouvrirObjectifSpecifique() {
    await this.specificFoundationCard.first().click();
  }


}