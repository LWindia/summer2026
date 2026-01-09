# Google Sheets Integration Setup Guide

This guide will help you set up Google Sheets integration for the Query Form.

## Step 1: Create a Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet
3. Name it something like "Query Form Submissions"
4. In the first row (Row 1), add these headers:
   - **Column A**: Timestamp
   - **Column B**: Full Name
   - **Column C**: Email
   - **Column D**: Phone
   - **Column E**: College Name
   - **Column F**: Query

## Step 2: Get Your Sheet ID

1. Look at the URL of your Google Sheet
2. The URL will look like: `https://docs.google.com/spreadsheets/d/YOUR_SHEET_ID_HERE/edit`
3. Copy the `YOUR_SHEET_ID_HERE` part (the long string between `/d/` and `/edit`)

## Step 3: Create Google Apps Script

1. Go to [Google Apps Script](https://script.google.com/)
2. Click **"New Project"**
3. Delete the default code
4. Open the file `google-apps-script-query-form.gs` in this project
5. Copy the entire contents
6. Paste it into the Google Apps Script editor
7. **IMPORTANT**: Replace `YOUR_SHEET_ID` with your actual Sheet ID from Step 2
8. Replace `Sheet1` with your sheet name if it's different (default is "Sheet1")

## Step 4: Deploy as Web App

1. In the Google Apps Script editor, click **"Deploy"** > **"New deployment"**
2. Click the gear icon (⚙️) next to "Select type"
3. Choose **"Web app"**
4. Fill in the deployment settings:
   - **Description**: "Query Form Web App" (or any description)
   - **Execute as**: **"Me"**
   - **Who has access**: **"Anyone"** (this allows your website to call it)
5. Click **"Deploy"**
6. **Copy the Web App URL** - you'll need this for the next step
7. Click **"Authorize access"** and grant necessary permissions

## Step 5: Configure Environment Variable

1. Create a `.env.local` file in your project root (if it doesn't exist)
2. Add the following line:
   ```
   GOOGLE_APPS_SCRIPT_URL=https://script.google.com/macros/s/AKfycbztK9Xr1721OD3VRMPKCYlo2L2Bt61a7h-yLzid9a5GtNH1TdzyT61t615HmJ8PoglK/exec
   ```
   **Note**: This is your deployment URL. Make sure to replace `YOUR_SHEET_ID` in the Google Apps Script code with your actual Google Sheet ID.

3. Restart your Next.js development server if it's running

## Step 6: Test the Setup

1. Fill out the query form on your website
2. Submit the form
3. Check your Google Sheet - you should see a new row with the submitted data

## Optional: Run Setup Function

If you want to format your sheet automatically, you can run the `setupSheet()` function:

1. In Google Apps Script editor, select the `setupSheet` function from the dropdown
2. Click the **Run** button (▶️)
3. Authorize if prompted
4. This will format your sheet with headers and proper column widths

## Troubleshooting

### Data not appearing in Google Sheets?

1. Check that the Sheet ID is correct in the Apps Script
2. Verify the sheet name matches (case-sensitive)
3. Make sure the Web App is deployed with "Anyone" access
4. Check the Apps Script execution logs: **View** > **Executions**

### Getting permission errors?

1. Make sure you've authorized the script to access your Google Sheets
2. Re-deploy the web app after making changes
3. Check that "Who has access" is set to "Anyone"

### API errors?

1. Verify `GOOGLE_APPS_SCRIPT_URL` is set correctly in your `.env.local`
2. Check the browser console and server logs for error messages
3. Test the Apps Script URL directly in a browser (should show a JSON response)

## Security Notes

- The Web App URL should be kept in your environment variables, not committed to git
- The script only accepts POST requests with valid JSON data
- Consider adding additional validation in the Apps Script if needed

