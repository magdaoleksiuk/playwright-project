const { expect } = require('@playwright/test');
exports.ajaxLoader = class ajaxLoaderPage {

    constructor(page) {
        this.page = page;
        this.url = 'https://webdriveruniversity.com/Ajax-Loader/index.html';
      }
    
      async open() {
        await this.page.goto(this.url);
      }
    
      async waitForLoaderToBeHidden() {
        await this.page.waitForSelector('#loader', { state: 'hidden' });
      }
    
      async clickButtonAndWaitForModal() {
        const button = await this.page.locator('#button1');
        await button.click();
        await expect(this.page.locator('.modal-content')).toBeVisible();
      }

      
    
}