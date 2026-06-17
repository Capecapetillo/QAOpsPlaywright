const{test,expect}=require('@playwright/test');

//test.describe.configure({mode:'parallel'});//to run the tests in parallel
test.describe.configure({mode:'serial'});//to run the tests in serial
test('@Web Popup validations',async({page})=>
    { 
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    await expect(page.locator('#displayed-text')).toBeVisible();
    await page.locator('#hide-textbox').click();
    await expect(page.locator('#displayed-text')).toBeHidden();
    //validating the alert pop up 
    page.on('dialog', dialog => dialog.accept());//accepting the alert pop up
    //page.on('dialog', dialog => dialog.dismiss());//dismissing the alert pop up
    await page.locator('#confirmbtn').click();
    //handle hover button
    await page.locator('#mousehover').hover(); 
    //validating frame locators
    const framesPage= page.frameLocator('#courses-iframe');//locating the frame
    await framesPage.locator("li a[href*='lifetime-access']:visible").click();
    const textCheck= await framesPage.locator('.text h2').textContent();
    console.log(textCheck.split(' ')[1]); 

}); 

test('Screenshot & visual comparison',async({page})=>
    { 
     await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    await expect(page.locator('#displayed-text')).toBeVisible();
    await page.locator('#displayed-text').screenshot({path: 'partialScreenshot.png'});//taking screenshot of the textbox
    await page.locator('#hide-textbox').click();
    await page.screenshot({path: 'screenshot.png'});//taking screenshot of the page
    await expect(page.locator('#displayed-text')).toBeHidden();

     });

     test('Visual',async({page})=>
     { 
      await page.goto("https://google.com/");    
      expect(await page.screenshot()).toMatchSnapshot('landing.png');//comparing the current screenshot with the baseline screenshot
     });
