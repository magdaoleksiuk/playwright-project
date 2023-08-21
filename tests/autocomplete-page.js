const { expect } = require('@playwright/test');
exports.autocomplete = class autocompletePage {

    constructor(page) {
        this.page = page;
      }
    
      async open() {
        await this.page.goto('https://webdriveruniversity.com/Autocomplete-TextField/autocomplete-textfield.html');
      }
    
      async enterTextAndSelectOption(text) {
        const textField = await this.page.locator('#myInput');
        await textField.type(text);
        await this.page.waitForSelector('.autocomplete-items');
    
        const secondOption = await this.page.locator('.autocomplete-items div:nth-child(2)');
        await secondOption.click();
      }
    
      async verifySelectedOption(expectedValue) {
        const textField = await this.page.locator('#myInput');
        await expect(textField).toHaveJSProperty('value', expectedValue);
      }
    
      async submitForm() {
        const submitButton = await this.page.locator('#submit-button');
        await submitButton.click();
      }
    
      async verifyTextFieldIsEmpty() {
        const textField = await this.page.locator('#myInput');
        await expect(textField).toBeEmpty();
      }
    
      async verifyURL(expectedURL) {
        await expect(this.page).toHaveURL(expectedURL);
      }

      
    
}