const { test, expect } = require('@playwright/test');
const { autocomplete } = require('./autocomplete-page');


test('Select and verify date', async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  const autocompletePage = new autocomplete(page);

  await autocompletePage.open();
  await autocompletePage.enterTextAndSelectOption('chi');
  await autocompletePage.verifySelectedOption('Chips');
  await autocompletePage.submitForm();
  await autocompletePage.verifyTextFieldIsEmpty();
  await autocompletePage.verifyURL('https://webdriveruniversity.com/Autocomplete-TextField/autocomplete-textfield.html?food-item=Chips');
});
