const { test, expect } = require('@playwright/test');
const { ajaxLoader } = require('./ajaxLoader-page');



test('Select and verify date', async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  const ajaxLoaderPage = new ajaxLoader(page);

  await ajaxLoaderPage.open();
  await ajaxLoaderPage.waitForLoaderToBeHidden();
  await ajaxLoaderPage.clickButtonAndWaitForModal();
});
