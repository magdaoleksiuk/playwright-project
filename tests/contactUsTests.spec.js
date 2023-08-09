const {test, expect} = require('@playwright/test');


test('Fill out the form and submit successfully', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://webdriveruniversity.com/Contact-Us/contactus.html');
  
    const formData = {
      first_name: 'John',
      last_name: 'Doe',
      email: 'John.Doe@mail.com',
      message: 'Lorem Ipsum',
    };
  
    for (const field in formData) {
      await page.locator(`[name='${field}']`).type(formData[field]);
    }
  
    await page.locator("[type='submit']").click();
    await expect(page).toHaveURL('https://webdriveruniversity.com/Contact-Us/contact-form-thank-you.html');
  });
  

  test('Fill out the form and reset', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://webdriveruniversity.com/Contact-Us/contactus.html');
  
    const formData = {
      first_name: 'John',
      last_name: 'Doe',
      email: 'John.Doe@mail.com',
      message: 'Lorem Ipsum',
    };
  
    for (const field in formData) {
      await page.locator(`[name='${field}']`).type(formData[field]);
    }
  
    await page.locator("[type='reset']").click();
  
    for (const field in formData) {
      await expect(page.locator(`[name='${field}']`)).toBeEmpty();
    }
  });
  

  test('Fill out part of the form and check error message', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://webdriveruniversity.com/Contact-Us/contactus.html');
  
    const formData = {
      first_name: 'John',
      email: 'John.Doe@mail.com',
      message: 'Lorem Ipsum',
    };
  
    for (const field in formData) {
      await page.locator(`[name='${field}']`).type(formData[field]);
    }
  
    await page.locator("[type='submit']").click();
    await expect(page.locator('body')).toContainText('Error: all fields are required');
  });
  

  test('Enter invalid email and check error message', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://webdriveruniversity.com/Contact-Us/contactus.html');
  
    const formData = {
      first_name: 'John',
      last_name: 'Doe',
      email: 'John.Doe', // Invalid email format
      message: 'Lorem Ipsum',
    };
  
    for (const field in formData) {
      await page.locator(`[name='${field}']`).type(formData[field]);
    }
  
    await page.locator("[type='submit']").click();
    await expect(page.locator('body')).toContainText('Error: Invalid email address');
  });