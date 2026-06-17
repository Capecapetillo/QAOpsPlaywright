/**
 *   await page.locator("tbody").waitFor();//wait for the orders page to load (table body)
               const rows = page.locator("tbody tr"); //table rows 
              for (let i = 0; i < await rows.count(); ++i) {
      const rowOrderId = await rows.nth(i).locator("th").textContent();
      if (orderId.includes(rowOrderId)) {
         await rows.nth(i).locator("button").first().click();
         break;
      }
   }
  
    });
 * / */

 class OrdersPage {

    constructor(page)
    {
        this.page = page;
         this.listofproducts =  page.locator("tbody");
         this.tablerows = page.locator("tbody tr");
    }

    async searchOrderAndSelect(orderId) 
    {
        await this.listofproducts.waitFor();
        const count = await this.tablerows.count();
        
        for (let i = 0; i < count; ++i) {
            const rowOrderId = await this.tablerows.nth(i).locator("th").textContent();
            if (orderId.includes(rowOrderId)) {
                await this.tablerows.nth(i).locator("button").first().click();
                break;
            }
        }
    }

 }
 module.exports = { OrdersPage };