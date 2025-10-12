# 🔧 RSVP Form Troubleshooting Guide

## Your Issue: Google Sheet Still Blank

Let's fix this step by step!

---

## ✅ Step 1: Check Browser Console

1. Open your wedding website
2. Press **F12** (or right-click → Inspect)
3. Go to the **Console** tab
4. Fill out the RSVP form and submit
5. Look for error messages in red

**What to look for:**
- ✅ Green messages with checkmarks = Good!
- ❌ Red error messages = Problem found!
- 📤 "Sending request..." = Form is trying to submit
- 📥 "Response received!" = Google Script responded
- Response status: 200 = Success, 302 = Redirect (sign-in issue)

**Take a screenshot of the console and share it if you need help!**

---

## ✅ Step 2: Verify Google Apps Script Deployment

### The #1 Most Common Issue: Wrong Access Setting

1. **Open Apps Script**:
   - Go to your Google Sheet
   - Click **Extensions** → **Apps Script**

2. **Check Deployment**:
   - Click **Deploy** → **Manage deployments**
   - Click the **gear/edit icon** (⚙️ or pencil)

3. **CRITICAL SETTING**:
   ```
   Who has access: Anyone
   ```
   
   **NOT** "Anyone with a Google account"  
   **NOT** "Only myself"

4. **If it's wrong**:
   - Change it to **"Anyone"**
   - Change **Version** to **"New version"**
   - Click **Deploy**
   - Test again!

---

## ✅ Step 3: Test the Script URL Directly

Open this URL in a **NEW INCOGNITO/PRIVATE WINDOW**:
```
https://script.google.com/macros/s/AKfycbxCXdq9bk2YhvkdTxsl3iY5KjfoNa8FB_RdIGJhw1vu31ubFI6lQDKzpSrHRBeCDqda/exec
```

**What you should see:**
✅ **"Wedding RSVP Script is running. Use POST method to submit data."**

**What you should NOT see:**
❌ Google Sign-in page  
❌ Authorization error  
❌ Error message

**If you see a sign-in page:**
- Your deployment is NOT set to "Anyone"
- Go back to Step 2 and fix it!

---

## ✅ Step 4: Verify Apps Script Code

1. Open **Apps Script** editor
2. Make sure you copied **ALL** the code from `GoogleAppsScript_RSVP.gs`
3. The code should start with:
   ```javascript
   /**
    * CHRISTINE & JAY WEDDING RSVP - Google Apps Script
    */
   const SHEET_ID = '1ClZ5TtSu3babJjR-yBmZb7YSTRdRFcgSCbY5aZZY0X4';
   ```

4. The code should have these functions:
   - `doPost(e)`
   - `doGet(e)`
   - `testRSVP()`
   - `clearTestEntries()`

---

## ✅ Step 5: Run Test Function

1. In Apps Script editor, select function: **`testRSVP`**
2. Click **Run** button
3. Look at **Execution log** (View → Execution log or Ctrl+Enter)
4. You should see:
   ```
   ✅ TEST PASSED - Check your Google Sheet for the test entry
   ```

5. **Check your Google Sheet** - you should see a test entry!

**If test fails:**
- Check the error message in the log
- Make sure SHEET_ID is correct
- Verify your sheet is not protected/locked

---

## ✅ Step 6: Check Form Fields Match

Your Google Sheet columns (in order):
1. Name
2. Address
3. Contact Number
4. Email Address
5. Facebook Profile
6. Confirmation
7. Message
8. No. of Guest
9. Relationship

The form sends data in this EXACT order!

---

## 🔍 Common Issues & Solutions

### Issue: Sign-in page appears

**Cause**: Deployment set to "Anyone with Google account"  
**Fix**: Change to "Anyone" and redeploy

### Issue: CORS error in console

**Cause**: Normal behavior with Google Apps Script  
**Fix**: The script uses no-cors fallback automatically - should still work!

### Issue: 403 Forbidden error

**Cause**: Script permissions not authorized  
**Fix**: 
- Delete deployment
- Create new deployment
- Authorize when prompted

### Issue: Data appears briefly then disappears

**Cause**: Script has validation error  
**Fix**: Run `testRSVP()` to see the actual error

### Issue: Some fields missing in sheet

**Cause**: Column order mismatch  
**Fix**: 
- Check sheet column order
- Make sure headers match exactly
- Or let the script handle everything (it appends to next row)

---

## 🧪 Debug Checklist

Complete this checklist:

- [ ] Browser console shows "📤 Sending request..."
- [ ] Browser console shows "📥 Response received!"
- [ ] Response status is 200 or 302
- [ ] Response type is not "opaque"
- [ ] Script URL in incognito shows "Script is running" message (NOT sign-in)
- [ ] Apps Script deployment has "Who has access: Anyone"
- [ ] `testRSVP()` function runs successfully
- [ ] Test entry appears in Google Sheet
- [ ] All 9 columns are in correct order
- [ ] Sheet is not protected/locked
- [ ] Using updated `GoogleAppsScript_RSVP.gs` code
- [ ] Website refreshed after changes (Ctrl+Shift+R)

---

## 💡 Quick Fix Options

### Option 1: Fresh Start (Recommended)

1. **Delete existing deployment**:
   - Deploy → Manage deployments → Delete

2. **Create NEW deployment**:
   - Deploy → New deployment
   - Type: Web app
   - Execute as: Me
   - Who has access: **Anyone**
   - Deploy

3. **Update script.js** with the NEW URL

4. **Test again**

### Option 2: Check Authorization

1. Apps Script → Run testRSVP
2. If prompted, authorize the script
3. Click "Advanced" → "Go to [Project] (unsafe)"
4. Allow all permissions
5. Redeploy

---

## 📞 Need More Help?

**Please provide:**
1. Screenshot of browser console (after form submission)
2. Screenshot of Apps Script deployment settings
3. Result of running `testRSVP()` function
4. What you see when opening the script URL in incognito

**With this info, I can help you fix it!** 🚀

---

## ✨ When It Works

You'll know it's working when:
- ✅ Form submits without errors
- ✅ Success message appears
- ✅ Data appears in Google Sheet immediately
- ✅ Console shows "✅ RSVP submitted successfully!"

---

**Most likely issue: Deployment not set to "Anyone" access!**

Fix that first and test again! 🎯


