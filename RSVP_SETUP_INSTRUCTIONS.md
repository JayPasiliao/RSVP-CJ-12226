# RSVP Google Sheets Setup Instructions

## Overview
Your wedding website now has a comprehensive RSVP registration form that submits directly to your Google Sheet at:
https://docs.google.com/spreadsheets/d/1ClZ5TtSu3babJjR-yBmZb7YSTRdRFcgSCbY5aZZY0X4/edit?gid=0

The form now collects:
- **Personal Information**: First Name, Last Name, Email, Phone, Facebook Account, Company
- **Address Information**: Complete Address, City, Province, Postal Code
- **Wedding Details**: Relationship to Couple, Number of Guests, Dietary Restrictions

## Setup Steps

### Step 1: Prepare Your Google Sheet

1. Open your Google Sheet: https://docs.google.com/spreadsheets/d/1ClZ5TtSu3babJjR-yBmZb7YSTRdRFcgSCbY5aZZY0X4/edit?gid=0

2. Make sure the first row has these column headers (exactly as shown):
   - **Timestamp**
   - **First Name**
   - **Last Name**
   - **Email**
   - **Phone**
   - **Facebook**
   - **Company**
   - **Address**
   - **City**
   - **Province**
   - **Postal Code**
   - **Relationship**
   - **Number of Guests**
   - **Dietary Restrictions**

   > **Note**: The Google Apps Script will automatically create these headers if they don't exist!

### Step 2: Create Google Apps Script

1. In your Google Sheet, click **Extensions** → **Apps Script**

2. Delete any existing code in the script editor

3. Copy and paste the code from the file: **`GoogleAppsScript_RSVP.gs`** (included in your project folder)

   **OR** copy this code directly:

```javascript
// ==========================================
// Wedding RSVP Google Apps Script
// ==========================================
// This script receives form submissions and saves them to your Google Sheet

// Replace with your Google Sheet ID
const SHEET_ID = '1ClZ5TtSu3babJjR-yBmZb7YSTRdRFcgSCbY5aZZY0X4';

/**
 * Main function that handles POST requests from the website
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
    Logger.log('Error occurred: ' + error.toString());
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
  return Utilities.formatDate(date, 'Asia/Manila', 'yyyy-MM-dd HH:mm:ss');
}

/**
 * Creates a standardized JSON response
 */
function createResponse(status, message) {
  const response = {
    'status': status,
    'message': message,
    'timestamp': formatPhilippineTime(new Date())
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
  const sheet = SpreadsheetApp.openById(SHEET_ID).getActiveSheet();
  const lastRow = sheet.getLastRow();
  
  // Find and delete rows with "Test" in the First Name column
  for (let i = lastRow; i >= 2; i--) {
    const firstName = sheet.getRange(i, 2).getValue(); // Column B = First Name
    if (firstName.toString().includes('Test')) {
      sheet.deleteRow(i);
      Logger.log('Deleted test row: ' + i);
    }
  }
  
  Logger.log('Test entries cleared');
}
```

4. Click **Save** (disk icon) and give your project a name like "Wedding RSVP Handler"

5. **Test the script first** by running the `testRSVP` function:
   - Select `testRSVP` from the function dropdown
   - Click the **Run** button
   - Check **View** → **Execution log** to see the results
   - Verify a test entry appears in your Google Sheet

### Step 3: Deploy the Script as a Web App

1. Click **Deploy** → **New deployment**

2. Click the gear icon ⚙️ next to "Select type" and choose **Web app**

3. Configure the deployment:
   - **Description**: Wedding RSVP Form (optional)
   - **Execute as**: Me (your email)
   - **Who has access**: Anyone

4. Click **Deploy**

5. **Important**: You may need to authorize the script:
   - Click **Authorize access**
   - Choose your Google account
   - Click **Advanced** → **Go to [Your Project Name] (unsafe)**
   - Click **Allow**

6. Copy the **Web app URL** - it will look like:
   ```
   https://script.google.com/macros/s/AKfycby.../exec
   ```

### Step 4: Update Your Website

1. Open the file: **`script.js`**

2. Find this line near the top (around line 362):
   ```javascript
   const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/exec';
   ```

3. Replace the ENTIRE URL (including the X's) with your Web app URL from Step 3:
   ```javascript
   const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycby.../exec';
   ```
   
   **IMPORTANT**: Make sure the URL ends with `/exec` NOT `/dev`

4. Save the file

5. Refresh your website - the RSVP form is now connected!

### Step 5: Test the Live Form

1. Refresh your wedding website
2. Navigate to the RSVP section
3. Fill out the form with test data (all required fields)
4. Submit the form
5. Check your Google Sheet - you should see the entry appear instantly!

## Form Fields Collected

### 🧍 Personal Information
- **First Name** (required)
- **Last Name** (required)
- **Email Address** (required, validated)
- **Phone Number** (required)
- **Facebook Account** (required)
- **Company** (optional)

### 🏡 Address Information
- **Complete Address** (required)
- **City/Municipality** (required)
- **Province** (required)
- **Postal Code** (required)

### 💍 Wedding Details
- **Relationship to Couple** (required dropdown)
- **Number of Guests** (required, 1-10)
- **Dietary Restrictions** (optional)

## Features Included

✅ **Comprehensive Validation**
- All required fields validated
- Email format validation
- Real-time error messages with field highlighting
- Scroll to error on validation failure

✅ **Professional Design**
- Soft pink backgrounds matching screenshot
- Icons before each field label
- Rounded, modern inputs
- Clean, readable typography
- Organized into logical sections

✅ **User Experience**
- Loading state with spinner
- Success/error messages
- Form reset after successful submission
- Responsive design for mobile devices
- No flipping animations (clean hover effects only)

✅ **Data Management**
- Automatic timestamp in Philippine timezone
- All fields properly labeled in Google Sheet
- Auto-formatted headers with rose gold color
- Auto-resized columns for readability

## Troubleshooting

### Issue: Form submits but data doesn't appear in sheet

**Solution**: 
- Check that the Google Apps Script URL is correct in `script.js`
- Make sure the script is deployed with "Anyone" access
- Run the `testRSVP` function in Apps Script to verify it works
- Check Apps Script logs for errors

### Issue: "Authorization required" error

**Solution**:
- Redeploy the script
- Make sure you authorized the script to access your Google Sheet
- Check that "Execute as: Me" is selected
- Verify "Who has access" is set to "Anyone"

### Issue: Validation errors or fields not submitting

**Solution**:
- Ensure all required fields are filled
- Check email format is valid (must contain @ and .)
- Open browser console (F12) to see detailed error messages
- Try submitting with different data

### Issue: CORS or network errors

**Solution**:
- The code uses both standard fetch and 'no-cors' fallback
- Make sure your Google Script is deployed as a Web App
- Ensure the deployment URL ends with `/exec` not `/dev`
- Try accessing the script URL directly in browser to verify it's accessible

## Testing Checklist

Before going live, test these scenarios:

- [ ] Submit form with all fields filled correctly
- [ ] Try submitting with missing required fields (should show errors)
- [ ] Try submitting with invalid email (should show error)
- [ ] Submit form on desktop browser
- [ ] Submit form on mobile device
- [ ] Verify all data appears correctly in Google Sheet
- [ ] Check timestamp is in Philippine timezone
- [ ] Test with special characters in text fields
- [ ] Verify optional fields (Company, Dietary) work when empty

## Maintenance

### Viewing Submissions
Simply open your Google Sheet to view all guest responses in real-time.

### Clearing Test Data
Use the `clearTestEntries()` function in Apps Script to remove test submissions.

### Exporting Data
You can export your Google Sheet to Excel or CSV at any time via **File** → **Download**.

### Backup
Google Sheets auto-saves, but you can make manual copies via **File** → **Make a copy**.

---

**Your comprehensive RSVP registration form is ready to collect guest information! 🎉💍**

