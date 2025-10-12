# 🔗 Connect RSVP Form to Google Sheets - Step by Step

## 🚨 Current Problem
Your RSVP form shows: **"RSVP form is not yet connected to Google Sheets"**

## ✅ Solution (5 minutes)

---

## Step 1: Open Google Sheet
**Click this link:** https://docs.google.com/spreadsheets/d/1ClZ5TtSu3babJjR-yBmZb7YSTRdRFcgSCbY5aZZY0X4/edit

---

## Step 2: Create Google Apps Script
1. In your Google Sheet, click **Extensions** → **Apps Script**
2. You'll see a new tab with code editor
3. **Delete all existing code** (select all and delete)
4. **Copy ALL the code below** and paste it:

```javascript
/**
 * CHRISTINE & JAY WEDDING RSVP - Google Apps Script
 * This script receives RSVP form submissions and writes them to Google Sheets
 * 
 * SETUP INSTRUCTIONS:
 * 1. Open your Google Sheet: https://docs.google.com/spreadsheets/d/1ClZ5TtSu3babJjR-yBmZb7YSTRdRFcgSCbY5aZZY0X4/edit
 * 2. Go to Extensions → Apps Script
 * 3. Copy and paste this ENTIRE file
 * 4. Click Deploy → New deployment → Web app
 * 5. Set "Execute as: Me" and "Who has access: Anyone"
 * 6. Copy the deployment URL and paste it into script.js (line 359)
 */

// YOUR GOOGLE SHEET ID
const SHEET_ID = '1ClZ5TtSu3babJjR-yBmZb7YSTRdRFcgSCbY5aZZY0X4';

/**
 * Handles POST requests from the RSVP form
 */
function doPost(e) {
  try {
    Logger.log('Received POST request');
    
    // Open the Google Sheet
    const spreadsheet = SpreadsheetApp.openById(SHEET_ID);
    const sheet = spreadsheet.getActiveSheet();
    
    // Get form data from POST request
    const timestamp = e.parameter.timestamp || formatPhilippineTime(new Date());
    const firstName = e.parameter.firstName || '';
    const lastName = e.parameter.lastName || '';
    const email = e.parameter.email || '';
    const phone = e.parameter.phone || '';
    const facebook = e.parameter.facebook || '';
    const company = e.parameter.company || 'N/A';
    const address = e.parameter.address || '';
    const city = e.parameter.city || '';
    const province = e.parameter.province || '';
    const postalCode = e.parameter.postalCode || '';
    const relationship = e.parameter.relationship || '';
    const numGuests = e.parameter.numGuests || '';
    const dietary = e.parameter.dietary || 'N/A';
    
    // Validate required fields
    if (!firstName || !lastName || !email || !phone || !facebook || !address || !city || !province || !postalCode || !relationship || !numGuests) {
      return createResponse('error', 'Missing required fields');
    }
    
    // Log the data for debugging
    Logger.log('Data received:');
    Logger.log('Timestamp: ' + timestamp);
    Logger.log('Name: ' + firstName + ' ' + lastName);
    Logger.log('Email: ' + email);
    Logger.log('Phone: ' + phone);
    Logger.log('Guests: ' + numGuests);
    Logger.log('Relationship: ' + relationship);
    
    // Check if headers exist, if not create them
    ensureHeaders(sheet);
    
    // Append the data to the sheet
    sheet.appendRow([
      timestamp,
      firstName,
      lastName,
      email,
      phone,
      facebook,
      company,
      address,
      city,
      province,
      postalCode,
      relationship,
      numGuests,
      dietary
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
 * Ensures the sheet has proper headers
 */
function ensureHeaders(sheet) {
  const lastRow = sheet.getLastRow();
  
  // If sheet is empty or first row doesn't have headers, add them
  if (lastRow === 0 || sheet.getRange(1, 1).getValue() !== 'Timestamp') {
    const headers = [
      'Timestamp',
      'First Name',
      'Last Name',
      'Email',
      'Phone',
      'Facebook',
      'Company',
      'Address',
      'City',
      'Province',
      'Postal Code',
      'Relationship',
      'Number of Guests',
      'Dietary Restrictions'
    ];
    sheet.insertRowBefore(1);
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    
    // Format headers
    const headerRange = sheet.getRange(1, 1, 1, headers.length);
    headerRange.setFontWeight('bold');
    headerRange.setBackground('#e8b4b8');
    headerRange.setFontColor('#ffffff');
    
    // Auto-resize columns
    for (let i = 1; i <= headers.length; i++) {
      sheet.autoResizeColumn(i);
    }
  }
}

/**
 * Formats date to Philippine timezone
 */
function formatPhilippineTime(date) {
  return Utilities.formatDate(
    date, 
    'Asia/Manila', 
    'yyyy-MM-dd HH:mm:ss'
  );
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
 * Go to the script editor and click Run > testRSVP
 */
function testRSVP() {
  Logger.clear();
  
  const testData = {
    parameter: {
      timestamp: formatPhilippineTime(new Date()),
      firstName: 'Test',
      lastName: 'Guest',
      email: 'testguest@email.com',
      phone: '0917 123 4567',
      facebook: 'Test Guest Facebook',
      company: 'Test Company Inc.',
      address: '123 Test Street, Barangay Test',
      city: 'Baguio City',
      province: 'Benguet',
      postalCode: '2600',
      relationship: 'Friend',
      numGuests: '2',
      dietary: 'No allergies'
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
    const name = sheet.getRange(i, 2).getValue();
    if (name === 'Test Guest Name') {
      sheet.deleteRow(i);
      Logger.log('Deleted test entry at row ' + i);
    }
  }
  
  Logger.log('Test entries cleared');
}
```

5. Click **Save** (Ctrl+S) and name it "Wedding RSVP"

---

## Step 3: Deploy as Web App
1. Click **Deploy** → **New deployment**
2. Click the gear icon ⚙️ → **Web app**
3. Set these options:
   - **Execute as**: Me
   - **Who has access**: Anyone
4. Click **Deploy**
5. **COPY the Web App URL** (it looks like: `https://script.google.com/macros/s/AKfycby.../exec`)

---

## Step 4: Update Your Website
1. Open `script.js` in your project folder
2. Find line 359: 
   ```javascript
   const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID_HERE/exec';
   ```
3. Replace `YOUR_DEPLOYMENT_ID_HERE` with your actual Web App URL
4. **Example:**
   ```javascript
   const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycby1234567890abcdefghijklmnopqrstuvwxyz/exec';
   ```
5. **Save the file** (Ctrl+S)

---

## Step 5: Test It!
1. **Refresh your wedding website**
2. Go to RSVP section
3. Fill out the form
4. Submit
5. **Check your Google Sheet** - data should appear!

---

## ✅ Success!
Once connected, your form will:
- ✅ Save all guest data to Google Sheets
- ✅ Show success messages
- ✅ Work on mobile devices
- ✅ Validate all fields

**The error message will disappear!** 🎉

---

## 🆘 Troubleshooting

### "Authorization required"?
- Click **Authorize access** when prompted
- Choose your Google account
- Click **Advanced** → **Go to [Project Name] (unsafe)**
- Click **Allow**

### Still shows error?
- Make sure URL ends with `/exec` not `/dev`
- Check that you saved `script.js`
- Clear browser cache (Ctrl+Shift+R)

### Data not saving?
- Run the `testRSVP` function in Apps Script
- Check Apps Script logs for errors
- Verify "Anyone" has access to the Web App

---

**That's it! Your RSVP form will be fully functional in 5 minutes!** 🚀
