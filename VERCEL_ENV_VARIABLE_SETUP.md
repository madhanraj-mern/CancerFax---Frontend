# Vercel Environment Variable Setup (Option 1)

## ✅ Step 1: Code Pushed to GitHub ✓

Your changes have been successfully pushed to GitHub:
- **Commit**: `c1b7d20` - "Configure staging deployment: Update all API URLs to use environment variables for staging backend support"
- **Branch**: `main`
- **Files Updated**: 50 files including staging deployment configuration

## 🚀 Step 2: Configure Vercel Environment Variable

### Instructions:

1. **Go to Vercel Dashboard**
   - Visit: https://vercel.com/dashboard
   - Select your existing **CancerFax frontend project**

2. **Navigate to Settings**
   - Click on your project
   - Go to **Settings** (top navigation)
   - Click **Environment Variables** (left sidebar)

3. **Add Environment Variable**
   - Click **"Add New"** or **"Add Variable"**
   - **Key**: `REACT_APP_STRAPI_URL`
   - **Value**: `https://staging.cancerfax.unifiedinfotechonline.com`
   - **Environment**: Select all three:
     - ✅ Production
     - ✅ Preview
     - ✅ Development
   - Click **"Save"**

4. **Verify Variable Added**
   - You should see: `REACT_APP_STRAPI_URL = https://staging.cancerfax.unifiedinfotechonline.com`
   - Listed under all selected environments

## 🔄 Step 3: Trigger Deployment

### Option A: Automatic Deployment (Recommended)

If your Vercel project is connected to GitHub:
- Vercel will automatically detect the push and start a new deployment
- The new deployment will use the staging backend URL
- Monitor the deployment in the Vercel dashboard

### Option B: Manual Deployment

If automatic deployment doesn't trigger:

1. **Go to Deployments tab**
2. **Click "Redeploy"** on the latest deployment
3. **Select "Use existing Build Cache"** (optional)
4. **Click "Redeploy"**

## ✅ Step 4: Verify Deployment

After deployment completes:

1. **Check Deployment URL**
   - Open the deployment URL from Vercel dashboard
   - Should be something like: `https://your-project.vercel.app`

2. **Verify Staging Backend is Being Used**
   
   **Method 1: Browser Network Tab**
   - Open browser DevTools (F12)
   - Go to **Network** tab
   - Navigate to the homepage
   - Look for API calls
   - All API calls should go to: `https://staging.cancerfax.unifiedinfotechonline.com`
   - Example API calls:
     - `/api/global`
     - `/api/pages?populate...`
   
   **Method 2: Browser Console**
   - Open browser DevTools → **Console** tab
   - Look for any API-related logs
   - Check that URLs contain `staging.cancerfax.unifiedinfotechonline.com`

3. **Test Functionality**
   - ✅ Homepage loads correctly
   - ✅ Images load from staging backend
   - ✅ Navigation works
   - ✅ Contact forms work
   - ✅ All pages load data from staging

## 📊 What Changed

### Before (Production):
- API calls go to: `https://cancerfax.unifiedinfotechonline.com`
- Uses default fallback URL

### After (Staging):
- API calls go to: `https://staging.cancerfax.unifiedinfotechonline.com`
- Uses `REACT_APP_STRAPI_URL` environment variable

## ⚠️ Important Notes

1. **Production Deployment**
   - Your existing production deployment will continue using the production backend
   - The environment variable only affects new deployments
   - If you want to keep production unchanged, you can:
     - Remove the environment variable from "Production" environment
     - Keep it only for "Preview" and "Development"
     - Or create a separate Vercel project (see Option 2)

2. **Build Cache**
   - First build after adding env var may take longer
   - Subsequent builds will be faster

3. **Rollback**
   - If something goes wrong, you can:
     - Remove the environment variable
     - Redeploy from a previous deployment
     - Or change the value back to production URL

## 🔍 Troubleshooting

### Issue: API calls still going to production

**Solution:**
- Verify environment variable is saved correctly
- Check that you're looking at the correct deployment (newest one)
- Hard refresh browser (Ctrl+Shift+R or Cmd+Shift+R)
- Clear browser cache

### Issue: Deployment failed

**Solution:**
- Check build logs in Vercel dashboard
- Verify `installCommand` includes `--legacy-peer-deps` (already in vercel.json)
- Check for any TypeScript or dependency errors

### Issue: Images not loading

**Solution:**
- Verify staging backend has the same media files as production
- Check CORS settings on staging backend
- Verify environment variable is set correctly

## ✅ Success Checklist

- [ ] Environment variable added in Vercel
- [ ] Deployment triggered (automatic or manual)
- [ ] Deployment completed successfully
- [ ] API calls go to staging backend (verified in Network tab)
- [ ] All pages load correctly
- [ ] Images load from staging backend
- [ ] Forms work correctly

## 📝 Quick Reference

**Environment Variable:**
```
REACT_APP_STRAPI_URL = https://staging.cancerfax.unifiedinfotechonline.com
```

**Vercel Settings Path:**
```
Project → Settings → Environment Variables
```

**Deployment URL:**
```
Check Vercel dashboard → Deployments → Latest deployment
```

---

**Need Help?** Check `STAGING_DEPLOYMENT.md` for detailed information.


