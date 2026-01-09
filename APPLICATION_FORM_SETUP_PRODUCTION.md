# Production-Ready Application Form Setup Guide

This guide will help you set up the **production-ready** Google Sheets integration for the Application Form with automatic step-by-step saving.

## 🎯 Features

- ✅ **Automatic Step-by-Step Saving**: Data is saved automatically at each step
- ✅ **Progressive Data Capture**: Step 1 data is saved when moving to Step 2, Step 2 data when moving to Step 3
- ✅ **Background Auto-Save**: Data saves automatically 3 seconds after user stops typing
- ✅ **Production-Ready**: Robust error handling, validation, and logging
- ✅ **No Data Loss**: Even if user leaves after Step 1, data is saved

## 📋 Step 1: Create Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet (separate from the query form sheet)
3. Name it something like "Application Form Submissions"
4. **You don't need to add headers manually** - the script will create them automatically

## 📋 Step 2: Get Your Sheet ID

1. Look at the URL of your Google Sheet
2. The URL will look like: `https://docs.google.com/spreadsheets/d/YOUR_SHEET_ID_HERE/edit`
3. Copy the `YOUR_SHEET_ID_HERE` part (the long string between `/d/` and `/edit`)
4. **Save this Sheet ID** - you'll need it in the next step

## 📋 Step 3: Set Up Google Apps Script

1. Go to [Google Apps Script](https://script.google.com/)
2. Click **"New Project"**
3. Delete the default code
4. Open the file `google-apps-script-application-form-PRODUCTION.gs` in this project
5. Copy the **entire contents**
6. Paste it into the Google Apps Script editor

## 📋 Step 4: Configure the Script

1. In the script, find the `CONFIG` section at the top:
   ```javascript
   const CONFIG = {
     SHEET_ID: 'YOUR_SHEET_ID', // REPLACE WITH YOUR ACTUAL SHEET ID
     SHEET_NAME: 'Sheet1', // REPLACE WITH YOUR SHEET NAME IF DIFFERENT
     LOGGING_ENABLED: true // Set to false to disable detailed logging
   };
   ```

2. **Replace `'YOUR_SHEET_ID'`** with your actual Sheet ID from Step 2
3. **Replace `'Sheet1'`** with your sheet name if it's different (default is "Sheet1")
4. Save the script (Ctrl+S or Cmd+S)

## 📋 Step 5: Deploy as Web App

1. In the Google Apps Script editor, click **"Deploy"** > **"New deployment"**
2. Click the **gear icon (⚙️)** next to "Select type"
3. Choose **"Web app"**
4. Fill in the deployment settings:
   - **Description**: "Application Form Web App - Production" (or any description)
   - **Execute as**: **"Me"** (your email)
   - **Who has access**: **"Anyone"** ⚠️ **THIS IS CRITICAL!**
5. Click **"Deploy"**
6. **Authorize the script** if prompted:
   - Click "Authorize access"
   - Choose your Google account
   - Click "Advanced" > "Go to [Your Project Name] (unsafe)"
   - Click "Allow"
7. **Copy the Web App URL** - you'll need this for the next step
   - The URL will look like: `https://script.google.com/macros/s/AKfycb.../exec`

## 📋 Step 6: Configure Environment Variable

1. **For Local Development** (`.env.local`):
   ```env
   GOOGLE_APPS_SCRIPT_URL_APPLICATION_FORM=https://script.google.com/macros/s/YOUR_DEPLOYMENT_URL/exec
   ```

2. **For Vercel Deployment**:
   - Go to your Vercel project settings
   - Navigate to **"Environment Variables"**
   - Add or update:
     - **Name**: `GOOGLE_APPS_SCRIPT_URL_APPLICATION_FORM`
     - **Value**: Your deployment URL from Step 5
   - **Redeploy** your application

3. **Important**: This is a **different** environment variable from the query form:
   - Query Form: `GOOGLE_APPS_SCRIPT_URL`
   - Application Form: `GOOGLE_APPS_SCRIPT_URL_APPLICATION_FORM`

## 📋 Step 7: Test the Setup

1. **Test the Google Apps Script**:
   - Open the deployment URL in your browser
   - You should see a JSON response like:
     ```json
     {
       "success": true,
       "message": "Application Form Google Apps Script is working! Use POST to submit form data."
     }
     ```

2. **Test the Application Form**:
   - Fill out Step 1 (Full Name, WhatsApp No, Email Address, College Name)
   - Click "Next" - you should see "Step 1 saved successfully!"
   - Check your Google Sheet - Step 1 data should appear
   - Fill out Step 2 and click "Next" - Step 1 + Step 2 data should be saved
   - Complete Step 3 - All data should be saved

## 🔍 How It Works

### Automatic Saving Flow:

1. **Step 1 → Step 2**:
   - User fills Step 1 fields
   - Clicks "Next"
   - **Step 1 data is saved immediately** (Full Name, WhatsApp No, Email Address, College Name)
   - Form moves to Step 2
   - Step 1 data is saved again as a backup

2. **Step 2 → Step 3**:
   - User fills Step 2 fields
   - Clicks "Next"
   - **All Step 1 + Step 2 data is saved**
   - Form moves to Step 3

3. **Step 3 → Submit**:
   - User fills Step 3 fields
   - Clicks "Submit Application"
   - **All Step 1 + Step 2 + Step 3 data is saved** as complete submission

4. **Background Auto-Save**:
   - Data automatically saves 3 seconds after user stops typing
   - Works silently in the background
   - No toast notifications (only errors are shown)

## 📊 Google Sheet Structure

The sheet will have these columns:

| Column | Field | Description |
|--------|-------|-------------|
| A | Timestamp | When the data was saved |
| B | Step | Which step (1, 2, or 3) |
| C | Is Partial | "Yes" for partial saves, "No" for complete submissions |
| D | Full Name | Applicant's full name |
| E | WhatsApp No | WhatsApp contact number |
| F | Email Address | Email address |
| G | College Name | College name |
| H | Branch | Branch/Department |
| I | Current Semester | Current semester/year |
| J | Applying For | Program applying for |
| K | Other Specification | Other program specification |
| L | Tentative Dates | Preferred dates |
| M | Reference Name | Reference name |
| N | Source | How they found us |
| O | Query | Additional query |

## 🐛 Troubleshooting

### Data not appearing in Google Sheets?

1. **Check Sheet ID**: Verify the Sheet ID in the script matches your actual sheet
2. **Check Sheet Name**: Verify the sheet name matches (case-sensitive)
3. **Check Deployment**: Ensure "Who has access" is set to "Anyone"
4. **Check Environment Variable**: Verify `GOOGLE_APPS_SCRIPT_URL_APPLICATION_FORM` is set correctly
5. **Check Browser Console**: Look for error messages
6. **Check Apps Script Logs**: Go to **View** > **Executions** in Apps Script

### Getting 403 Access Denied errors?

1. **Redeploy the Web App**:
   - Go to **Deploy** > **Manage deployments**
   - Click the pencil icon (✏️) to edit
   - Ensure "Who has access" is set to **"Anyone"**
   - Click **Deploy**
   - Copy the new URL and update your environment variable

2. **Authorize the Script**:
   - Make sure you've authorized the script to access your Google Sheets
   - Go to **Deploy** > **Manage deployments** > **Test deployments**
   - Authorize if prompted

### Step 1 data not saving when moving to Step 2?

1. **Check Browser Console**: Look for error messages
2. **Check Network Tab**: Verify the API call is being made
3. **Check Server Logs**: Look for Google Sheets errors
4. **Verify Environment Variable**: Make sure it's set correctly

### Multiple rows for the same user?

This is **normal behavior**! The form saves:
- One row when moving from Step 1 to Step 2
- Another row when moving from Step 2 to Step 3
- Another row when submitting Step 3
- Additional rows from background auto-saves

This allows you to track user progress through the form.

## ✅ Production Checklist

Before going live, ensure:

- [ ] Sheet ID is correctly configured in the script
- [ ] Web App is deployed with "Anyone" access
- [ ] Environment variable is set in Vercel
- [ ] Tested Step 1 → Step 2 saving
- [ ] Tested Step 2 → Step 3 saving
- [ ] Tested complete submission
- [ ] Verified data appears in Google Sheet
- [ ] Checked browser console for errors
- [ ] Tested on mobile devices

## 📝 Notes

- **Separate Sheets**: Application form uses a different Google Sheet than the query form
- **Partial Saves**: Each step saves as a separate row, so you may see multiple rows for the same user
- **Data Completeness**: Empty fields are saved as empty strings
- **Security**: Keep the Web App URL in environment variables, not in code
- **Logging**: Set `LOGGING_ENABLED: false` in production to reduce logs

## 🆘 Support

If you encounter issues:
1. Check the browser console for errors
2. Check Vercel logs for API errors
3. Check Google Apps Script execution logs
4. Verify all configuration steps above

---

**Last Updated**: Production-ready version with automatic step-by-step saving

