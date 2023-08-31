import { test, expect, Page } from '@playwright/test';

class ContactUsPage {
  private page: Page;
  private url: string;

  constructor(page: Page) {
    this.page = page;
    this.url = 'https://webdriveruniversity.com/Contact-Us/contactus.html';
  }

  async open() {
    await this.page.goto(this.url);
  }

  async fillForm(formData: Record<string, string>) {
    for (const field in formData) {
      await this.page.locator(`[name='${field}']`).type(formData[field]);
    }
  }

  async submitForm() {
    await this.page.locator("[type='submit']").click();
  }

  async resetForm() {
    await this.page.locator("[type='reset']").click();
  }

  async expectError(errorMessage: string) {
    await expect(this.page.locator('body')).toContainText(`Error: ${errorMessage}`);
  }

  async expectEmptyFields(fields: string[]) {
    for (const field of fields) {
      await expect(this.page.locator(`[name='${field}']`)).toBeEmpty();
    }
  }

  async expectThankYouPage() {
    await expect(this.page).toHaveURL('https://webdriveruniversity.com/Contact-Us/contact-form-thank-you.html');
  }
}