class CartPage{

constructor(page)
{
    this.page = page;
    this.cartItems = page.locator("div.cart li");//wait for the cart page to load (subtotal, total, checkout button)
    this.checkoutButton = page.locator("button.btn-primary:has-text('Checkout')");

}

async waitForCartPageToLoad()
{
    // 1. Force Playwright to wait until the URL actually changes to the cart page
    await this.page.waitForURL('https://rahulshettyacademy.com/client/#/dashboard/cart'); // Adjust the string to match your cart page URL path
     //2-wait for the cart page to load (subtotal, total, checkout button)
    await this.cartItems.first().waitFor({ state: 'visible' });
}


async verifyProductIsVisible(productName) {
    // Dynamically find the product by name
    const productLocator = this.page.locator(`h3:has-text('${productName}')`);
    await productLocator.waitFor({ state: 'visible', timeout: 5000 });
    return await productLocator.isVisible();
  }

async clickCheckout()
{
    await this.checkoutButton.click();
}
} 
module.exports = {CartPage};