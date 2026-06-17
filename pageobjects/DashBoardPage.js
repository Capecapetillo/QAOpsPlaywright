class DashBoardPage {
    
    constructor(page)
    {
         this.products = page.locator(".card-body");
         this.productsText = page.locator(".card-body b");
         this.cart = page.locator("[routerlink*='cart']");
         this.animationLoading = page.locator(".ngx-spinner-overlay"); 
    }

    async searchProductAddCart(productName)
    {

           const titles = await this.productsText.allTextContents(); 
           console.log(titles); 
           const count = await this.products.count();
           for (let i = 0; i < count; ++i) {
              if (await this.products.nth(i).locator("b").textContent() === productName) {
                 //add to cart
                 await this.products.nth(i).locator("text= Add To Cart").click();
                await this.animationLoading.waitFor({ state: 'hidden' });
                 break;
              }
           }
}

async navigateToCart()
{
    await this.cart.click({ force: true });    // ¡SOLUCIÓN!: Forzamos el clic para saltar la restricción del viewport móvil del iPhone      

}
}
module.exports = {DashBoardPage};