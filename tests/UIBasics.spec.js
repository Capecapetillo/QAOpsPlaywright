const {test,expect} = require('@playwright/test');
const { text } = require('node:stream/consumers');


test('Browser context Playwright test', async ({browser})=>
    {

       
        //chrome - plugins/cookies 
        const context = await browser.newContext();
         const page = await context.newPage();
        const userName = page.locator('#username');
        const signIn = page.locator('#signInBtn');
        const cardTitles = page.locator('.card-body a');
       await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
       console.log(await page.title());
       // css and xpath, finding elements
        await userName.type("rahulshetty");//type and fill are the same
        await page.locator("[type='password']").type("learning");
        await signIn.click();
        console.log(await page.locator("[style*='block']").textContent());
        //applying assertion 
        await expect(page.locator("[style*='block']")).toContainText("Incorrect");
        //type-fill-test case login happy
        await userName.fill("");
        await userName.fill("rahulshettyacademy");  
        await page.locator("[type='password']").fill("Learning@830$3mK2"); // Use lowercase 'l'
        await signIn.click();
        //PAGE ELEMENTS
       console.log(await cardTitles.first().textContent());
        console.log(await cardTitles.nth(1).textContent());
        const allTitles = await cardTitles.allTextContents();
        console.log(allTitles); 

        
    });

    test('UI Controls', async ({page})=>
    {
        await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
        const userName = page.locator('#username');
        const signIn = page.locator('#signInBtn');
        const documentLink = page.locator("[href*='documents-request']"); 
        //dropdown
        const dropdown = page.locator("select.form-control");
        await dropdown.selectOption("consult"); 
        //radio buttons
        await page.locator(".radiotextsty").last().click(); 
        await page.locator("#okayBtn").click(); 
        //assertion if the radio button is checked
        expect(page.locator(".radiotextsty").last()).toBeChecked(); 
        //to validate the checkbox
        await page.locator("#terms").click(); 
        await expect(page.locator("#terms")).toBeChecked();
        await page.locator("#terms").uncheck();
        expect(await page.locator("#terms").isChecked()).toBeFalsy(); 
        //to validate the blinking link "Free Access to InterviewQues/Resume
        await expect(documentLink).toHaveAttribute("class","blinkingText");

        //        //await page.pause();
 }); 

 test('Child windows hadl', async ({browser})=>
    {   
        const context = await browser.newContext();
        const page = await context.newPage();
        await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
        const documentLink = page.locator("[href*='documents-request']"); 

        const [newPage] = await Promise.all([ //Pending State, Resolution, Rejection.
            context.waitForEvent('page'),
             documentLink.click(),    // Wait for the new page to open
        ]) 
       const text = await newPage.locator(".red").textContent();
       const arrayText = text.split("@");
         const domain = arrayText[1].split(" ")[0];
        console.log(domain);
        await page.locator("#username").fill(domain);
        
        console.log(await page.locator("#username").inputValue()); //if you want to see the value you enter you can use inputValue()
       //await page.pause();//Keep the pause to see it happen
        
     });       