const {test, expect} = require('@playwright/test');


test('Fill out the form and submit successfully', async ({browser})=>
{
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://webdriveruniversity.com/Contact-Us/contactus.html");
    await page.locator("[name='first_name']").type('John');
    await page.locator("[name='last_name']").type('Doe');
    await page.locator("[name='email']").type('John.Doe@mail.com');
    await page.locator("[name='message']").type('Loret Ipsum');
    await page.locator("[type='submit']").click();
    await expect(page).toHaveURL('https://webdriveruniversity.com/Contact-Us/contact-form-thank-you.html');  
});

test('Fill out the form and reset', async ({browser})=>
{
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://webdriveruniversity.com/Contact-Us/contactus.html");
    await page.locator("[name='first_name']").type('John');
    await page.locator("[name='last_name']").type('Doe');
    await page.locator("[name='email']").type('John.Doe@mail.com');
    await page.locator("[name='message']").type('Loret Ipsum');
    await page.locator("[type='reset']").click();
    await expect(page.locator("[name='first_name']")).toBeEmpty();
    await expect(page.locator("[name='last_name']")).toBeEmpty();
    await expect(page.locator("[name='email']")).toBeEmpty();
    await expect(page.locator("[name='message']")).toBeEmpty();
});

test('Fill out part of the form and check error message', async ({browser})=>
{
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://webdriveruniversity.com/Contact-Us/contactus.html");
    await page.locator("[name='first_name']").type('John');
    await page.locator("[name='email']").type('John.Doe@mail.com');
    await page.locator("[name='message']").type('Loret Ipsum');
    await page.locator("[type='submit']").click();
    await expect(page.getByText('Error: all fields are required')).toBeVisible();
});

test.only('Enter invalid email and check error message', async ({browser})=>
{
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://webdriveruniversity.com/Contact-Us/contactus.html");
    await page.locator("[name='first_name']").type('John');
    await page.locator("[name='last_name']").type('Doe');
    await page.locator("[name='email']").type('John.Doe');
    await page.locator("[name='message']").type('Loret Ipsum');
    await page.locator("[type='submit']").click();
    await expect(page.getByText('Error: Invalid email address')).toBeVisible();
});



