const {test,expect} = require('@playwright/test');

test('Client App login', async ({ page }) => {
   //js file- Login js, DashboardPage
   const email = "eduardo_leoncape@hotmail.com";
   const productName = 'ZARA COAT 3';
   const products = page.locator(".card-body");

   
   await page.goto("https://rahulshettyacademy.com/client");//navigate to the client app login page
   await page.locator("#userEmail").fill(email);
   await page.locator("#userPassword").fill("Brink123%");
   await page.locator("[value='Login']").click();
   await page.waitForLoadState('networkidle');//wait for the page to load completely (networkidle means no network requests for 500ms)
   await page.locator(".card-body b").first().waitFor();
   const titles = await page.locator(".card-body b").allTextContents();
   console.log(titles); 
   const count = await products.count();
   for (let i = 0; i < count; ++i) {
      if (await products.nth(i).locator("b").textContent() === productName) {
         //add to cart
         await products.nth(i).locator("text= Add To Cart").click();
         break;
      }
   }
 await page.locator("[routerlink*='cart']").click(); 
 
 await page.locator("div li").first().waitFor(); //wait for the cart page to load (subtotal, total, checkout button)
 const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
 expect(bool).toBeTruthy(); 
 //checkout PAGE
     await page.locator("button.btn-primary:has-text('Checkout')").click();
     //country dropdown
     await page.locator("[placeholder*='Country']").pressSequentially("Ind",{delay:150});
     const dropdown = page.locator(".ta-results");
     await dropdown.waitFor();
     const optionsCount = await dropdown.locator("button").count();
     for(let i=0; i<optionsCount; ++i)
     {
        const text = await dropdown.locator("button").nth(i).textContent();
        if(text.trim() === "India")
        {
           await dropdown.locator("button").nth(i).click();
           break;
        }
     } 
        await expect(page.locator(".user__name [type='text']").first()).toHaveText(email);
        //selecting place order button
            await page.locator(".action__submit").click();
            //assertion for the order confirmation
           await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. "); 
           const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
           console.log(orderId);
           //click on my orders link
               await page.locator("button[routerlink*='myorders']").click();
      await page.locator("tbody").waitFor();//wait for the orders page to load (table body)
               const rows = page.locator("tbody tr"); //table rows 
              for (let i = 0; i < await rows.count(); ++i) {
      const rowOrderId = await rows.nth(i).locator("th").textContent();
      if (orderId.includes(rowOrderId)) {
         await rows.nth(i).locator("button").first().click();
         break;
      }
   }
   const orderIdDetails = await page.locator(".col-text").textContent();
   expect(orderId.includes(orderIdDetails)).toBeTruthy();//assert that the order id from the details page matches the one from the confirmation page   
       //await page.pause();

    });


