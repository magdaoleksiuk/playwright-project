const { expect } = require('@playwright/test');
exports.datepicker = class datepickerPage {

    constructor(page) {
        this.page = page;
      }
    
      async openPage() {
        await this.page.goto('https://webdriveruniversity.com/Datepicker/index.html');
      }
    
      async selectDate(month, day) {
        const datePickerInput = await this.page.locator('.form-control');
        await datePickerInput.click();
        await this.page.locator(`.datepicker-switch:has-text("${month}")`).click();
        await this.page.locator('.month').nth(day - 1).click();
      }
    
      async verifySelectedDate(expectedDate) {
        const datePickerInput = await this.page.locator('.form-control');
        await expect(datePickerInput).toHaveJSProperty('value', expectedDate);
      }

      
    
}