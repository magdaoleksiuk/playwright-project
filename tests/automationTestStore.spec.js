const { test, expect } = require('@playwright/test');
const CheckoutPage = require('./pageObjects.js'); // Import your Page Object


test('Adding product to the cart and finalizing order', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://automationteststore.com/');
    await page
    .getByRole('listitem')
    .filter({ hasText: 'Shoes' })
    .click();
    await page.click('a[data-id="118"]');
    await page.click('a[class="cart"]');
    await page
    .getByRole('listitem')
    .filter({ hasText: 'T-shirts' })
    .click();
    await page.click('a[data-id="121"]');
    await page.click('a[class="cart"]');
    await page.locator('#filter_keyword').type('Cream');
    await page.locator('.button-in-search').click();
    await page.click('a[data-id="92"]');
    await page.locator('css=[data-id="menu_cart"]');
    const shoesAdded = await page.waitForSelector(':has-text("Womens high heel point toe stiletto sandals ankle strap court shoes")')
    const tshirtAdded = await page.waitForSelector(':has-text("Designer Men Casual Formal Double Cuffs Grandad Band Collar Shirt Elegant Tie")');
    const creamAdded = await page.waitForSelector(':has-text("Body Cream by Bulgari")')
    await expect(tshirtAdded).toBeTruthy();
    await expect(shoesAdded).toBeTruthy();
    await expect(creamAdded).toBeTruthy();
    await page.locator('span[class="cart_total"]').click();
    await page.locator(('a[id="cart_checkout1"]')).click();
    await page.locator('#accountFrm_accountguest').check();
    await page.locator(('button:text("Continue")')).click();
    await page.locator('#guestFrm_firstname').fill('John');
    await page.locator('#guestFrm_lastname').fill('Doe');
    await page.locator('#guestFrm_email').fill('john.doe@gmail.com');
    await page.locator('#guestFrm_address_1').fill('Test Street 123');
    await page.locator('#guestFrm_city').fill('Warsaw');
    await page.locator('select[id="guestFrm_zone_id"]').selectOption('Aberdeen');    
    await page.locator('#guestFrm_postcode').fill('55353');
    await page.locator(('button:text("Continue")')).click();
    await page.locator(('button:text("Confirm order")')).click();
    await expect('.heading').toHaveText(' Your Order Has Been Processed!');
});

test('Checking field validation - no values', async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();

  const checkoutPage = new CheckoutPage(page);
  await checkoutPage.goToCheckoutPage();

  await checkoutPage.fillGuestFormAndContinue('John', 'Doe', 'john.doe@gmail.com');

  const validationMessages = await checkoutPage.getValidationMessages();

  await expect(validationMessages.firstname).toContain("First Name must be greater than 3 and less than 32 characters!");
  await expect(validationMessages.lastname).toContain("Last Name must be greater than 3 and less than 32 characters!");
  await expect(validationMessages.email).toContain("E-Mail Address does not appear to be valid!");
  await expect(validationMessages.address).toContain("Address 1 must be greater than 3 and less than 128 characters!");
  await expect(validationMessages.city).toContain("City must be greater than 3 and less than 128 characters!");
  await expect(validationMessages.region).toContain("Please select a region / state!");
  await expect(validationMessages.zip).toContain("Zip/postal code must be between 3 and 10 characters!");
});

test('Checking field validation - wrong values', async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();

  const checkoutPage = new CheckoutPage(page);
  await checkoutPage.goToCheckoutPage();

  await checkoutPage.fillGuestFormAndContinue(
    'More than 32 characters test 12345',
    'More than 32 characters test 12345',
    'wrongemail@com',
    'Cit city nameeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
    '1234567891011'
  );

  const validationMessages = await checkoutPage.getValidationMessages();

  await expect(validationMessages.firstname).toContain("First Name must be greater than 3 and less than 32 characters!");
  await expect(validationMessages.lastname).toContain("Last Name must be greater than 3 and less than 32 characters!");
  await expect(validationMessages.email).toContain("E-Mail Address does not appear to be valid!");
  await expect(validationMessages.city).toContain("City must be greater than 3 and less than 128 characters!");
  await expect(validationMessages.zip).toContain("Zip/postal code must be between 3 and 10 characters!");
});

test('Checking cart counter', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://automationteststore.com/');
    const counter = await page.locator('.block_7');
    expect(counter).toHaveText("   0 ITEMS - $0.00 "
    );
    await page
    .getByRole('listitem')
    .filter({ hasText: 'Shoes' })
    .click();
    await page.click('a[data-id="118"]');
    await page.click('a[class="cart"]');
    expect(counter).toHaveText("   1 ITEMS - $26.00 "
    );
    await page
    .getByRole('listitem')
    .filter({ hasText: 'T-shirts' })
    .click();
    await page.click('a[data-id="121"]');
    await page.click('a[class="cart"]');
    expect(counter).toHaveText("   2 ITEMS - $58.00 "
    );
});




