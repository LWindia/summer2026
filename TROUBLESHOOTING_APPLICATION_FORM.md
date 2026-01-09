# Troubleshooting Application Form Data Not Saving

## Quick Diagnosis Steps

### 1. Check Environment Variable
Make sure `GOOGLE_APPS_SCRIPT_URL_APPLICATION_FORM` is set in Vercel:
- Go to Vercel Dashboard → Your Project → Settings → Environment Variables
- Verify the variable exists and has the correct Google Apps Script Web App URL

### 2. Check Google Apps Script Deployment
1. Go to https://script.google.com/
2. Open your application form script
3. Click "Deploy" → "Manage deployments"
4. Verify:
   - **Execute as**: "Me"
   - **Who has access**: "Anyone" (CRITICAL!)
   - The deployment is active

### 3. Check Google Sheet Configuration
1. Open your Google Sheet
2. Check the Sheet ID in the URL: `https://docs.google.com/spreadsheets/d/[SHEET_ID]/edit`
3. In the Google Apps Script, verify `CONFIG.SHEET_ID` matches your Sheet ID
4. Verify `CONFIG.SHEET_NAME` matches your sheet name (default: "Sheet1")

### 4. Test the Google Apps Script Directly
1. In Google Apps Script, click "Deploy" → "Test deployments"
2. Or visit the Web App URL directly in a browser
3. You should see: `{"success":true,"message":"Application Form Google Apps Script is working!..."}`

### 5. Check Browser Console
1. Open your application form in the browser
2. Open Developer Tools (F12) → Console tab
3. Fill out Step 1 and click "Next"
4. Look for these logs:
   - `💾 [CRITICAL] Saving step 1 data...`
   - `📤 Sending to Google Sheets: {...}`
   - `📥 Google Apps Script response: {...}`
   - `✅ Step 1 saved to Google Sheets successfully`

### 6. Check Vercel Logs
1. Go to Vercel Dashboard → Your Project → Logs
2. Look for errors related to `/api/submit-application`
3. Check for:
   - 403 errors (permission issue)
   - 500 errors (script error)
   - Network errors

## Common Issues and Solutions

### Issue 1: 403 Access Denied
**Error**: `403 Access Denied: The Google Apps Script web app is not accessible`

**Solution**:
1. Go to Google Apps Script → Deploy → Manage deployments
2. Click the pencil icon (Edit)
3. Change "Who has access" to **"Anyone"**
4. Click "Deploy"
5. Copy the new Web App URL
6. Update `GOOGLE_APPS_SCRIPT_URL_APPLICATION_FORM` in Vercel

### Issue 2: Sheet ID Not Configured
**Error**: `Sheet ID not configured. Please update CONFIG.SHEET_ID in the script.`

**Solution**:
1. Open your Google Sheet
2. Copy the Sheet ID from the URL (between `/d/` and `/edit`)
3. In Google Apps Script, find `CONFIG.SHEET_ID`
4. Replace `'YOUR_SHEET_ID'` with your actual Sheet ID
5. Save and redeploy the script

### Issue 3: Data Not Appearing in Sheet
**Possible Causes**:
1. **Wrong Sheet Name**: Check `CONFIG.SHEET_NAME` matches your sheet name
2. **Headers Missing**: The script should auto-create headers, but verify Row 1 has headers
3. **Data Going to Wrong Sheet**: Check if you have multiple sheets in the spreadsheet

**Solution**:
1. Verify the sheet name in `CONFIG.SHEET_NAME`
2. Check if headers exist in Row 1
3. If headers are missing, run the `setupSheet()` function in Google Apps Script

### Issue 4: Only Some Fields Saving
**Possible Causes**:
1. Field names don't match between frontend and Google Apps Script
2. Empty fields are being skipped

**Solution**:
- The updated code now ensures ALL fields are saved, even if empty
- Verify field names match exactly:
  - `fullName` (not `full_name` or `name`)
  - `whatsappNo` (not `whatsapp` or `phone`)
  - `emailAddress` (not `email`)
  - etc.

### Issue 5: Data Saving to Wrong Columns
**Solution**:
1. Check the header row in your Google Sheet
2. Verify the order matches:
   - Timestamp, Step, Is Partial, Full Name, WhatsApp No, Email Address, College Name, Branch, Current Semester, Applying For, Other Specification, Tentative Dates, Reference Name, Source, Query
3. If headers are wrong, delete Row 1 and let the script recreate it

## Testing the Fix

### Step-by-Step Test:
1. **Clear the sheet** (optional, for clean testing)
2. **Fill Step 1**:
   - Full Name: "Test User"
   - WhatsApp: "1234567890"
   - Email: "test@example.com"
   - College: "Test College"
3. **Click "Next"**
4. **Check browser console** for success message
5. **Check Google Sheet** - Row 2 should have:
   - Timestamp in Column A
   - "1" in Column B (Step)
   - "Yes" in Column C (Is Partial)
   - "Test User" in Column D (Full Name)
   - "1234567890" in Column E (WhatsApp)
   - "test@example.com" in Column F (Email)
   - "Test College" in Column G (College Name)
   - Empty columns for Step 2 and Step 3 fields

6. **Fill Step 2** and click "Next"
7. **Check Google Sheet** - Row 3 should have Step 1 + Step 2 data

8. **Fill Step 3** and click "Submit"
9. **Check Google Sheet** - Row 4 should have all data with "No" in Is Partial column

## Debugging with Logs

The updated code includes extensive logging:

### In Browser Console:
- `🔄 [Step X] Auto-saving all accumulated data...`
- `💾 [CRITICAL] Saving step X data...`
- `📤 Sending to Google Sheets: {...}`
- `📥 Google Apps Script response: {...}`
- `✅ Step X saved to Google Sheets successfully`

### In Google Apps Script (View → Logs):
- `Starting doPost handler`
- `JSON parsed successfully`
- `Form data extracted: {...}`
- `Row data to append: [...]`
- `Data appended to sheet successfully`
- `Data saved to row: X`

### In Vercel Logs:
- `📥 Received form data: {...}`
- `📤 Sending application form data to Google Sheets...`
- `📥 Google Apps Script response status: 200`
- `✅ Application form data saved to Google Sheets successfully`

## Still Not Working?

1. **Check the exact error message** in browser console or Vercel logs
2. **Verify the Google Apps Script URL** is correct and accessible
3. **Test the Google Apps Script directly** by visiting the Web App URL
4. **Check Google Apps Script execution logs** (View → Logs in script editor)
5. **Verify sheet permissions** - make sure the script has edit access

## Contact for Support

If you've tried all the above and data still isn't saving:
1. Share the exact error message from browser console
2. Share the Vercel log output
3. Share the Google Apps Script execution logs
4. Verify the Google Apps Script Web App URL is accessible

