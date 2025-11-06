# Verify Staging Deployment

## ✅ Environment Variable Added

Your environment variable is configured:
- **Variable**: `REACT_APP_STRAPI_URL`
- **Value**: `https://staging.cancerfax.unifiedinfotechonline.com`
- **Scope**: All Environments ✓

## 🚀 Next Steps: Verify Deployment

### Step 1: Check if Deployment Started

Vercel should automatically detect your GitHub push and start a new deployment.

1. **Go to Vercel Dashboard**
   - Click on your project
   - Go to **Deployments** tab

2. **Check Latest Deployment**
   - Look for a deployment with your recent commit: `c1b7d20`
   - Check the status:
     - ✅ **Ready** = Deployment successful
     - ⏳ **Building** = Still in progress
     - ❌ **Error** = Check build logs

### Step 2: If Deployment Didn't Start Automatically

If you don't see a new deployment:

1. **Go to Deployments tab**
2. **Click "..." (three dots)** on the latest deployment
3. **Select "Redeploy"**
4. **Choose "Use existing Build Cache"** (optional)
5. **Click "Redeploy"**

### Step 3: Verify Staging Backend is Being Used

Once deployment is complete:

1. **Open the Deployment URL**
   - Click on the deployment
   - Click "Visit" or copy the deployment URL

2. **Open Browser DevTools**
   - Press `F12` or right-click → Inspect
   - Go to **Network** tab
   - Clear the network log (🚫 icon)

3. **Reload the Page**
   - Press `Ctrl + Shift + R` (or `Cmd + Shift + R` on Mac) for hard refresh
   - Watch the Network tab

4. **Check API Calls**
   - Look for requests to `/api/global`, `/api/pages`, etc.
   - Click on any API request
   - Check the **Request URL** in the Headers section
   - It should show: `https://staging.cancerfax.unifiedinfotechonline.com/api/...`

5. **Verify in Console** (Optional)
   - Go to **Console** tab in DevTools
   - Look for any API-related logs
   - Check that URLs contain `staging.cancerfax.unifiedinfotechonline.com`

## ✅ Success Checklist

After verification, confirm:

- [ ] Deployment completed successfully (Status: Ready)
- [ ] API calls in Network tab go to `staging.cancerfax.unifiedinfotechonline.com`
- [ ] Homepage loads correctly
- [ ] Images load from staging backend
- [ ] Navigation works
- [ ] All sections display data from staging
- [ ] No console errors related to API calls

## 🔍 Quick Verification Test

1. **Open your deployment URL**
2. **Open DevTools → Network tab**
3. **Navigate to homepage**
4. **Look for these API calls:**
   - `/api/global` → Should go to staging
   - `/api/pages?populate...` → Should go to staging
   - `/uploads/...` (images) → Should go to staging

**All URLs should start with:** `https://staging.cancerfax.unifiedinfotechonline.com`

## 🐛 Troubleshooting

### Issue: API calls still going to production

**Solution:**
- Make sure you're looking at the NEWEST deployment (after env var was added)
- Hard refresh: `Ctrl + Shift + R`
- Clear browser cache
- Check that environment variable is saved correctly in Vercel

### Issue: Deployment failed

**Solution:**
- Check build logs in Vercel
- Look for any errors
- Verify `vercel.json` has correct install command
- Check for dependency conflicts

### Issue: Images not loading

**Solution:**
- Verify staging backend has media files
- Check CORS settings on staging backend
- Verify environment variable is set correctly

## 📝 What to Look For

### ✅ Correct (Staging):
```
Request URL: https://staging.cancerfax.unifiedinfotechonline.com/api/global
Request URL: https://staging.cancerfax.unifiedinfotechonline.com/api/pages?populate...
Image URL: https://staging.cancerfax.unifiedinfotechonline.com/uploads/logo.png
```

### ❌ Incorrect (Production):
```
Request URL: https://cancerfax.unifiedinfotechonline.com/api/global
Request URL: https://cancerfax.unifiedinfotechonline.com/api/pages?populate...
Image URL: https://cancerfax.unifiedinfotechonline.com/uploads/logo.png
```

---

**Once verified, your staging deployment is ready! 🎉**






