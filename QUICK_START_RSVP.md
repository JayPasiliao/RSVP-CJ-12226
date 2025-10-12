# ⚡ QUICK START - Connect RSVP Form to Google Sheets

## 🎯 Goal
Make your RSVP form automatically save guest responses to this Google Sheet:
**https://docs.google.com/spreadsheets/d/1ClZ5TtSu3babJjR-yBmZb7YSTRdRFcgSCbY5aZZY0X4/edit**

---

## 📝 Step-by-Step Setup (5 minutes)

### ✅ STEP 1: Open Your Google Sheet
1. Click this link: https://docs.google.com/spreadsheets/d/1ClZ5TtSu3babJjR-yBmZb7YSTRdRFcgSCbY5aZZY0X4/edit
2. Make sure you're signed into the Google account that owns this sheet

---

### ✅ STEP 2: Open Apps Script Editor
1. In your Google Sheet, click **Extensions** (in the top menu)
2. Click **Apps Script**
3. A new tab will open with a code editor

---

### ✅ STEP 3: Copy the Script Code
1. Open the file **`GoogleAppsScript_RSVP.gs`** (it's in your project folder)
2. Select ALL the code (Ctrl+A or Cmd+A)
3. Copy it (Ctrl+C or Cmd+C)

---

### ✅ STEP 4: Paste into Apps Script
1. Go back to the Apps Script tab
2. **DELETE** all existing code in the editor
3. **PASTE** the code you copied (Ctrl+V or Cmd+V)
4. Click the **Save** icon (💾) or press Ctrl+S
5. Name your project: `Wedding RSVP Handler` (or any name you like)

---

### ✅ STEP 5: Test the Script (Optional but Recommended)
1. In the top dropdown menu, select **testRSVP**
2. Click the **Run** button (▶️)
3. **First time only**: You'll see "Authorization required"
   - Click **Review permissions**
   - Choose your Google account
   - Click **Advanced** → **Go to [Your Project Name] (unsafe)**
   - Click **Allow**
4. Check **View** → **Logs** - you should see "✅ TEST PASSED"
5. Check your Google Sheet - you should see a test entry!

---

### ✅ STEP 6: Deploy as Web App
1. Click **Deploy** (top right corner)
2. Click **New deployment**
3. Click the gear icon ⚙️ next to "Select type"
4. Choose **Web app**
5. Fill in the settings:
   ```
   Description: Wedding RSVP Form
   Execute as: Me (your email)
   Who has access: Anyone
   ```
6. Click **Deploy**
7. **IMPORTANT**: Copy the **Web app URL** 
   - It looks like: `https://script.google.com/macros/s/AKfycbxxx...xxx/exec`
   - Keep this URL - you'll need it in the next step!

---

### ✅ STEP 7: Connect Your Website
1. Open the file **`script.js`** (in your project folder)
2. Find line 359 (or search for `YOUR_DEPLOYMENT_ID_HERE`)
3. You'll see:
   ```javascript
   const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID_HERE/exec';
   ```
4. **Replace** the ENTIRE URL with your Web app URL from Step 6:
   ```javascript
   const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxxx...xxx/exec';
   ```
5. **Save** the file

---

### ✅ STEP 8: Test Your RSVP Form
1. Make sure your website is running (`npm run dev`)
2. Open your website in a browser
3. Scroll to the RSVP section
4. Fill out the form with test data
5. Click "Confirm Attendance"
6. You should see: "✓ Thank you! Your RSVP has been received..."
7. **Check your Google Sheet** - the data should appear!

---

## 🎉 You're Done!

Your RSVP form is now connected to Google Sheets!

Every time someone submits the form, their information will automatically appear in your sheet with:
- ✅ Timestamp
- ✅ Full Name
- ✅ Email
- ✅ Number of Guests
- ✅ Message

---

## 🔧 Troubleshooting

### Problem: "Authorization required" when deploying
**Solution**: 
- Click "Review permissions"
- Choose your Google account
- Click "Advanced" → "Go to [Your Project] (unsafe)"
- Click "Allow"

### Problem: Form submits but no data in sheet
**Solution**:
- Check that you copied the correct Web app URL (ends with `/exec` not `/dev`)
- Make sure the URL is pasted correctly in `script.js` line 359
- Run the `testRSVP` function in Apps Script to verify the script works

### Problem: "Script error" or "Submission failed"
**Solution**:
- Make sure the Google Sheet is accessible (not restricted)
- Verify the Sheet ID in the script matches your sheet
- Check that you deployed with "Anyone" access

---

## 📊 Your Google Sheet Columns

Make sure your sheet has these column headers in Row 1:

| Timestamp | Full Name | Email | Number of Guests | Message |
|-----------|-----------|-------|------------------|---------|

The script will create these automatically if they don't exist!

---

## 💡 Tips

- **Test regularly**: Use the `testRSVP()` function to verify everything works
- **Clear test data**: Run `clearTestEntries()` to remove test RSVPs
- **Monitor responses**: Check your Google Sheet regularly for new RSVPs
- **Backup**: Make a copy of your Google Sheet as backup

---

Need help? The complete script is in `GoogleAppsScript_RSVP.gs`
Detailed instructions are in `RSVP_SETUP_INSTRUCTIONS.md`

