const {test, expect} = require('@playwright/test');

test('Select and verify date', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    const datePickerInput = await page.locator('.form-control')
    await page.goto('https://webdriveruniversity.com/Datepicker/index.html');
  
    await datePickerInput.click();
    await page.locator('.datepicker-switch:has-text("August")').click();
    await page.locator('.month').nth(5).click();
    await page.locator('.day').nth(20).click();
    await expect(datePickerInput).toHaveJSProperty('value', '06-17-2023');
  });