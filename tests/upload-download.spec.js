const ExcelJs = require('exceljs');
const { test, expect } = require('@playwright/test');
 
async function writeExcelTest(searchText, replaceText, change, filePath) {
  const workbook = new ExcelJs.Workbook();
  await workbook.xlsx.readFile(filePath);
  const worksheet = workbook.getWorksheet('Sheet1');
  const output = readExcel(worksheet, searchText); 
 
  const cell = worksheet.getCell(output.row, output.column + change.colChange);
  cell.value = replaceText;
  await workbook.xlsx.writeFile(filePath);
}
 
function readExcel(worksheet, searchText) {
  let output = { row: -1, column: -1 };
  worksheet.eachRow((row, rowNumber) => {
    row.eachCell((cell, colNumber) => {
      if (cell.value === searchText) {
        output = { row: rowNumber, column: colNumber };
      }
    });
  });
  return output;
}
 
test('Upload download excel validation', async ({ page }) => {
  const textSearch = 'Mango';
  const updateValue = '350';
  const filePath = 'C:/Users/javier.romero/Documents/Playwright/ExceldownloadTest.xlsx'; 
 
  await page.goto('https://rahulshettyacademy.com/upload-download-test/index.html');
 
  // Capture download event streams
  const downloadPromise = page.waitForEvent('download');
  await page.getByRole('button', { name: 'Download' }).click();
  const dl = await downloadPromise;
  
  // FIX 1: Physically write the downloaded stream to disk before manipulation
  await dl.saveAs(filePath); 
 
  // Ensure the edit finishes completely before upload
  await writeExcelTest(textSearch, updateValue, { rowChange: 0, colChange: 2 }, filePath);
 
  // Upload mutated binary data
  await page.locator('#fileinput').setInputFiles(filePath);
 
  // FIX 2: Removed improper await from locator assignment
  const desiredRow = page.getByRole('row').filter({ has: page.getByText(textSearch) });
  
  // FIX 3: Swapped #cell-4-undefined with the live DOM ID #cell-4-underlying
   await expect(desiredRow).toContainText(updateValue);
});