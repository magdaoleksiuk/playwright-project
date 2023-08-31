import { Locator, Page } from '@playwright/test';

export class CheckoutPage {
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goToCheckoutPage() {
    await this.page.goto('https://automationteststore.com/');
    await this.page
      .getByRole('listitem')
      .filter({ hasText: 'Shoes' })
      .click();
    await this.page.click('a[data-id="118"]');
    await this.page.click('a[class="cart"]');
    await this.page.locator(('a[id="cart_checkout1"]')).click();
  }

  async fillGuestFormAndContinue(firstName: string, lastName: string, email: string, city: string, zip: string) {
    await this.page.locator('#accountFrm_accountguest').check();
    await this.page.locator(('button:text("Continue")')).click();
    await this.page.locator(('button:text("Continue")')).click();

    await this.page.locator('#guestFrm_firstname').fill(firstName);
    await this.page.locator('#guestFrm_lastname').fill(lastName);
    await this.page.locator('#guestFrm_email').fill(email);
    await this.page.locator('#guestFrm_city').fill(city);
    await this.page.locator('#guestFrm_postcode').fill(zip);
  }

  async getValidationMessages() {
    const validationMessages = {
      firstname: await this.page.locator('.help-block').first().textContent(),
      lastname: await this.page.locator('.help-block').nth(1).textContent(),
      email: await this.page.locator('.help-block').nth(2).textContent(),
      address: await this.page.locator('.help-block').nth(6).textContent(),
      city: await this.page.locator('.help-block').nth(8).textContent(),
      region: await this.page.locator('.help-block').nth(9).textContent(),
      zip: await this.page.locator('.help-block').nth(10).textContent(),
    };

    return validationMessages;
  }
}

export class AutomationTestStorePage {

  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async addToCart(productId: string): Promise<void> {
    await this.page.click(`a[data-id="${productId}"]`);
    await this.page.click('a[class="cart"]');
  }

  async clickProductCategory(categoryName: string): Promise<void> {
    const categoryLocator = await this.page.locator('[aria-label="Categories"]');
    const categoryItem = await categoryLocator.locator('li[role="listitem"]').filter({ hasText: categoryName });

    await categoryItem.click();
  }

  async navigateToHomePage() {
    await this.page.goto('https://automationteststore.com/');
  }

  async addProductToCart(productId: string) {
    await this.page.click(`a[data-id="${productId}"]`);
    await this.page.click('a[class="cart"]');
  }

  async searchAndAddProductToCart(productName: string) {
    await this.page.fill('#filter_keyword', productName);
    await this.page.click('.button-in-search');
    await this.page.click(`a[data-id="${productName}"]`);
  }

  async waitForProductAdded(productName: string) {
    return await this.page.waitForSelector(`:has-text("${productName}")`);
  }

  async goToCheckout() {
    await this.page.click('span[class="cart_total"]');
    await this.page.click('a[id="cart_checkout1"]');
  }

  async fillGuestCheckoutForm(firstName: string, lastName: string, email: string, address: string, city: string, state: string, postcode: string) {
    await this.page.check('#accountFrm_accountguest');
    await this.page.click('button:text("Continue")');
    await this.page.fill('#guestFrm_firstname', firstName);
    await this.page.fill('#guestFrm_lastname', lastName);
    await this.page.fill('#guestFrm_email', email);
    await this.page.fill('#guestFrm_address_1', address);
    await this.page.fill('#guestFrm_city', city);
    await this.page.selectOption('select[id="guestFrm_zone_id"]', state);
    await this.page.fill('#guestFrm_postcode', postcode);
    await this.page.click('button:text("Continue")');
    await this.page.click('button:text("Confirm order")');
  }

  async getCartCounterText(): Promise<string> {
    const counter = await this.page.locator('.block_7');
    const text = await counter.textContent();
    return text.replace(/\s+/g, ' ').trim();
  }
}

