/**
 * CHRISTINE & JAY WEDDING RSVP - Google Apps Script
 * This script receives RSVP form submissions and writes them to Google Sheets
 * 
 * SHEET COLUMNS:
 * Name | Address | Contact Number | Email Address | Facebook Profile | Confirmation | Message | No. of Guest | Relationship
 */

// YOUR GOOGLE SHEET ID
const SHEET_ID = '1ClZ5TtSu3babJjR-yBmZb7YSTRdRFcgSCbY5aZZY0X4';

/**
 * Handles POST requests from the RSVP form
 */
function doPost(e) {
  try {
    Logger.log('Received POST request');
    Logger.log('Request parameters: ' + JSON.stringify(e.parameter));
    Logger.log('Request postData: ' + JSON.stringify(e.postData));
    
    // Open the Google Sheet
    const spreadsheet = SpreadsheetApp.openById(SHEET_ID);
    const sheet = spreadsheet.getActiveSheet();
    
    // Get form data from POST request
    // Try to get from both parameter and postData
    let params = e.parameter;
    
    // If postData exists and has contents, try to parse it
    if (e.postData && e.postData.contents) {
      try {
        const postParams = JSON.parse(e.postData.contents);
        params = Object.assign({}, params, postParams);
      } catch (err) {
        Logger.log('Could not parse postData as JSON: ' + err);
      }
    }
    
    const name = params.name || '';
    const address = params.address || '';
    const contactNumber = params.contactNumber || '';
    const email = params.email || '';
    const facebook = params.facebook || '';
    const confirmation = params.confirmation || '';
    const message = params.message || '';
    const numGuests = params.numGuests || '';
    const relationship = params.relationship || '';
    
    Logger.log('Parsed fields:');
    Logger.log('name: ' + name);
    Logger.log('address: ' + address);
    Logger.log('contactNumber: ' + contactNumber);
    Logger.log('email: ' + email);
    Logger.log('facebook: ' + facebook);
    Logger.log('confirmation: ' + confirmation);
    Logger.log('numGuests: ' + numGuests);
    Logger.log('relationship: ' + relationship);
    
    // Validate required fields
    if (!name || !address || !contactNumber || !email || !facebook || !confirmation || !numGuests || !relationship) {
      Logger.log('ERROR: Missing required fields');
      Logger.log('Missing: name=' + !name + ', address=' + !address + ', contactNumber=' + !contactNumber + ', email=' + !email + ', facebook=' + !facebook + ', confirmation=' + !confirmation + ', numGuests=' + !numGuests + ', relationship=' + !relationship);
      return createResponse('error', 'Missing required fields. Check Apps Script logs for details.');
    }
    
    // Log the data for debugging
    Logger.log('Data received:');
    Logger.log('Name: ' + name);
    Logger.log('Email: ' + email);
    Logger.log('Confirmation: ' + confirmation);
    Logger.log('Guests: ' + numGuests);
    
    // Append the data to the sheet
    // Columns: Name | Address | Contact Number | Email Address | Facebook Profile | Confirmation | Message | No. of Guest | Relationship
    sheet.appendRow([
      name,
      address,
      contactNumber,
      email,
      facebook,
      confirmation,
      message,
      numGuests,
      relationship
    ]);
    
    Logger.log('Data successfully added to sheet');
    
    // Return success response
    return createResponse('success', 'RSVP recorded successfully');
    
  } catch (error) {
    Logger.log('ERROR: ' + error.toString());
    return createResponse('error', error.toString());
  }
}

/**
 * Handles GET requests (for testing)
 */
function doGet(e) {
  return ContentService
    .createTextOutput('Wedding RSVP Script is running. Use POST method to submit data.')
    .setMimeType(ContentService.MimeType.TEXT);
}

/**
 * Creates a JSON response
 */
function createResponse(status, message) {
  const response = {
    'status': status,
    'message': message,
    'timestamp': new Date().toISOString()
  };
  
  return ContentService
    .createTextOutput(JSON.stringify(response))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * TEST FUNCTION - Run this to test the script works
 * Select this function and click Run button
 */
function testRSVP() {
  Logger.clear();
  
  const testData = {
    parameter: {
      name: 'Test Guest Name',
      address: '123 Test Street, Baguio City',
      contactNumber: '0917 123 4567',
      email: 'testguest@email.com',
      facebook: 'Test Guest Facebook',
      confirmation: 'Yes',
      message: 'Looking forward to your special day!',
      numGuests: '2',
      relationship: 'Friend'
    }
  };
  
  const result = doPost(testData);
  const resultText = result.getContent();
  
  Logger.log('Test Result:');
  Logger.log(resultText);
  
  const parsedResult = JSON.parse(resultText);
  if (parsedResult.status === 'success') {
    Logger.log('✅ TEST PASSED - Check your Google Sheet for the test entry');
  } else {
    Logger.log('❌ TEST FAILED - Error: ' + parsedResult.message);
  }
}

/**
 * Clears test entries (optional helper function)
 */
function clearTestEntries() {
  const spreadsheet = SpreadsheetApp.openById(SHEET_ID);
  const sheet = spreadsheet.getActiveSheet();
  const lastRow = sheet.getLastRow();
  
  // Find and delete rows with "Test Guest Name"
  for (let i = lastRow; i >= 2; i--) {
    const name = sheet.getRange(i, 1).getValue(); // Column A = Name
    if (name.toString().includes('Test')) {
      sheet.deleteRow(i);
      Logger.log('Deleted test entry at row ' + i);
    }
  }
  
  Logger.log('Test entries cleared');
}
