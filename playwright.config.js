const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests', // Make sure your file is here!
  timeout: 40000,
  expect: {
    timeout: 40000
  },
  reporter: 'html',
  use: {
    browserName: 'chromium', 
    headless: false,
    screenshot : 'on',
    trace: 'on',

             // Set to false to see the browser run
  }
});