# Google Sheets Integration Setup Summary

This document summarizes the Google Sheets integration setup for both the Query Form and Application Form.

## Overview

Both forms now store data in Google Sheets using Google Apps Script:
- **Query Form**: Stores contact/query submissions
- **Application Form**: Stores application submissions (including partial saves)

## Files Created

### Google Apps Script Files
1. **`google-apps-script-query-form.gs`** - For query form submissions
2. **`google-apps-script-application-form.gs`** - For application form submissions

### Setup Documentation
1. **`GOOGLE_SHEETS_SETUP.md`** - Setup guide for query form
2. **`APPLICATION_FORM_SETUP.md`** - Setup guide for application form
3. **`DEPLOYMENT_URL.md`** - Deployment URL reference (for query form)

## Environment Variables Required

Add these to your `.env.local` file:

```env
# Query Form Google Apps Script URL
GOOGLE_APPS_SCRIPT_URL=https://script.google.com/macros/s/YOUR_QUERY_DEPLOYMENT_ID/exec

# Application Form Google Apps Script URL (separate deployment)
GOOGLE_APPS_SCRIPT_URL_APPLICATION_FORM=https://script.google.com/macros/s/AKfycbwCJmeRx43r7hjDKCp3mKBl1HNu0G-sKCtiM4G1BIzaaVJIpuLPusQioBPszhdZs_sVzg/exec

# Optional: SMTP Configuration for email notifications
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
RECIPIENT_EMAIL=recipient@example.com
```

## Key Features

### Query Form
- ✅ Stores: Full Name, Email, Phone, College Name, Query (optional)
- ✅ Saves to Google Sheets immediately on submission
- ✅ Query field is optional
- ✅ Email notifications (optional, if SMTP configured)

### Application Form
- ✅ Stores all form fields in a separate Google Sheet
- ✅ **Partial saves**: Auto-saves on each step (Step 1, 2, 3)
- ✅ **Complete submissions**: Saves final submission
- ✅ Tracks which step data was saved from
- ✅ Marks partial vs complete submissions
- ✅ All fields saved even if empty
- ✅ Email notifications only for complete submissions (optional)

## Application Form Data Structure

Each submission saves the following fields:
- Timestamp
- Step (1, 2, or 3)
- Is Partial (Yes/No)
- Full Name
- WhatsApp No
- Email Address
- College Name
- Branch
- Current Semester
- Applying For
- Other Specification
- Tentative Dates
- Reference Name
- Source
- Query

## Setup Steps (Quick Reference)

### For Query Form:
1. Create Google Sheet for queries
2. Copy `google-apps-script-query-form.gs` to Google Apps Script
3. Replace `YOUR_SHEET_ID` in the script
4. Deploy as Web App
5. Add `GOOGLE_APPS_SCRIPT_URL` to `.env.local`

### For Application Form:
1. Create Google Sheet for applications (separate from query sheet)
2. Copy `google-apps-script-application-form.gs` to Google Apps Script
3. Replace `YOUR_SHEET_ID` in the script
4. Deploy as Web App
5. Add `GOOGLE_APPS_SCRIPT_URL_APPLICATION_FORM` to `.env.local`

## Security Features

- ✅ Web App URLs stored in environment variables (not in code)
- ✅ Google Sheets access controlled by you
- ✅ Data stored securely in your Google account
- ✅ Error handling prevents data loss
- ✅ Graceful fallback if Google Sheets fails

## Testing

### Test Query Form:
1. Fill out and submit the query form
2. Check your query form Google Sheet for the new entry

### Test Application Form:
1. Start filling the application form
2. Move to Step 2 - check sheet for partial save (Is Partial: Yes, Step: 1)
3. Move to Step 3 - check sheet for another partial save (Is Partial: Yes, Step: 2)
4. Complete the form - check sheet for complete submission (Is Partial: No, Step: 3)

## Troubleshooting

### Data Not Appearing?
- Check Sheet ID in Apps Script code
- Verify Web App is deployed with "Anyone" access
- Check Apps Script execution logs
- Verify environment variables are set correctly

### Partial Saves Not Working?
- Check browser console for errors
- Verify `isPartial: true` is being sent
- Check Apps Script execution logs
- Ensure API route is receiving the data

## Important Notes

1. **Separate Sheets**: Query form and Application form use different Google Sheets
2. **Separate Deployments**: Each form needs its own Google Apps Script deployment
3. **Partial Saves**: Application form saves each step separately, so you may see multiple rows per user
4. **Data Completeness**: Empty fields are saved as empty strings for tracking
5. **Email Notifications**: Only sent for complete submissions (if SMTP configured)

## Next Steps

1. Set up both Google Sheets
2. Deploy both Google Apps Scripts
3. Add both environment variables to `.env.local`
4. Test both forms
5. Monitor your Google Sheets for submissions

For detailed setup instructions, see:
- `GOOGLE_SHEETS_SETUP.md` (Query Form)
- `APPLICATION_FORM_SETUP.md` (Application Form)

