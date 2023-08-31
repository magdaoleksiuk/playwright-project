const { devices } = require('@playwright/test');

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