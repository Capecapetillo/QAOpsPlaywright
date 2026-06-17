import {test, expect} from "@playwright/test";

test('Playwright Special locators', async ({page}) => {

    await page.goto("https://rahulshettyacademy.com/angularpractice/");
    await page.getByLabel("Check me out if you Love IceCreams!").click(); 
    await page.getByLabel("Employed").check(); 
    await page.getByLabel("Gender").selectOption("Female");
    await page.getByPlaceholder("Password").fill("abc123");
    await page.getByRole("button", {name: "Submit"}).click();//filter by button 
    await expect(page.getByText("Success! The Form has been submitted successfully!.")).toBeVisible(); //assertion for the success message
    await page.getByRole("Link", {name: "Shop"}).click();//filter by link
    await page.locator("app-card").filter(({hasText: "Nokia Edge"})).getByRole("button").click(); //filter by text and then click on the button inside the card
});
