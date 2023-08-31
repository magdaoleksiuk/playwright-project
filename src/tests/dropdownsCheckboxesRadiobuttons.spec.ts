import { test, expect } from '@playwright/test';
import { DropdownPage } from '../pages/dropdownsCheckboxesRadiobuttons-page';

test('Verifying 1st dropdown content', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    const dropdownPage = new DropdownPage(page);

    await dropdownPage.openPage();
    await dropdownPage.selectDropdownOption('dropdowm-menu-1', 'java');
    await dropdownPage.verifyDropdownOptionText(0, 'JAVA');
    await dropdownPage.selectDropdownOption('dropdowm-menu-1', 'C#');
    await dropdownPage.verifyDropdownOptionText(0, 'C#');
    await dropdownPage.selectDropdownOption('dropdowm-menu-1', 'python');
    await dropdownPage.verifyDropdownOptionText(0, 'Python');
    await dropdownPage.selectDropdownOption('dropdowm-menu-1', 'sql');
    await dropdownPage.verifyDropdownOptionText(0, 'SQL');
});

test('Verifying 2nd dropdown content', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    const dropdownPage = new DropdownPage(page);

    await dropdownPage.openPage();
    await dropdownPage.selectDropdownOption('dropdowm-menu-2', 'eclipse');
    await dropdownPage.verifyDropdownOptionText(1, 'Eclipse');
    await dropdownPage.selectDropdownOption('dropdowm-menu-2', 'maven');
    await dropdownPage.verifyDropdownOptionText(1, 'Maven');
    await dropdownPage.selectDropdownOption('dropdowm-menu-2', 'testng');
    await dropdownPage.verifyDropdownOptionText(1, 'TestNG');
    await dropdownPage.selectDropdownOption('dropdowm-menu-2', 'junit');
    await dropdownPage.verifyDropdownOptionText(1, 'JUnit');
});

test('Verifying 3rd dropdown content', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    const dropdownPage = new DropdownPage(page);

    await dropdownPage.openPage();
    await dropdownPage.selectDropdownOption('dropdowm-menu-3', 'html');
    await dropdownPage.verifyDropdownOptionText(2, 'HTML');
    await dropdownPage.selectDropdownOption('dropdowm-menu-3', 'css');
    await dropdownPage.verifyDropdownOptionText(2, 'CSS');
    await dropdownPage.selectDropdownOption('dropdowm-menu-3', 'javascript');
    await dropdownPage.verifyDropdownOptionText(2, 'JavaScript');
    await dropdownPage.selectDropdownOption('dropdowm-menu-3', 'jquery');
    await dropdownPage.verifyDropdownOptionText(2, 'JQuery');
});

test('Verifying checkboxes', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    const dropdownPage = new DropdownPage(page);

    await dropdownPage.openPage();

    const checkboxValues = ['option-1', 'option-2', 'option-4'];

    for (const value of checkboxValues) {
        await dropdownPage.clickCheckboxWithValue(value);
    }

    const uncheckedCheckboxValues = ['option-2', 'option-4'];

    for (const value of uncheckedCheckboxValues) {
        await dropdownPage.uncheckCheckboxWithValue(value);
        await dropdownPage.verifyCheckboxChecked(value);
    }

    const checkedCheckboxValues = ['option-1', 'option-3'];

    for (const value of checkedCheckboxValues) {
        await dropdownPage.verifyCheckboxChecked(value);
    }
});

test('Verifying radio buttons', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    const dropdownPage = new DropdownPage(page);

    await dropdownPage.openPage();

    const radioValues = ['green', 'blue', 'yellow', 'orange', 'purple'];

    for (const value of radioValues) {
        await dropdownPage.clickRadioButtonWithValue(value);
        await dropdownPage.verifyRadioButtonChecked(value);
    }
});
