const {test,expect} = require('@playwright/test');

test('@Webst Client App login', async ({ page }) => {
   //js file- Login js, DashboardPage
   const email = "eduardo_leoncape@hotmail.com";
   const productName = 'ZARA COAT 3';
   const products = page.locator(".card-body");
   await page.goto("https://rahulshettyacademy.com/client");//navigate to the client app login page
   await page.getByPlaceholder("email@example.com").fill(email);
   await page.getByPlaceholder("enter your passsword").fill("Brink123%");
   await page.getByRole("button", {name: "Login"}).click();//navigate to the client app login page
   await page.waitForLoadState('networkidle');//wait for the page to load completely (networkidle means no network requests for 500ms)
   await page.locator(".card-body b").first().waitFor();

   await page.locator(".card-body").filter({hasText: "ZARA COAT 3"})
   .getByRole("button", {name:"Add to Cart"}).click();//filter by text and then click on the button inside the card
   await page.getByRole("listitem").getByRole('button', {name:"Cart"}).click();//filter by list and then click on Kart button
  
   
    //await page.pause();
   await page.locator("div li").first().waitFor();
   await expect(page.getByText("ZARA COAT 3")).toBeVisible();
 
   await page.getByRole("button",{name :"Checkout"}).click();
 
   await page.getByPlaceholder("Select Country").pressSequentially("ind");
 
   await page.getByRole("button",{name :"India"}).nth(1).click();
   await page.getByText("PLACE ORDER").click();
 
   await expect(page.getByText("Thankyou for the order.")).toBeVisible();

    });


