const { expect } = require('@playwright/test');
exports.dropdown = class dropdownPage {


constructor(page) {
    this.page = page;
  }

  async openPage() {
    await this.page.goto("https://webdriveruniversity.com/Dropdown-Checkboxes-RadioButtons/index.html");
  }

  async selectDropdownOption(dropdownId, optionValue) {
    await this.page.locator(`select#${dropdownId}`).selectOption(optionValue);
  }

  async verifyDropdownOptionText(dropdownIndex, expectedText) {
    await expect(this.page.locator('select.dropdown-menu-lists').nth(dropdownIndex)).toContainText(expectedText);
  }

  async clickCheckboxWithValue(value) {
    const checkbox = await this.page.locator(`input[value='${value}']`);
    await checkbox.click();
  }

  async uncheckCheckboxWithValue(value) {
    const checkbox = await this.page.locator(`input[value='${value}']`);
    await checkbox.uncheck();
  }

  async verifyCheckboxChecked(value) {
    const checkbox = await this.page.locator(`input[value='${value}']`);
    await expect(checkbox).toBeChecked();
  }

  async clickRadioButtonWithValue(value) {
    const radio = await this.page.locator(`input[value='${value}']`);
    await radio.click();
  }

  async verifyRadioButtonChecked(value) {
    const radio = await this.page.locator(`input[value='${value}']`);
    await expect(radio).toBeChecked();
  }
};