const { test,expect } = require('@playwright/test');

test('Security test request intercepted', async ({ page }) => {
    // Login and reach orders page
    const email = "eduardo_leoncape@hotmail.com";
    const productName = 'ZARA COAT 3';
    const products = page.locator(".card-body");

    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("#userEmail").fill(email);
    await page.locator("#userPassword").fill("Brink123%");
    await page.locator("[value='Login']").click();
    await page.waitForLoadState('networkidle');
    await page.locator(".card-body b").first().waitFor();

    await page.locator("button[routerLink*='myorders']").click();

    // CORRECTED: Added the arrow function `route => ...` to capture the route object
    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*", route => {
        route.continue({ 
            url: 'https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=64ceb0487244490f9597ef94' 
        });
    });
   
    // CORRECTED: Fixed typo from 'buton' to 'button'
    await page.locator("button:has-text('View')").first().click();
    await expect(page.locator("P").last()).toHaveText("You are not authorize to view this order");
    //await page.pause();
});


