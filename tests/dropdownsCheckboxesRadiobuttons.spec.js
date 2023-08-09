const {test, expect} = require('@playwright/test');

test('Verifying 1st dropdown content', async ({browser})=>
{
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://webdriveruniversity.com/Dropdown-Checkboxes-RadioButtons/index.html");
    await page.locator('select#dropdowm-menu-1').selectOption('java');
    await expect(page.locator('select.dropdown-menu-lists').nth(0)).toContainText('JAVA');
    await page.locator('select#dropdowm-menu-1').selectOption('C#');
    await expect(page.locator('select.dropdown-menu-lists').nth(0)).toContainText('C#');
    await page.locator('select#dropdowm-menu-1').selectOption('python');
    await expect(page.locator('select.dropdown-menu-lists').nth(0)).toContainText('Python');
    await page.locator('select#dropdowm-menu-1').selectOption('sql');
    await expect(page.locator('select.dropdown-menu-lists').nth(0)).toContainText('SQL');
});

test('Verifying 2nd dropdown content', async ({browser})=>
{
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://webdriveruniversity.com/Dropdown-Checkboxes-RadioButtons/index.html");
    await page.locator('select#dropdowm-menu-2').selectOption('eclipse');
    await expect(page.locator('select.dropdown-menu-lists').nth(1)).toContainText('Eclipse');
    await page.locator('select#dropdowm-menu-2').selectOption('maven');
    await expect(page.locator('select.dropdown-menu-lists').nth(1)).toContainText('Maven');
    await page.locator('select#dropdowm-menu-2').selectOption('testng');
    await expect(page.locator('select.dropdown-menu-lists').nth(1)).toContainText('TestNG');
    await page.locator('select#dropdowm-menu-2').selectOption('junit');
    await expect(page.locator('select.dropdown-menu-lists').nth(1)).toContainText('JUnit');
});

test('Verifying 3rd dropdown content', async ({browser})=>
{
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://webdriveruniversity.com/Dropdown-Checkboxes-RadioButtons/index.html");
    await page.locator('select#dropdowm-menu-3').selectOption('html');
    await expect(page.locator('select.dropdown-menu-lists').nth(2)).toContainText('HTML');
    await page.locator('select#dropdowm-menu-3').selectOption('css');
    await expect(page.locator('select.dropdown-menu-lists').nth(2)).toContainText('CSS');
    await page.locator('select#dropdowm-menu-3').selectOption('javascript');
    await expect(page.locator('select.dropdown-menu-lists').nth(2)).toContainText('JavaScript');
    await page.locator('select#dropdowm-menu-3').selectOption('jquery');
    await expect(page.locator('select.dropdown-menu-lists').nth(2)).toContainText('JQuery');
});

test('Verifying checkboxes', async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto('https://webdriveruniversity.com/Dropdown-Checkboxes-RadioButtons/index.html');

  const checkboxValues = ['option-1', 'option-2', 'option-4'];

  for (const value of checkboxValues) {
    const checkbox = await page.locator(`input[value='${value}']`);
    await checkbox.click();
  }

  const uncheckedCheckboxValues = ['option-2', 'option-4'];

  for (const value of uncheckedCheckboxValues) {
    const checkbox = await page.locator(`input[value='${value}']`);
    await checkbox.uncheck();
    await expect(checkbox).not.toBeChecked();
  }

  const checkedCheckboxValues = ['option-1', 'option-3'];

  for (const value of checkedCheckboxValues) {
    const checkbox = await page.locator(`input[value='${value}']`);
    await expect(checkbox).toBeChecked();
  }
});

test('Verifying radio buttons', async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto('https://webdriveruniversity.com/Dropdown-Checkboxes-RadioButtons/index.html');

  const radioValues = ['green', 'blue', 'yellow', 'orange', 'purple'];

  for (const value of radioValues) {
    const radio = await page.locator(`input[value='${value}']`);
    await radio.click();
    await expect(radio).toBeChecked();
  }
});





  


