# Google Apps Script Deployment URL

## Your Deployment URL
```
https://script.google.com/macros/s/AKfycbztK9Xr1721OD3VRMPKCYlo2L2Bt61a7h-yLzid9a5GtNH1TdzyT61t615HmJ8PoglK/exec
```

## Environment Variable Setup

Add this to your `.env.local` file:

```env
GOOGLE_APPS_SCRIPT_URL=https://script.google.com/macros/s/AKfycbztK9Xr1721OD3VRMPKCYlo2L2Bt61a7h-yLzid9a5GtNH1TdzyT61t615HmJ8PoglK/exec
```

## Important Notes

1. **Make sure to replace `YOUR_SHEET_ID` in the Google Apps Script code** with your actual Google Sheet ID
2. The script now includes a `doGet` function for testing - you can visit the URL in a browser to verify it's working
3. The `doPost` function handles the actual form submissions
4. After updating the Sheet ID in the script, you may need to create a new deployment or update the existing one

## Testing

1. **Test GET request**: Visit the URL in your browser - you should see a JSON response confirming the script is working
2. **Test POST request**: Submit the query form on your website and check your Google Sheet for the new entry

## Next Steps

1. Open your Google Apps Script project
2. Replace `YOUR_SHEET_ID` on lines 29 and 114 with your actual Google Sheet ID
3. Save the script
4. If you made changes, update the deployment (Deploy > Manage deployments > Edit)
5. Test the form submission

