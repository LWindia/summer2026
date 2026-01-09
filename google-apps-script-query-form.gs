/**
 * Google Apps Script for Query Form Submission
 * 
 * INSTRUCTIONS:
 * 1. Go to https://script.google.com/
 * 2. Create a new project
 * 3. Copy and paste this entire code
 * 4. Replace 'YOUR_SHEET_ID' with your actual Google Sheet ID (found in the sheet URL)
 * 5. Replace 'Sheet1' with your actual sheet name if different
 * 6. Click "Deploy" > "New deployment"
 * 7. Select type: "Web app"
 * 8. Execute as: "Me"
 * 9. Who has access: "Anyone"
 * 10. Click "Deploy"
 * 11. Copy the Web App URL and use it in your .env file as GOOGLE_APPS_SCRIPT_URL
 * 
 * GOOGLE SHEET SETUP:
 * - Create a Google Sheet
 * - Add headers in Row 1: Timestamp, Full Name, Email, Phone, College Name, Query
 * - Copy the Sheet ID from the URL (between /d/ and /edit)
 */

/**
 * GET handler for testing the web app
 * Access the deployment URL in a browser to test
 */
function doGet(e) {
  return ContentService.createTextOutput(JSON.stringify({
    success: true,
    message: 'Google Apps Script is working! Use POST to submit form data.',
    endpoint: 'POST',
    requiredFields: ['fullName', 'email', 'phone', 'college', 'query']
  })).setMimeType(ContentService.MimeType.JSON);
}

/**
 * POST handler for receiving form submissions
 * This is the main function that saves data to Google Sheets
 */
function doPost(e) {
  try {
    // Parse the incoming JSON data
    const data = JSON.parse(e.postData.contents);
    
    // Get the active spreadsheet (replace with your Sheet ID)
    const sheetId = 'YOUR_SHEET_ID'; // REPLACE THIS WITH YOUR ACTUAL SHEET ID
    const sheetName = 'Sheet1'; // REPLACE WITH YOUR SHEET NAME IF DIFFERENT
    
    const spreadsheet = SpreadsheetApp.openById(sheetId);
    const sheet = spreadsheet.getSheetByName(sheetName);
    
    // If sheet doesn't exist, create it with headers
    if (!sheet) {
      const newSheet = spreadsheet.insertSheet(sheetName);
      newSheet.appendRow(['Timestamp', 'Full Name', 'Email', 'Phone', 'College Name', 'Query']);
      // Set header row formatting
      const headerRange = newSheet.getRange(1, 1, 1, 6);
      headerRange.setFontWeight('bold');
      headerRange.setBackground('#4285f4');
      headerRange.setFontColor('#ffffff');
      return ContentService.createTextOutput(JSON.stringify({
        success: true,
        message: 'Sheet created and data saved'
      })).setMimeType(ContentService.MimeType.JSON);
    }
    
    // Get current timestamp
    const timestamp = new Date();
    
    // Extract form data
    const fullName = data.fullName || '';
    const email = data.email || '';
    const phone = data.phone || '';
    const college = data.college || '';
    const query = data.query || '';
    
    // Append data to the sheet
    sheet.appendRow([
      timestamp,
      fullName,
      email,
      phone,
      college,
      query
    ]);
    
    // Return success response
    return ContentService.createTextOutput(JSON.stringify({
      success: true,
      message: 'Data saved successfully',
      timestamp: timestamp.toISOString()
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    // Return error response
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      message: 'Error saving data: ' + error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * OPTIONAL: Function to test the script
 * Run this function manually to test if the script works
 */
function testDoPost() {
  const testData = {
    fullName: 'Test User',
    email: 'test@example.com',
    phone: '1234567890',
    college: 'Test College',
    query: 'This is a test query'
  };
  
  const mockEvent = {
    postData: {
      contents: JSON.stringify(testData)
    }
  };
  
  const result = doPost(mockEvent);
  Logger.log(result.getContent());
}

/**
 * OPTIONAL: Function to set up the sheet with headers
 * Run this once to create headers if they don't exist
 */
function setupSheet() {
  const sheetId = 'YOUR_SHEET_ID'; // REPLACE THIS WITH YOUR ACTUAL SHEET ID
  const sheetName = 'Sheet1'; // REPLACE WITH YOUR SHEET NAME IF DIFFERENT
  
  const spreadsheet = SpreadsheetApp.openById(sheetId);
  let sheet = spreadsheet.getSheetByName(sheetName);
  
  if (!sheet) {
    sheet = spreadsheet.insertSheet(sheetName);
  }
  
  // Clear existing data and set headers
  sheet.clear();
  sheet.appendRow(['Timestamp', 'Full Name', 'Email', 'Phone', 'College Name', 'Query']);
  
  // Format header row
  const headerRange = sheet.getRange(1, 1, 1, 6);
  headerRange.setFontWeight('bold');
  headerRange.setBackground('#4285f4');
  headerRange.setFontColor('#ffffff');
  
  // Set column widths
  sheet.setColumnWidth(1, 150); // Timestamp
  sheet.setColumnWidth(2, 200); // Full Name
  sheet.setColumnWidth(3, 250); // Email
  sheet.setColumnWidth(4, 120); // Phone
  sheet.setColumnWidth(5, 200); // College Name
  sheet.setColumnWidth(6, 400); // Query
  
  Logger.log('Sheet setup completed!');
}

