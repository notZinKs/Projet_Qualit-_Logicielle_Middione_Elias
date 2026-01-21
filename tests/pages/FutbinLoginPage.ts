import { Page, Locator } from '@playwright/test';

export class FutbinLoginPage {
  readonly page: Page;
  readonly emailInput: Locator;
  readonly passInput: Locator;
  readonly submitBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailInput = page.getByRole('textbox', { name: 'Email or Username' });
    this.passInput = page.locator('input[name="password"]');
    this.submitBtn = page.locator('#login-prompt-lightbox-content-container').getByRole('button', { name: 'Log in' });
  }

  async login(email: string, pass: string) {
    await this.emailInput.fill(email);
    await this.passInput.fill(pass);
  }
  
  async clickLoginButton() {
    await this.submitBtn.click();
  }
}