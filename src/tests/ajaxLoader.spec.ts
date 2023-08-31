import { test, expect } from '@playwright/test';
import { AjaxLoaderPage } from '../pages/ajaxLoader-page' 


test('Test Ajax Loader', async ({ page }) => {
  const ajaxLoader = new AjaxLoaderPage(page);
  await ajaxLoader.open();
  await ajaxLoader.waitForLoaderToBeHidden();
  await ajaxLoader.clickButtonAndWaitForModal();
});

