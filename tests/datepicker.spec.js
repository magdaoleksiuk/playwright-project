const { test, expect } = require('@playwright/test');
const { datepicker } = require('./datepicker-page');


test('Select and verify date', async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  const datePickerPage = new datepicker(page);

  await datePickerPage.openPage();
  await datePickerPage.selectDate('August', 20);
  await datePickerPage.verifySelectedDate('06-17-2023');
});
