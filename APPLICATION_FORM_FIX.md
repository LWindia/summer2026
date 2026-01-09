# Application Form Data Not Going to Sheets - Fix Guide

## Problem
Query form data is working but Application form data is not saving to Google Sheets.

## Root Cause
The Google Apps Script for Application Form is either:
1. Not properly deployed
2. Missing `doGet` function (error: "Script function not found: doGet")
3. Sheet ID not configured in the script

## Solution

### Step 1: Check Google Apps Script Deployment

1. Go to: https://script.google.com/
2. Find the script for Application Form
3. Check if it's deployed as a Web App

### Step 2: Verify Script Functions

The script MUST have these functions:
- `doGet(e)` - For testing
- `doPost(e)` - For receiving form data

### Step 3: Configure Sheet ID

In the Google Apps Script, update:
```javascript
const CONFIG = {
  SHEET_ID: 'YOUR_ACTUAL_SHEET_ID', // Replace with actual Sheet ID
  SHEET_NAME: 'Sheet1', // Or your sheet name
  LOGGING_ENABLED: true
};
```

### Step 4: Deploy as Web App

1. Click "Deploy" > "New deployment"
2. Select type: "Web app"
3. Execute as: "Me"
4. **Who has access: "Anyone"** (CRITICAL!)
5. Click "Deploy"
6. Copy the Web App URL

### Step 5: Update .env File

Make sure `.env` has:
```
GOOGLE_APPS_SCRIPT_URL_APPLICATION_FORM=https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec
```

### Step 6: Test the Script

Test URL in browser:
```
https://script.google.com/macros/s/AKfycbzlVL9WFaHJoZahir36kodIc4MSoxwiIl7p-uWVQDYIOpT2PvqEqDYZsu5dN1f-UOxT/exec
```

Should return JSON, not HTML error.

## Current Status

- ✅ Query Form: Working (GOOGLE_APPS_SCRIPT_URL)
- ❌ Application Form: Not working (GOOGLE_APPS_SCRIPT_URL_APPLICATION_FORM)

## Quick Fix

1. Open Google Apps Script for Application Form
2. Ensure `doGet` and `doPost` functions exist
3. Update Sheet ID in CONFIG
4. Redeploy as Web App with "Anyone" access
5. Update .env with new deployment URL if changed

## Verification

After fixing, test by submitting an application form. Check:
- Browser console for errors
- Google Sheets for new data
- Server logs for Google Apps Script response
