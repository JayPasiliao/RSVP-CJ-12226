# 🚨 URGENT: Connect RSVP Form to Google Sheets

## Current Status
❌ **RSVP form is NOT connected to Google Sheets yet**
✅ **All form code is ready and working**
✅ **Google Apps Script code is prepared**

---

## 🔧 QUICK FIX (5 minutes)

### Step 1: Open Your Google Sheet
Click this link: https://docs.google.com/spreadsheets/d/1ClZ5TtSu3babJjR-yBmZb7YSTRdRFcgSCbY5aZZY0X4/edit

### Step 2: Create Google Apps Script
1. In your Google Sheet, click **Extensions** → **Apps Script**
2. Delete any existing code
3. Copy ALL the code from this file: `GoogleAppsScript_RSVP.gs` (in your project folder)
4. Paste it into the Apps Script editor
5. Click **Save** (Ctrl+S)

### Step 3: Deploy as Web App
1. Click **Deploy** → **New deployment**
2. Click the gear icon ⚙️ → **Web app**
3. Set these options:
   - **Execute as**: Me
   - **Who has access**: Anyone
4. Click **Deploy**
5. **Copy the Web App URL** (looks like: `https://script.google.com/macros/s/AKfycby.../exec`)

### Step 4: Update Your Website
1. Open `script.js` in your project
2. Find line 359: `const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID_HERE/exec';`
3. Replace `YOUR_DEPLOYMENT_ID_HERE` with your actual Web App URL
4. **IMPORTANT**: Make sure the URL ends with `/exec` not `/dev`
5. Save the file

### Step 5: Test
1. Refresh your wedding website
2. Go to RSVP section
3. Fill out the form
4. Submit
5. Check your Google Sheet - data should appear!

---

## 📋 Example of What to Replace

**BEFORE (in script.js line 359):**
```javascript
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID_HERE/exec';
```

**AFTER (replace with your actual URL):**
```javascript
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycby1234567890abcdefghijklmnopqrstuvwxyz/exec';
```

---

## 🆘 If You Get Stuck

### "Authorization required" error?
- Click **Authorize access** when prompted
- Choose your Google account
- Click **Advanced** → **Go to [Project Name] (unsafe)**
- Click **Allow**

### "Script not found" error?
- Make sure you copied the ENTIRE `GoogleAppsScript_RSVP.gs` file
- Check that you saved the script
- Try redeploying

### Form still shows error?
- Check that your URL ends with `/exec`
- Make sure you saved `script.js` after updating
- Clear browser cache (Ctrl+Shift+R)

---

## ✅ Success Checklist

- [ ] Google Sheet is open
- [ ] Apps Script created with the code
- [ ] Script deployed as Web App
- [ ] Web App URL copied
- [ ] `script.js` updated with real URL
- [ ] File saved
- [ ] Browser refreshed
- [ ] Form test submitted
- [ ] Data appears in Google Sheet

---

## 🎯 Once Connected

Your form will:
- ✅ Collect all guest information
- ✅ Save directly to Google Sheets
- ✅ Show success messages
- ✅ Work on mobile devices
- ✅ Validate all required fields

**The error message will disappear and your RSVP form will be fully functional!** 🎉

---

**Need the Google Apps Script code?** It's in: `GoogleAppsScript_RSVP.gs`
