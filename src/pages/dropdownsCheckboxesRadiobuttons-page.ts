import { expect } from '@playwright/test';

export class DropdownPage {
    private page: any;

    constructor(page: any) {
        this.page = page;
    }

    async openPage() {
        await this.page.goto("https://webdriveruniversity.com/Dropdown-Checkboxes-RadioButtons/index.html");
    }

    async selectDropdownOption(dropdownId: string, optionValue: string) {
        await this.page.locator(`select#${dropdownId}`).selectOption(optionValue);
    }

    async verifyDropdownOptionText(dropdownIndex: number, expectedText: string) {
        await expect(this.page.locator('select.dropdown-menu-lists').nth(dropdownIndex)).toContainText(expectedText);
    }

    async clickCheckboxWithValue(value: string) {
        const checkbox = await this.page.locator(`input[value='${value}']`);
        await checkbox.click();
    }

    async uncheckCheckboxWithValue(value: string) {
        const checkbox = await this.page.locator(`input[value='${value}']`);
        await checkbox.uncheck();
    }

    async verifyCheckboxChecked(value: string) {
        const checkbox = await this.page.locator(`input[value='${value}']`);
        await expect(checkbox).toBeChecked();
    }

    async clickRadioButtonWithValue(value: string) {
        const radio = await this.page.locator(`input[value='${value}']`);
        await radio.click();
    }

    async verifyRadioButtonChecked(value: string) {
        const radio = await this.page.locator(`input[value='${value}']`);
        await expect(radio).toBeChecked();
    }
}
