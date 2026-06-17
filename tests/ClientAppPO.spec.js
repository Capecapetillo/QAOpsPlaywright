const {test,expect} = require('@playwright/test');
const {customtest} = require('../Utils/test-base');//importing the test data from the test-base.js file
const {POManager} = require('../pageobjects/POManager');//importing the POManager class from the pageobjects folder
//json->string->js object
//const dataSet =JSON.parse(JSON.stringify(require('../Utils/placeorderTestData.json')));//importing the test data from the placeorderTestData.json file 
//  Clean, modern, and native way
const dataSet = require('../Utils/placeorderTestData.json');

for(const data of dataSet)
{
test(`@Web Client App login for ${data.productName}`, async ({ page }) => {

   const poManager = new POManager(page);//creating an instance of the POManager class
   //test data (after a json file was created, we can remove the test data from here and use the json file instead)
   const products = page.locator(".card-body");
   const loginPage = poManager.getLoginPage(); //getting the login page object from the POManager class
   //login page implementation using page object model
  //objecte were sent to POmanager.js file
  await  loginPage.goTo();
   await loginPage.validLogin(data.email, data.password);
   //dashboard page implementation using page object model
   const dashBoardPage = poManager.getDashBoardPage(); //getting the dashboard page object from the POManager class
   await dashBoardPage.searchProductAddCart(data.productName);
   await dashBoardPage.navigateToCart();
   //cart page
 const cartPage = poManager.getCartPage(); //getting the cart page object from the POManager class
 await cartPage.waitForCartPageToLoad();////wait for the cart page to load (subtotal, total, checkout button) 
 const isVisible = await cartPage.verifyProductIsVisible(data.productName);
 expect(isVisible).toBeTruthy();
 await cartPage.clickCheckout();
 //checkout PAGE
 const checkoutPage =  poManager.getCheckoutPage(); //getting the checkout page object from the POManager class
 await checkoutPage.selectCountry("ind","India");
 // 3. Assert email (keeping the assertion in the test file is best practice)
 const emaillocator = await checkoutPage.verifyUserEmail();
 await  expect(emaillocator).toHaveText(data.email);
// 4. Place Order
await  checkoutPage.clickPlaceOrder();

//---------------------------------------confirmation page-------------------------
 const confirmationPage = poManager.getConfirmationPage();//   getting the confirmation page object from the POManager class    
 // 1. Assert the message
 const confirmationMessage = await confirmationPage.getConfirmationMessage();
 await expect(confirmationMessage).toHaveText(" Thankyou for the order. ");
 // 2. Extract and log the ID
const orderId = await confirmationPage.getOrderId();
console.log(orderId);
   // 3. Move to History
await confirmationPage.clickMyOrders(); 

  //--------------------------------------orders page--------------------------------        
const ordersPage = poManager.getOrdersPage();
await ordersPage.searchOrderAndSelect(orderId);

//--------------------------------------order details page-------------------------------
// 3. Order Details Page (Final Validation)
const orderDetailsPage = poManager.getOrderDetailsPage();
const finalOrderId = await orderDetailsPage.getOrderIdDetails();
expect(orderId.includes(finalOrderId)).toBeTruthy();

});
}


customtest(`Client App login`, async ({ page, testDataForOrder}) => {

const poManager = new POManager(page);//creating an instance of the POManager class
//test data (after a json file was created, we can remove the test data from here and use the json file instead)
const products = page.locator(".card-body");
const loginPage = poManager.getLoginPage(); //getting the login page object from the POManager class
//login page implementation using page object model
//objecte were sent to POmanager.js file
await  loginPage.goTo();
await loginPage.validLogin(testDataForOrder.email, testDataForOrder.password);
//dashboard page implementation using page object model
const dashBoardPage = poManager.getDashBoardPage(); //getting the dashboard page object from the POManager class
await dashBoardPage.searchProductAddCart(testDataForOrder.productName);
await dashBoardPage.navigateToCart();
//cart page
const cartPage = poManager.getCartPage(); //getting the cart page object from the POManager class
await cartPage.waitForCartPageToLoad();////wait for the cart page to load (subtotal, total, checkout button) 
const isVisible = await cartPage.verifyProductIsVisible(testDataForOrder.productName);
expect(isVisible).toBeTruthy();
await cartPage.clickCheckout();
});