const{test,expect, request}=require('@playwright/test');
const {APIUtils} = require('../Utils/APIUtils');
// Define your data here so it can be used in beforeAll
const loginPayload = { userEmail: "eduardo_leoncape@hotmail.com", userPassword: "Brink123%" };
const orderPayload = { orders: [{ country: "Mexico", productOrderedId: "6960eac0c941646b7a8b3e68" }] };

let response;

test.beforeAll(async()=>
{   
const apiContext= await request.newContext();
const apiUtils = new APIUtils(apiContext,loginPayload);
response= await apiUtils.createOrder(orderPayload);
}
); 

test('@API Verify Order exists in Order History', async ({ page }) => {
  
   // 1. Inject token to bypass UI Login
    await page.addInitScript(value => {
        window.localStorage.setItem("token", value);
    }, response.token);

    // 2. Go directly to the Orders page
    await page.goto("https://rahulshettyacademy.com/client/dashboard/myorders");

    // 3. Find the orderId we got from the API in beforeAll
    await page.locator("tbody").waitFor();
    const rows = page.locator("tbody tr");

    for (let i = 0; i < await rows.count(); ++i) {
        const rowOrderId = await rows.nth(i).locator("th").textContent();
        // Compare UI order ID with the ID returned by your API call
        if (response.orderId.includes(rowOrderId)) {
            await rows.nth(i).locator("button").first().click();
            break;
        }
    }

    // 4. Final verification on the details page
    const orderIdDetails = await page.locator(".col-text").textContent();
    expect(response.orderId.includes(orderIdDetails)).toBeTruthy();
});