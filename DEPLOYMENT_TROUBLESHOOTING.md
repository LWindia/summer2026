# Deployment Troubleshooting Guide

## Issue: Changes Not Visible After Deployment

### Step 1: Verify Your Changes Are Pushed to GitHub

```bash
# Check git status
git status

# If you have uncommitted changes:
git add .
git commit -m "Your commit message"
git push origin main  # or your branch name
```

### Step 2: Check Vercel Deployment Status

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click on your project
3. Go to **"Deployments"** tab
4. Check if:
   - A new deployment was created after your push
   - The deployment status is **"Ready"** (green checkmark)
   - The commit hash matches your latest GitHub commit

### Step 3: Verify Environment Variables

**Critical for your project:**
1. Go to Vercel Dashboard → Your Project → **Settings** → **Environment Variables**
2. Verify these are set:
   - `GOOGLE_APPS_SCRIPT_URL`
   - `GOOGLE_APPS_SCRIPT_URL_APPLICATION_FORM`
   - Any SMTP variables (if using email)

3. **Important:** After adding/updating environment variables, you MUST redeploy:
   - Go to **Deployments** tab
   - Click **⋯** (three dots) on latest deployment
   - Click **"Redeploy"**
   - ✅ Check **"Use existing Build Cache"** = OFF (to clear cache)

### Step 4: Clear Build Cache and Redeploy

1. Go to **Deployments** tab
2. Click **⋯** on the latest deployment
3. Click **"Redeploy"**
4. **Uncheck** "Use existing Build Cache" (important!)
5. Click **"Redeploy"**

### Step 5: Verify Branch Settings

1. Go to **Settings** → **Git**
2. Check **"Production Branch"** - should be `main` or `master`
3. Verify you pushed to the correct branch

### Step 6: Check Build Logs

1. Click on the deployment
2. Check **"Build Logs"** tab
3. Look for:
   - ✅ Build completed successfully
   - ❌ Any errors or warnings
   - ⚠️ Missing environment variables

### Step 7: Clear Browser Cache

Your browser might be showing cached version:
- **Chrome/Edge:** Ctrl + Shift + R (Windows) or Cmd + Shift + R (Mac)
- **Firefox:** Ctrl + F5 (Windows) or Cmd + Shift + R (Mac)
- Or test in **Incognito/Private mode**

### Step 8: Check Domain/CDN Cache

If using a custom domain:
- Vercel CDN cache can take a few minutes to clear
- Wait 2-5 minutes after deployment
- Or clear Vercel cache in Settings → Domains

## Common Issues & Solutions

### Issue: "Build succeeded but changes not visible"

**Solution:**
1. Clear browser cache (hard refresh)
2. Wait 2-3 minutes for CDN to update
3. Check if you're looking at the correct URL (production vs preview)

### Issue: "Environment variables not working"

**Solution:**
1. Verify variables are set in Vercel
2. Check variable names match exactly (case-sensitive)
3. **Redeploy after adding variables** (they only apply to new deployments)

### Issue: "Deployment shows as ready but site is old"

**Solution:**
1. Check which deployment is "Production" (green badge)
2. Your latest deployment might be a "Preview" deployment
3. Promote preview to production if needed

### Issue: "GitHub push didn't trigger deployment"

**Solution:**
1. Check Vercel → Settings → Git → Connected Repository
2. Verify webhook is active in GitHub
3. Manually trigger: Deployments → "Redeploy"

## Quick Fix Commands

```bash
# 1. Check what branch you're on
git branch

# 2. Check if you have uncommitted changes
git status

# 3. Commit and push (if needed)
git add .
git commit -m "Fix: Your changes"
git push origin main

# 4. Force clear cache (if needed)
# In Vercel: Redeploy with "Use existing Build Cache" = OFF
```

## Verification Checklist

Before reporting an issue, verify:

- [ ] Changes are committed to git
- [ ] Changes are pushed to GitHub
- [ ] Vercel shows a new deployment
- [ ] Deployment status is "Ready" (not "Building" or "Error")
- [ ] Environment variables are set in Vercel
- [ ] You redeployed after adding environment variables
- [ ] You cleared browser cache (hard refresh)
- [ ] You're checking the production URL (not localhost)
- [ ] You waited 2-3 minutes after deployment

## Still Not Working?

1. **Check Vercel Build Logs** for errors
2. **Check Browser Console** (F12) for JavaScript errors
3. **Compare commit hash** in Vercel with GitHub
4. **Try a different browser** or incognito mode
5. **Check if it's a specific page** or the entire site

## For Your Specific Case

Since you mentioned pushing changes today:

1. **Most likely issue:** Environment variables not set in Vercel
   - Solution: Add `GOOGLE_APPS_SCRIPT_URL_APPLICATION_FORM` in Vercel settings
   - Then redeploy with cache cleared

2. **Second most likely:** Browser cache
   - Solution: Hard refresh (Ctrl+Shift+R) or incognito mode

3. **Third:** Build cache
   - Solution: Redeploy with "Use existing Build Cache" unchecked

