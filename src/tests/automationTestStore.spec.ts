import { test, expect, BrowserContext } from '@playwright/test';
import { CheckoutPage, AutomationTestStorePage } from '../pages/automationTestStore-page'; 

test('Adding product to the cart and finalizing order', async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  const automationTestStorePage = new AutomationTestStorePage(page);
  await automationTestStorePage.navigateToHomePage();
  await automationTestStorePage.addProductToCart("118");
  await automationTestStorePage.addProductToCart("121");
  await automationTestStorePage.searchAndAddProductToCart("Cream");
  await automationTestStorePage.waitForProductAdded("Womens high heel point toe stiletto sandals ankle strap court shoes");
  await automationTestStorePage.waitForProductAdded("Designer Men Casual Formal Double Cuffs Grandad Band Collar Shirt Elegant Tie");
  await automationTestStorePage.waitForProductAdded("Body Cream by Bulgari");
  await automationTestStorePage.goToCheckout();
  await automationTestStorePage.fillGuestCheckoutForm('John', 'Doe', 'john.doe@gmail.com', 'Test Street 123', 'Warsaw', 'Aberdeen', '55353');
  await expect(page).toHaveTitle(" Your Order Has Been Processed!");
  await context.close();
});

test('Checking field validation - no values', async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  const checkoutPage = new CheckoutPage(page);
  await checkoutPage.goToCheckoutPage();
  await checkoutPage.fillGuestFormAndContinue('John', 'Doe', 'john.doe@gmail.com', '', '');
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


test.only('Checking cart counter', async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  const automationTestStorePage = new AutomationTestStorePage(page);

  await automationTestStorePage.navigateToHomePage();
  const counter = await automationTestStorePage.getCartCounterText();

  expect(counter).toContain("0 Items - $0.00");

  await automationTestStorePage.clickProductCategory('Shoes');
  await automationTestStorePage.addToCart('118');
  const updatedCounter1 = (await automationTestStorePage.getCartCounterText());
  expect(updatedCounter1).toContain("1 Items - $26.00");

  await automationTestStorePage.clickProductCategory('T-shirts');
  await automationTestStorePage.addToCart('121');
  const updatedCounter2 = (await automationTestStorePage.getCartCounterText());
  expect(updatedCounter2).toContain("2 Items - $58.00");

  await context.close();
});
