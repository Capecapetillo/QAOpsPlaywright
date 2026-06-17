import { test, expect } from '@playwright/test';
const Base_URL = 'https://eventhub.rahulshettyacademy.com/';
const Email= 'eduardo_leoncape@hotmail.com';
const Password= 'Test190?[]';

//helper function to login
async function login(page){
    //1.navigate to the login page
    await page.goto(Base_URL);
    await page.getByPlaceholder('you@email.com').fill(Email);
    await page.getByLabel('Password').fill(Password);
    await page.locator('#login-btn').click();
    //2. Verify that the login was successful by checking for the presence of a specific element on the dashboard
    await expect(page.getByRole('link', { name: 'Browse Events →' })).toBeVisible({ timeout: 10000 });
    }

    //helper 
    function futureDateValue() {
    const future = new Date();
    future.setDate(future.getDate() + 7); // 7 days from today
    
    // Format: YYYY-MM-DDTHH:MM (standard datetime-local input format)
    const year = future.getFullYear();
    const month = String(future.getMonth() + 1).padStart(2, '0');
    const day = String(future.getDate()).padStart(2, '0');
    
    return `${year}-${month}-${day}T10:00`;
    // → e.g. "2026-05-15T10:00"
}

test('Booking an event', async ({ page }) => {
    //1. Login to the application
    await login(page);  
    //Step 2 — Create a new event
    await page.goto(`${Base_URL}admin/events`);//Navigate to /admin/events
    // Generate a unique event title and store it
    const eventTitle = `Test Event ${Date.now()}`;
    await page.locator('#event-title-input').fill(eventTitle);
    await page.getByPlaceholder('Describe the event…').fill('Playwright test event 2');
    await page.getByLabel('City').fill('Test Leon2');
    await page.getByLabel('Venue').fill('Test Venue2');
    await page.getByLabel('Event Date & Time').fill(futureDateValue());
    await page.getByLabel('Price ($)').fill('100');
    await page.getByLabel('Total Seats').fill('50');
    await page.locator('#add-event-btn').click(); 
    // Wait for success toast
    await expect(page.getByText('Event created!')).toBeVisible();
    
    //3- go to even oage
    await page.goto(`${Base_URL}events`);
    const allcardsevents = page.locator('#event-card');
    // Assert the first card is visible (confirms page loaded)
    await expect(allcardsevents.first()).toBeVisible({ timeout: 10000 });
    // Filter for the card that contains our event title
    const matchedCard = allcardsevents.filter({ hasText: eventTitle });
    // Assert the matched card is visible
    await expect(matchedCard).toBeVisible({ timeout: 5000 });
    //reading the seats available before booking
    // Read the seat count text from the matched card
    const seatText = await matchedCard.getByText(/seat/i).innerText();

    // Parse the integer from the text and store as seatsBeforeBooking
    const seatsBeforeBooking = parseInt(seatText.match(/\d+/)[0]);

    console.log(`Seats before booking: ${seatsBeforeBooking}`);  
    //click the "Book Now" button on the matched card
    await matchedCard.getByTestId('book-now-btn').click();
    // ──Step 5 — Fill booking form
    // Quantity defaults to 1 — verify via id
    const ticketCount = page.locator('#ticket-count');
    await expect(ticketCount).toHaveText('1');
    await page.getByLabel('Full Name').fill('Eduardo Leon');
    await page.locator('#customer-email').fill(Email);
    await page.getByPlaceholder('+91 98765 43210').fill('1234567890');
    await page.locator('.confirm-booking-btn').click();
    // ──Step 6 — Verify booking success
    const  bookingRefElement = page.locator('.booking-ref').first();//// Locate the booking reference element
    await expect(bookingRefElement).toBeVisible({ timeout: 10000 }); 
    // Read its inner text, trim it and store as bookingRef
    const bookingRef = (await bookingRefElement.innerText()).trim();
    console.log(`Booking reference: ${bookingRef}`);
    // ──Step 7 — Verify in My Bookings
    await page.getByRole('link', { name: 'View My Bookings' }).click(); 
    // Assert: URL is BASE_URL/bookings
    await expect(page).toHaveURL(`${Base_URL}bookings`);
    // Get all booking cards
  const bookingCards = page.locator('#booking-card');
    // Assert the first booking card is visible
  await expect(bookingCards.first()).toBeVisible();
  // Filter booking cards for the one containing the specific booking reference
  const matchedBookingCard = bookingCards.filter({
        has: page.locator('.booking-ref'),
        hasText: bookingRef
    });
    // Assert matched card visibility and content
  await expect(matchedBookingCard).toBeVisible();
  await expect(matchedBookingCard).toContainText(eventTitle);
  // ── Step 8: Verify seat reduction ──

// 1. Fix the URL (remove the extra slash)
await page.goto(`${Base_URL}events`);

// 2. Wait for ANY event card to appear first. 
// This ensures the dynamic list has actually loaded from the database.
const allCards = page.locator('#event-card');
await expect(allCards.first()).toBeVisible({ timeout: 15000 });

// 3. Now filter for your specific event
const eventCardAfter = allCards.filter({ hasText: eventTitle });

// 4. Give it a dedicated assertion to help debug if it fails here
await expect(eventCardAfter).toBeVisible({ 
  message: `Could not find the event card with title: ${eventTitle}` 
});

// 5. Read the seat count text again
const seatsAfterText = await eventCardAfter.getByText(/seat/i).innerText();
const seatsAfterBooking = parseInt(seatsAfterText.match(/\d+/)[0]);

// 6. Final Assertion
expect(seatsAfterBooking).toBe(seatsBeforeBooking - 1);
}); // Only one closing set needed here
    


