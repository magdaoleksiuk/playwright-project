import { test, expect } from '@playwright/test';
import { DatepickerPage } from '../pages/datepicker-page'; 

test('Select and verify date', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    const datePickerPage = new DatepickerPage(page);

    await datePickerPage.openPage();
    await datePickerPage.selectDate('August', 20);
    await datePickerPage.verifySelectedDate('06-17-2023');
});
