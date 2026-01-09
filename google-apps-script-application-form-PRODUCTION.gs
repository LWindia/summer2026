/**
 * PRODUCTION-READY Google Apps Script for Application Form Submission
 * 
 * This script automatically saves application form data to Google Sheets
 * with proper error handling, validation, and logging.
 * 
 * SETUP INSTRUCTIONS:
 * 1. Go to https://script.google.com/
 * 2. Create a new project
 * 3. Copy and paste this entire code
 * 4. Replace 'YOUR_SHEET_ID' with your actual Google Sheet ID (found in the sheet URL)
 * 5. Replace 'Sheet1' with your actual sheet name if different
 * 6. Click "Deploy" > "New deployment"
 * 7. Select type: "Web app"
 * 8. Execute as: "Me"
 * 9. Who has access: "Anyone" (CRITICAL!)
 * 10. Click "Deploy"
 * 11. Copy the Web App URL and use it in your environment variable: GOOGLE_APPS_SCRIPT_URL_APPLICATION_FORM
 * 
 * GOOGLE SHEET SETUP:
 * - Create a Google Sheet (separate from query form sheet)
 * - The script will automatically create headers if they don't exist
 * - Copy the Sheet ID from the URL (between /d/ and /edit)
 */

// ============================================
// CONFIGURATION - UPDATE THESE VALUES
// ============================================
const CONFIG = {
  SHEET_ID: 'YOUR_SHEET_ID', // REPLACE WITH YOUR ACTUAL SHEET ID
  SHEET_NAME: 'Sheet1', // REPLACE WITH YOUR SHEET NAME IF DIFFERENT
  LOGGING_ENABLED: true // Set to false to disable detailed logging
};

// ============================================
// GET HANDLER - For testing the web app
// ============================================
function doGet(e) {
  try {
    return ContentService.createTextOutput(JSON.stringify({
      success: true,
      message: 'Application Form Google Apps Script is working! Use POST to submit form data.',
      endpoint: 'POST',
      timestamp: new Date().toISOString(),
      config: {
        sheetId: CONFIG.SHEET_ID !== 'YOUR_SHEET_ID' ? 'Configured' : 'NOT CONFIGURED',
        sheetName: CONFIG.SHEET_NAME
      }
    })).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      message: 'Error in doGet: ' + error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

// ============================================
// POST HANDLER - Main function for saving data
// ============================================
function doPost(e) {
  let logMessages = [];
  
  try {
    // Validate request
    if (!e || !e.postData || !e.postData.contents) {
      throw new Error('Invalid request: Missing postData.contents');
    }
    
    log('Starting doPost handler', logMessages);
    
    // Parse JSON data
    let data;
    try {
      data = JSON.parse(e.postData.contents);
      log('JSON parsed successfully', logMessages);
    } catch (parseError) {
      throw new Error('Invalid JSON: ' + parseError.toString());
    }
    
    // Validate configuration
    if (CONFIG.SHEET_ID === 'YOUR_SHEET_ID') {
      throw new Error('Sheet ID not configured. Please update CONFIG.SHEET_ID in the script.');
    }
    
    // Get or create spreadsheet and sheet
    let spreadsheet, sheet;
    try {
      spreadsheet = SpreadsheetApp.openById(CONFIG.SHEET_ID);
      log('Spreadsheet opened successfully', logMessages);
    } catch (sheetError) {
      throw new Error('Cannot access spreadsheet. Check Sheet ID: ' + sheetError.toString());
    }
    
    sheet = spreadsheet.getSheetByName(CONFIG.SHEET_NAME);
    
    // Create sheet with headers if it doesn't exist
    if (!sheet) {
      log('Sheet does not exist, creating new sheet', logMessages);
      sheet = spreadsheet.insertSheet(CONFIG.SHEET_NAME);
      setupSheetHeaders(sheet);
      log('Sheet created and headers set', logMessages);
    } else {
      // Ensure headers exist
      const headerRow = sheet.getRange(1, 1, 1, 15).getValues()[0];
      if (!headerRow[0] || headerRow[0] !== 'Timestamp') {
        log('Headers missing, setting up headers', logMessages);
        sheet.insertRowBefore(1);
        setupSheetHeaders(sheet);
      }
    }
    
    // Extract and validate form data
    const formData = extractFormData(data);
    log('Form data extracted: ' + JSON.stringify(formData), logMessages);
    
    // Prepare row data
    const rowData = [
      formData.timestamp,
      formData.step,
      formData.isPartial ? 'Yes' : 'No',
      formData.fullName,
      formData.whatsappNo,
      formData.emailAddress,
      formData.collegeName,
      formData.branch,
      formData.currentSemester,
      formData.applyingFor,
      formData.otherSpecification,
      formData.tentativeDates,
      formData.referenceName,
      formData.source,
      formData.query
    ];
    
    // Append data to sheet
    try {
      sheet.appendRow(rowData);
      log('Data appended to sheet successfully', logMessages);
      
      // Get the row number for reference
      const lastRow = sheet.getLastRow();
      log('Data saved to row: ' + lastRow, logMessages);
      
      // Return success response
      return ContentService.createTextOutput(JSON.stringify({
        success: true,
        message: formData.isPartial ? 'Partial data saved successfully' : 'Application submitted successfully',
        timestamp: formData.timestamp.toISOString(),
        step: formData.step,
        isPartial: formData.isPartial,
        rowNumber: lastRow,
        logs: CONFIG.LOGGING_ENABLED ? logMessages : undefined
      })).setMimeType(ContentService.MimeType.JSON);
      
    } catch (appendError) {
      throw new Error('Error appending row to sheet: ' + appendError.toString());
    }
    
  } catch (error) {
    // Log error
    log('ERROR: ' + error.toString(), logMessages);
    
    // Return error response
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      message: 'Error saving data: ' + error.toString(),
      timestamp: new Date().toISOString(),
      logs: CONFIG.LOGGING_ENABLED ? logMessages : undefined
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Extract and validate form data from request
 */
function extractFormData(data) {
  return {
    timestamp: new Date(),
    step: String(data.step || '').trim(),
    isPartial: data.isPartial !== undefined ? Boolean(data.isPartial) : true,
    fullName: String(data.fullName || '').trim(),
    whatsappNo: String(data.whatsappNo || '').trim(),
    emailAddress: String(data.emailAddress || '').trim(),
    collegeName: String(data.collegeName || '').trim(),
    branch: String(data.branch || '').trim(),
    currentSemester: String(data.currentSemester || '').trim(),
    applyingFor: String(data.applyingFor || '').trim(),
    otherSpecification: String(data.otherSpecification || '').trim(),
    tentativeDates: String(data.tentativeDates || '').trim(),
    referenceName: String(data.referenceName || '').trim(),
    source: String(data.source || '').trim(),
    query: String(data.query || '').trim()
  };
}

/**
 * Set up sheet headers and formatting
 */
function setupSheetHeaders(sheet) {
  // Set headers
  const headers = [
    'Timestamp', 
    'Step', 
    'Is Partial', 
    'Full Name', 
    'WhatsApp No', 
    'Email Address', 
    'College Name', 
    'Branch', 
    'Current Semester', 
    'Applying For', 
    'Other Specification', 
    'Tentative Dates', 
    'Reference Name', 
    'Source', 
    'Query'
  ];
  
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  
  // Format header row
  const headerRange = sheet.getRange(1, 1, 1, headers.length);
  headerRange.setFontWeight('bold');
  headerRange.setBackground('#4285f4');
  headerRange.setFontColor('#ffffff');
  headerRange.setHorizontalAlignment('center');
  
  // Set column widths for better readability
  sheet.setColumnWidth(1, 150);  // Timestamp
  sheet.setColumnWidth(2, 60);   // Step
  sheet.setColumnWidth(3, 100);  // Is Partial
  sheet.setColumnWidth(4, 200);  // Full Name
  sheet.setColumnWidth(5, 120);  // WhatsApp No
  sheet.setColumnWidth(6, 250);  // Email Address
  sheet.setColumnWidth(7, 200);  // College Name
  sheet.setColumnWidth(8, 150);  // Branch
  sheet.setColumnWidth(9, 120);  // Current Semester
  sheet.setColumnWidth(10, 150); // Applying For
  sheet.setColumnWidth(11, 200); // Other Specification
  sheet.setColumnWidth(12, 150); // Tentative Dates
  sheet.setColumnWidth(13, 150); // Reference Name
  sheet.setColumnWidth(14, 150); // Source
  sheet.setColumnWidth(15, 400); // Query
  
  // Freeze header row
  sheet.setFrozenRows(1);
}

/**
 * Logging helper function
 */
function log(message, logArray) {
  if (CONFIG.LOGGING_ENABLED) {
    const timestamp = new Date().toISOString();
    logArray.push(`[${timestamp}] ${message}`);
    Logger.log(`[${timestamp}] ${message}`);
  }
}

// ============================================
// TESTING FUNCTIONS
// ============================================

/**
 * Test function - Run this manually to test the script
 */
function testDoPost() {
  const testData = {
    step: 1,
    isPartial: true,
    fullName: 'Test User',
    whatsappNo: '1234567890',
    emailAddress: 'test@example.com',
    collegeName: 'Test College',
    branch: 'Computer Science',
    currentSemester: '2025',
    applyingFor: 'Data Science',
    otherSpecification: '',
    tentativeDates: 'June 2025',
    referenceName: 'Test Reference',
    source: 'Website',
    query: 'Test query'
  };
  
  const mockEvent = {
    postData: {
      contents: JSON.stringify(testData)
    }
  };
  
  const result = doPost(mockEvent);
  Logger.log('Test Result:');
  Logger.log(result.getContent());
  
  return result.getContent();
}

/**
 * Setup function - Run this once to initialize the sheet
 */
function setupSheet() {
  try {
    if (CONFIG.SHEET_ID === 'YOUR_SHEET_ID') {
      Logger.log('ERROR: Sheet ID not configured. Please update CONFIG.SHEET_ID');
      return;
    }
    
    const spreadsheet = SpreadsheetApp.openById(CONFIG.SHEET_ID);
    let sheet = spreadsheet.getSheetByName(CONFIG.SHEET_NAME);
    
    if (!sheet) {
      sheet = spreadsheet.insertSheet(CONFIG.SHEET_NAME);
    }
    
    setupSheetHeaders(sheet);
    Logger.log('Sheet setup completed successfully!');
  } catch (error) {
    Logger.log('Error setting up sheet: ' + error.toString());
  }
}

