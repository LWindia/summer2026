# Application Form Google Sheets Integration Setup Guide

This guide will help you set up Google Sheets integration for the Application Form. This is separate from the Query Form and stores all application submissions (including partial saves).

## Step 1: Create a Google Sheet for Applications

1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet (separate from the query form sheet)
3. Name it something like "Application Form Submissions"
4. The headers will be automatically created by the script, but you can manually add them in Row 1:
   - **Column A**: Timestamp
   - **Column B**: Step
   - **Column C**: Is Partial
   - **Column D**: Full Name
   - **Column E**: WhatsApp No
   - **Column F**: Email Address
   - **Column G**: College Name
   - **Column H**: Branch
   - **Column I**: Current Semester
   - **Column J**: Applying For
   - **Column K**: Other Specification
   - **Column L**: Tentative Dates
   - **Column M**: Reference Name
   - **Column N**: Source
   - **Column O**: Query

## Step 2: Get Your Sheet ID

1. Look at the URL of your Google Sheet
2. The URL will look like: `https://docs.google.com/spreadsheets/d/YOUR_SHEET_ID_HERE/edit`
3. Copy the `YOUR_SHEET_ID_HERE` part (the long string between `/d/` and `/edit`)

## Step 3: Create Google Apps Script

1. Go to [Google Apps Script](https://script.google.com/)
2. Click **"New Project"**
3. Delete the default code
4. Open the file `google-apps-script-application-form.gs` in this project
5. Copy the entire contents
6. Paste it into the Google Apps Script editor
7. **IMPORTANT**: Replace `YOUR_SHEET_ID` on lines 48 and 133 with your actual Sheet ID from Step 2
8. Replace `Sheet1` with your sheet name if it's different (default is "Sheet1")

## Step 4: Deploy as Web App

1. In the Google Apps Script editor, click **"Deploy"** > **"New deployment"**
2. Click the gear icon (⚙️) next to "Select type"
3. Choose **"Web app"**
4. Fill in the deployment settings:
   - **Description**: "Application Form Web App" (or any description)
   - **Execute as**: **"Me"**
   - **Who has access**: **"Anyone"** (this allows your website to call it)
5. Click **"Deploy"**
6. **Copy the Web App URL** - you'll need this for the next step
7. Click **"Authorize access"** and grant necessary permissions

## Step 5: Configure Environment Variable

1. Add the following to your `.env.local` file (or your environment variables):
   ```
   GOOGLE_APPS_SCRIPT_URL_APPLICATION_FORM=https://script.google.com/macros/s/AKfycbwCJmeRx43r7hjDKCp3mKBl1HNu0G-sKCtiM4G1BIzaaVJIpuLPusQioBPszhdZs_sVzg/exec
   ```
   **Note**: This is your deployment URL. Make sure to replace `YOUR_SHEET_ID` in the Google Apps Script code with your actual Google Sheet ID.

2. **Note**: This is a different environment variable from the query form:
   - Query Form: `GOOGLE_APPS_SCRIPT_URL`
   - Application Form: `GOOGLE_APPS_SCRIPT_URL_APPLICATION_FORM`

3. Restart your Next.js development server if it's running

## Step 6: Test the Setup

1. Fill out the application form on your website (even partially)
2. Move to the next step - this should auto-save to Google Sheets
3. Complete the form - this should save as a complete submission
4. Check your Google Sheet - you should see:
   - Multiple rows for the same user (one for each step if they saved partially)
   - The "Is Partial" column will show "Yes" for partial saves and "No" for complete submissions
   - The "Step" column will show which step the data was saved from

## Features

### Partial Submissions
- The form auto-saves on each step
- Partial submissions are marked with "Is Partial: Yes" in the sheet
- All fields are saved, even if empty
- Users can complete the form later and it will save as a new row

### Complete Submissions
- When the form is fully submitted, it saves with "Is Partial: No"
- Emails are only sent for complete submissions (if SMTP is configured)
- All form data is captured in the sheet

### Data Security
- All submissions are stored securely in your Google Sheet
- Only you have access to the sheet
- The web app URL should be kept in environment variables

## Optional: Run Setup Function

If you want to format your sheet automatically, you can run the `setupSheet()` function:

1. In Google Apps Script editor, select the `setupSheet` function from the dropdown
2. Click the **Run** button (▶️)
3. Authorize if prompted
4. This will format your sheet with headers and proper column widths

## Troubleshooting

### Data not appearing in Google Sheets?

1. Check that the Sheet ID is correct in the Apps Script (lines 48 and 133)
2. Verify the sheet name matches (case-sensitive)
3. Make sure the Web App is deployed with "Anyone" access
4. Check the Apps Script execution logs: **View** > **Executions**
5. Verify the environment variable `GOOGLE_APPS_SCRIPT_URL_APPLICATION_FORM` is set correctly

### Getting permission errors?

1. Make sure you've authorized the script to access your Google Sheets
2. Re-deploy the web app after making changes
3. Check that "Who has access" is set to "Anyone"

### Partial saves not working?

1. Check browser console for errors
2. Verify the API route is receiving the `isPartial: true` flag
3. Check that the Google Apps Script URL is correct
4. Look at the Apps Script execution logs

### API errors?

1. Verify `GOOGLE_APPS_SCRIPT_URL_APPLICATION_FORM` is set correctly in your `.env.local`
2. Check the browser console and server logs for error messages
3. Test the Apps Script URL directly in a browser (should show a JSON response)

## Important Notes

- **Separate Sheets**: The application form uses a different Google Sheet and Apps Script than the query form
- **Partial Saves**: Each step saves as a separate row, so you may see multiple rows for the same user
- **Data Completeness**: Empty fields are saved as empty strings, so you can track which fields were filled at each step
- **Security**: Keep the Web App URL in your environment variables, not in your code

## Sheet Structure

Each row in your sheet will contain:
- **Timestamp**: When the data was saved
- **Step**: Which step of the form (1, 2, or 3)
- **Is Partial**: "Yes" for partial saves, "No" for complete submissions
- **All Form Fields**: Even if empty, all fields are saved for tracking

This allows you to:
- Track user progress through the form
- See which fields users are filling out
- Identify where users might be dropping off
- Have a complete record of all submissions

