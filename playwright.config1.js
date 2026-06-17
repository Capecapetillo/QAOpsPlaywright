const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests', // Make sure your file is here!
  retries:1,//Retries: If a test fails, Playwright will automatically retry it up to the specified number of times. This can help mitigate transient issues and improve test stability.
  workes:3, //Parallel Execution: Instead of running tests one after the other, Playwright assigns different test files to multiple worker processes that run at the same time.
  timeout: 40000,
  expect: {
    timeout: 40000
  },
  reporter: 'html',//Reporter: Playwright supports various reporters that generate test execution reports in different formats. The 'html' reporter generates an HTML report that provides a visual representation of the test results, including details about passed, failed, and skipped tests.

  projects : [
    {
  name : 'safari',    
  use: {
    //...devices['iphone 11'],
    browserName: 'webkit', 
    headless: false, //false opens the browser. true does not open a browser
    screenshot : 'on',
    trace: 'on',
    //viewport: { width: 414, height: 896 }
  }
  },

  {
    name : 'chrome',
    use: {
    browserName: 'chromium', 
    headless: false,
    screenshot : 'on',
    video: 'retain-on-failure',//record a video of every test execution but delete the file for successful tests, keeping only those where the test fails
    ignoreHttpsErrors:true,// is a configuration setting used to bypass security warnings when a website's SSL/TLS certificate is invalid, expired, or self-signed
    permissions: ['geolocation'],// is a configuration setting used to automatically grant the browser permission to access the user's location
    trace: 'on',
    //..devices['']
    //viewport : {width:720,height:720}//to make your browser small
  }
  }
]
});