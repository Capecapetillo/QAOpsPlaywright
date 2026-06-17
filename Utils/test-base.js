const base = require('@playwright/test');

exports.customtest = base.test.extend({
  // Fixtures must be defined as an async function with the 'use' callback
  testDataForOrder: async ({ page }, use) => {
    
    const data = {
      email: "eduardo_leoncape@hotmail.com",
      password: "Brink123%",
      productName: "ZARA COAT 3"
    };

    // This 'use' function passes the data down to your test cases
    await use(data);
  }
});