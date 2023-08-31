import { test, expect, BrowserContext, Page } from '@playwright/test';
import { AutocompletePage } from '../pages/autocomplete-page';

test('Select and verify date', async ({ browser }) => {
  const context: BrowserContext = await browser.newContext();
  const page: Page = await context.newPage();
  const autocompletePage: AutocompletePage = new AutocompletePage(page);

  await autocompletePage.open();
  await autocompletePage.enterTextAndSelectOption('chi');
  await autocompletePage.verifySelectedOption('Chips');
  await autocompletePage.submitForm();
  await autocompletePage.verifyTextFieldIsEmpty();
  await autocompletePage.verifyURL('https://webdriveruniversity.com/Autocomplete-TextField/autocomplete-textfield.html?food-item=Chips');
});
