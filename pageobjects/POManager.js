const {LoginPage} = require('../pageobjects/LoginPage');//importing the login page class from the pageobjects folder
const {DashBoardPage} = require('../pageobjects/DashBoardPage');//importing the dashboard page class from the pageobjects folder    
const {CartPage} = require('../pageobjects/CartPage');
const {CheckoutPage} = require('../pageobjects/CheckoutPage');
const { ConfirmationPage } = require('../pageobjects/ConfirmationPage');
const { OrdersPage } = require('../pageobjects/OrdersPage');
const { OrderDetailsPage } = require('../pageobjects/OrderDetailsPage');


class POManager 
{
    constructor(page)
    {  
       this.page = page; 
       this.loginPage = new LoginPage(this.page); 
       this.dashBoardPage = new DashBoardPage(this.page);
       this.cartPage = new CartPage(this.page);//creating instances of the page classes and passing the page object to them    
       this.checkoutPage = new CheckoutPage(this.page);
       this.confirmationPage = new ConfirmationPage(this.page);
       this.ordersPage = new OrdersPage(this.page);
       this.orderDetailsPage = new OrderDetailsPage(this.page);
    }


    getLoginPage()
    {
        return this.loginPage;
    }   


    getDashBoardPage()
    {
        return this.dashBoardPage;
    }   

    getCartPage()
    {
       return this.cartPage;
    }   

    getCheckoutPage()
    {
        return this.checkoutPage;
    }

    getConfirmationPage()
    {
        return this.confirmationPage;
    }   

    getOrdersPage() 
    { 
        return this.ordersPage; 
    }

    getOrderDetailsPage()
    { 
        return this.orderDetailsPage; 
    }
}
module.exports = {POManager};