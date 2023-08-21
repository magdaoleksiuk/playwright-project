const { test, expect } = require('@playwright/test');
const { formData1, formData2, formData3, formData4 } = require('./testData');

test('Fill out the form and submit successfully', async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto('https://webdriveruniversity.com/Contact-Us/contactus.html');

  for (const field in formData1) {
    await page.locator(`[name='${field}']`).type(formData1[field]);
  }

  await page.locator("[type='submit']").click();
  await expect(page).toHaveURL('https://webdriveruniversity.com/Contact-Us/contact-form-thank-you.html');
});

test('Fill out the form and reset', async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto('https://webdriveruniversity.com/Contact-Us/contactus.html');

  for (const field in formData2) {
    await page.locator(`[name='${field}']`).type(formData2[field]);
  }

  await page.locator("[type='reset']").click();

  for (const field in formData2) {
    await expect(page.locator(`[name='${field}']`)).toBeEmpty();
  }
});

test('Fill out part of the form and check error message', async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto('https://webdriveruniversity.com/Contact-Us/contactus.html');

  for (const field in formData3) {
    await page.locator(`[name='${field}']`).type(formData3[field]);
  }

  await page.locator("[type='submit']").click();
  await expect(page.locator('body')).toContainText('Error: all fields are required');
});

test('Enter an invalid email and check error message', async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto('https://webdriveruniversity.com/Contact-Us/contactus.html');

  for (const field in formData4) {
    await page.locator(`[name='${field}']`).type(formData4[field]);
  }

  await page.locator("[type='submit']").click();
  await expect(page.locator('body')).toContainText('Error: Invalid email address');
});
