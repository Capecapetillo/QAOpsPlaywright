class LoginPage {

constructor(page) 
{
this.page = page;    
this.signInButton = page.locator("[value='Login']"); 
this.userName = page.locator("#userEmail");
this.password = page.locator("#userPassword");

}

async goTo()
{
 await this.page.goto("https://rahulshettyacademy.com/client");//navigate to the client app login page
}

async validLogin(userName, password)
{
    await this.userName.fill(userName);
    await this.password.fill(password);
    await this.signInButton.click();
    await this.page.waitForLoadState("networkidle");//wait for the page to load after login
}

}
module.exports = {LoginPage};