class CheckoutPage {
    constructor(page) {
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

    async fillGuestFormAndContinue(firstName, lastName, email, city, zip) {
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
  
  module.exports = CheckoutPage;
 
  
  