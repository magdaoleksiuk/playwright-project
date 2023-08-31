import { Page } from 'playwright';
import { expect } from '@playwright/test';

export class AjaxLoaderPage {
  private page: Page;
  private url: string;

  constructor(page: Page) {
    this.page = page;
    this.url = 'https://webdriveruniversity.com/Ajax-Loader/index.html';
  }

  async open() {
    await this.page.goto(this.url);
  }

  async waitForLoaderToBeHidden() {
    await this.page.waitForSelector('#loader', { state: 'hidden' });
  }

  async clickButtonAndWaitForModal() {
    const button = await this.page.locator('#button1');
    await button.click();
    await expect(this.page.locator('.modal-content')).toBeVisible();
  }
}
