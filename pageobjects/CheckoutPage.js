class CheckoutPage
{
    constructor(page)
    {
        this.page = page;
        this.countryInput = page.locator("[placeholder*='Country']");
        this.dropdownResults = page.locator(".ta-results");//locator for the dropdown results
        this.userEmail =page.locator(".user__name label[type='text']");
        this.placeOrderButton = page.locator(".action__submit");
    }   

    async selectCountry(shortName, fullCountryName)
    {
        await this.countryInput.pressSequentially(shortName,{delay:150});     
        await this.dropdownResults.waitFor(); 
        const options = await this.dropdownResults.locator("button");
        const optionsCount = await options.count(); 
        for (let i = 0; i < optionsCount; ++i) {
        const text = await options.nth(i).textContent();
        if (text.trim() === fullCountryName) {
        await options.nth(i).click();
        break;
      }
    }
      }

      async verifyUserEmail()
      {
            return this.userEmail;
      }

      async clickPlaceOrder()
      {
            await this.placeOrderButton.click();
      }
}
module.exports = {CheckoutPage};