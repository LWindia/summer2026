# Fix 403 Access Denied Error for Application Form

## Problem
You're getting a 403 "Access denied" error when trying to save application form data to Google Sheets. This means the Google Apps Script web app is not accessible.

## Solution: Redeploy Google Apps Script

### Step 1: Open Your Google Apps Script
1. Go to [Google Apps Script](https://script.google.com/)
2. Find your application form script (the one with the deployment URL ending in `/exec`)
3. Open it

### Step 2: Check the Script Code
1. Make sure the script has the correct Sheet ID (not `YOUR_SHEET_ID`)
2. Verify the sheet name matches your actual sheet name

### Step 3: Redeploy as Web App
1. Click **"Deploy"** > **"Manage deployments"**
2. Click the **pencil icon (✏️)** next to your existing deployment
3. OR click **"Deploy"** > **"New deployment"**
4. Click the **gear icon (⚙️)** next to "Select type"
5. Choose **"Web app"**
6. **IMPORTANT SETTINGS:**
   - **Execute as**: Select **"Me"** (your email)
   - **Who has access**: Select **"Anyone"** (this is critical!)
7. Click **"Deploy"**
8. **Authorize the script** if prompted:
   - Click "Authorize access"
   - Choose your Google account
   - Click "Advanced" > "Go to [Your Project Name] (unsafe)"
   - Click "Allow"
9. **Copy the new Web App URL**

### Step 4: Update Environment Variable
1. Update `GOOGLE_APPS_SCRIPT_URL_APPLICATION_FORM` in Vercel (or `.env.local` for local testing)
2. Use the NEW deployment URL you just copied
3. **Redeploy your Next.js app** on Vercel

### Step 5: Test
1. Try filling out the application form again
2. Check the browser console - you should see success messages
3. Check your Google Sheet - data should appear

## Common Issues

### Issue 1: "Who has access" is not set to "Anyone"
- **Fix**: This is the most common cause. Make sure it's set to "Anyone" (not "Only myself")

### Issue 2: Script not authorized
- **Fix**: Make sure you've authorized the script to access your Google Sheets

### Issue 3: Wrong Sheet ID
- **Fix**: Double-check that the Sheet ID in the script matches your actual Google Sheet

### Issue 4: Old deployment URL
- **Fix**: When you redeploy, you get a new URL. Make sure you're using the latest one

## Quick Test
1. Open the deployment URL in your browser (the one in `GOOGLE_APPS_SCRIPT_URL_APPLICATION_FORM`)
2. You should see a JSON response like:
   ```json
   {
     "success": true,
     "message": "Application Form Google Apps Script is working! Use POST to submit form data."
   }
   ```
3. If you see "Access denied" or an error, the deployment is not correct

## After Fixing
Once you've redeployed and updated the environment variable:
1. The form should save successfully
2. You'll see `✅ Application form data saved to Google Sheets successfully` in the logs
3. Data will appear in your Google Sheet

