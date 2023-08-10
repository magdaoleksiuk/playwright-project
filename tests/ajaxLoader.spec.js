const {test, expect} = require('@playwright/test');

test('Select and verify date', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://webdriveruniversity.com/Ajax-Loader/index.html');
    await page.waitForSelector('#loader', { state: 'visible' });
    await page.waitForSelector('#loader', { state: 'hidden' });
    const button = await page.locator('#button1');
    await button.click();
    await expect(page.locator('.modal-content')).toBeVisible();
});
