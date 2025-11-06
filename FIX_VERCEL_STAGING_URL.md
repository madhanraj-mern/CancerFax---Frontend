# Fix: Remove Staging URL from Vercel Deployment

## 🔴 Problem
The deployed application on Vercel is still using the staging URL (`https://staging.cancerfax.unifiedinfotechonline.com`) even though the code has been updated to use production URL as fallback.

## ✅ Solution
The Vercel environment variable `REACT_APP_STRAPI_URL` is set to the staging URL, which overrides the code fallback. You need to update it in Vercel.

## 📋 Step-by-Step Fix

### Step 1: Go to Vercel Dashboard
1. Visit: https://vercel.com/dashboard
2. Select your **CancerFax Frontend** project

### Step 2: Navigate to Environment Variables
1. Click on **Settings** (top navigation)
2. Click **Environment Variables** (left sidebar)

### Step 3: Update the Environment Variable

**Option A: Update to Production URL (Recommended)**

1. Find `REACT_APP_STRAPI_URL` in the list
2. Click **Edit** (pencil icon)
3. Change the value to: `https://cancerfax.unifiedinfotechonline.com`
4. Ensure it's selected for:
   - ✅ Production
   - ✅ Preview  
   - ✅ Development
5. Click **Save**

**Option B: Delete the Variable (Uses Code Fallback)**

1. Find `REACT_APP_STRAPI_URL` in the list
2. Click **Delete** (trash icon)
3. Confirm deletion
4. The code will use the production URL fallback: `https://cancerfax.unifiedinfotechonline.com`

### Step 4: Redeploy

1. Go to **Deployments** tab
2. Find the latest deployment
3. Click the **three dots (⋯)** menu
4. Click **Redeploy**
5. **IMPORTANT**: Make sure **"Use existing Build Cache"** is **UNCHECKED**
6. Click **Redeploy**

### Step 5: Verify

After deployment completes:

1. **Open your deployment URL** (e.g., `https://cancerfax.vercel.app`)
2. **Open Chrome DevTools** (F12)
3. **Go to Network tab**
4. **Refresh the page** (Ctrl + Shift + R to hard refresh)
5. **Check the requests**:
   - Look for API calls (filter by "Fetch/XHR" or "Doc")
   - Look for image requests (filter by "Img")
   - All URLs should start with: `https://cancerfax.unifiedinfotechonline.com`
   - **NOT** `https://staging.cancerfax.unifiedinfotechonline.com`

## ✅ Expected Results

### Correct (After Fix):
```
Request URL: https://cancerfax.unifiedinfotechonline.com/api/global
Request URL: https://cancerfax.unifiedinfotechonline.com/api/pages?populate...
Image URL: https://cancerfax.unifiedinfotechonline.com/uploads/logo.png
```

### Wrong (Current):
```
Request URL: https://staging.cancerfax.unifiedinfotechonline.com/api/global
Request URL: https://staging.cancerfax.unifiedinfotechonline.com/api/pages?populate...
Image URL: https://staging.cancerfax.unifiedinfotechonline.com/uploads/logo.png
```

## 🔍 Why This Happened

- **Environment variables in Vercel override code fallbacks**
- When `REACT_APP_STRAPI_URL` is set in Vercel, it takes precedence over the fallback value in the code
- The build process bakes the environment variable into the JavaScript bundle
- Even though the code now defaults to production URL, the deployed build still has the staging URL from the environment variable

## 📝 Code Status

✅ **Code is correct** - All files use production URL as fallback:
- `src/services/api.js` - Uses `process.env.REACT_APP_STRAPI_URL || 'https://cancerfax.unifiedinfotechonline.com'`
- `src/store/slices/globalSlice.js` - Uses production URL fallback
- All other slices use production URL fallback

The issue is only in the Vercel environment variable configuration.

## 🚀 After Fix

Once you update the Vercel environment variable and redeploy:
- ✅ All API calls will go to production backend
- ✅ All images will load from production backend
- ✅ The application will use the production Strapi CMS





