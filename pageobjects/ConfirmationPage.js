/*
//conformation page 
            //assertion for the order confirmation
           await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. "); 
           const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
           console.log(orderId);
           //click on my orders link
               await page.locator("button[routerlink*='myorders']").click();

*/

class ConfirmationPage {

constructor(page)
{
   this.page= page;
   this.message = page.locator(".hero-primary");
   this.orderIdText  = page.locator(".em-spacer-1 .ng-star-inserted");
   this.myOrdersButton = page.locator("button[routerlink*='myorders']"); 
}

async getConfirmationMessage()
{
   return this.message;  

}

async getOrderId()
{
    const fullText = await this.orderIdText.textContent();
        // Returning the trimmed text so it's clean for the console/next steps
        return fullText.trim();
}

async clickMyOrders()
{
    await this.myOrdersButton.click();  

} 
}
module.exports = {ConfirmationPage};