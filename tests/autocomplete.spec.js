const {test, expect} = require('@playwright/test');

test('Select and verify date', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://webdriveruniversity.com/Autocomplete-TextField/autocomplete-textfield.html');
  
    const textField = await page.locator('#myInput');
    await textField.type('chi');
    await page.waitForSelector('.autocomplete-items');
    
    const secondOption = await page.locator('.autocomplete-items div:nth-child(2)');
    await secondOption.click();
    await expect(textField).toHaveJSProperty('value', 'Chips');
    await page.locator('#submit-button').click();
    await expect(page).toHaveURL('https://webdriveruniversity.com/Autocomplete-TextField/autocomplete-textfield.html?food-item=Chips');
  });