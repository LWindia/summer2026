# Application Form Google Apps Script Deployment URL

## Your Deployment URL
```
https://script.google.com/macros/s/AKfycbwCJmeRx43r7hjDKCp3mKBl1HNu0G-sKCtiM4G1BIzaaVJIpuLPusQioBPszhdZs_sVzg/exec
```

## Environment Variable Setup

Add this to your `.env.local` file:

```env
GOOGLE_APPS_SCRIPT_URL_APPLICATION_FORM=https://script.google.com/macros/s/AKfycbwCJmeRx43r7hjDKCp3mKBl1HNu0G-sKCtiM4G1BIzaaVJIpuLPusQioBPszhdZs_sVzg/exec
```

## Important Notes

1. **Make sure to replace `YOUR_SHEET_ID` in the Google Apps Script code** with your actual Google Sheet ID
   - Line 48 in `doPost` function
   - Line 133 in `setupSheet` function
2. The script includes a `doGet` function for testing - you can visit the URL in a browser to verify it's working
3. The `doPost` function handles the actual form submissions (both partial and complete)
4. After updating the Sheet ID in the script, you may need to create a new deployment or update the existing one

## Testing

1. **Test GET request**: Visit the URL in your browser - you should see a JSON response confirming the script is working
2. **Test POST request**: 
   - Fill out the application form on your website
   - Move through the steps - each step should auto-save
   - Complete the form - final submission should save
   - Check your Google Sheet for the entries

## Next Steps

1. Open your Google Apps Script project
2. Replace `YOUR_SHEET_ID` on lines 48 and 133 with your actual Google Sheet ID
3. Save the script
4. If you made changes, update the deployment (Deploy > Manage deployments > Edit)
5. Test the form submission

## Separate from Query Form

Remember:
- **Query Form** uses: `GOOGLE_APPS_SCRIPT_URL`
- **Application Form** uses: `GOOGLE_APPS_SCRIPT_URL_APPLICATION_FORM`

Both forms use separate Google Sheets and separate deployments.

