const { defineConfig, devices } = require('@playwright/test');

/** @type {import('@playwright/test').PlaywrightTestConfig} */
const config = {
  workers: 2,
  use: {
    headless: false,
    viewport: { width: 1280, height: 720 },
    // launchOptions: {
    //   slowMo: 1000,
    // },
    video:"on",
    baseURL: 'https://petstore.swagger.io/v2/',
    },
  projects: [
    {
      name: 'Desktop Chromium',
      use: {
        browserName: 'chromium',
      },
    },
  ],
};

module.exports = config;

