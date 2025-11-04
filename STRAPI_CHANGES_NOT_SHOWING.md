# Fix: Strapi Changes Not Showing on Frontend

## 🔴 Problem
When you make changes in Strapi CMS, the changes are not appearing on the frontend deployed on Vercel.

## ✅ Solution Applied
Added cache-busting mechanisms to ensure the frontend always fetches fresh data from Strapi.

## 🔧 Changes Made

### 1. Added Cache-Busting Headers
- Added `Cache-Control`, `Pragma`, and `Expires` headers to all API requests
- These headers prevent browsers and CDNs from caching API responses

### 2. Added Timestamp to API Requests
- All GET requests now include a timestamp parameter (`_t=${Date.now()}`)
- This ensures each request is unique and bypasses any caching

### 3. Updated Files:
- `src/services/api.js` - Added cache-busting to axios interceptor
- `src/store/slices/globalSlice.js` - Added cache-busting to all API calls

## 📋 Additional Steps to Ensure Changes Show

### Step 1: Publish Content in Strapi
**IMPORTANT**: Make sure your content is **published** in Strapi, not just saved as draft.

1. Go to Strapi Admin Panel
2. Make your changes
3. Click **"Save"** (draft)
4. Click **"Publish"** (make it live)
5. Only published content appears in the API

### Step 2: Clear Browser Cache
Even with cache-busting, clear your browser cache:

1. **Hard Refresh**: `Ctrl + Shift + R` (Windows/Linux) or `Cmd + Shift + R` (Mac)
2. **Or Clear Cache**:
   - Chrome: Settings → Privacy → Clear browsing data → Cached images and files
   - Firefox: Settings → Privacy → Clear Data → Cached Web Content

### Step 3: Verify Strapi API
Check if Strapi is returning the updated data:

1. **Test API directly**:
   - Visit: `https://cancerfax.unifiedinfotechonline.com/api/pages?populate=*&filters[slug][$eq]=home`
   - Or: `https://cancerfax.unifiedinfotechonline.com/api/global?populate=*`
   - Check if the data matches your Strapi changes

### Step 4: Check Network Tab
Verify the frontend is making fresh requests:

1. Open DevTools → Network tab
2. Refresh the page
3. Look for API requests (filter by "Fetch/XHR")
4. Check request headers:
   - Should include: `Cache-Control: no-cache`
   - Should have timestamp parameter: `?_t=1234567890`
5. Check response:
   - Should show your updated data

## 🔍 Troubleshooting

### Issue: Changes still not showing after publishing

**Check 1: Strapi API Endpoint**
- Verify the frontend is pointing to the correct Strapi URL
- Check Vercel environment variable: `REACT_APP_STRAPI_URL`
- Should be: `https://cancerfax.unifiedinfotechonline.com`

**Check 2: Content Type Permissions**
- In Strapi: Settings → Users & Permissions → Roles → Public
- Ensure "Find" and "FindOne" are enabled for:
  - Pages
  - Global
  - All other content types you're using

**Check 3: Strapi Draft/Published State**
- In Strapi Admin, check if content is in "Draft" or "Published" state
- Only "Published" content is available via API
- Draft content is only visible in Strapi Admin

**Check 4: Vercel Deployment**
- Make sure the latest code is deployed to Vercel
- Check Vercel deployment logs for any errors
- Redeploy if needed

### Issue: Images not updating

**Solution:**
- Images are cached separately by browsers
- Hard refresh: `Ctrl + Shift + R`
- Or add a version parameter to image URLs in Strapi

### Issue: Only some changes showing

**Solution:**
- Check if all related content types are published
- Verify populate queries are correct (they should be with cache-busting now)
- Check browser console for any errors

## ✅ How It Works Now

### Before (Cached):
```
Request: GET /api/pages?populate=*
Response: Cached (old data)
```

### After (Cache-Busted):
```
Request: GET /api/pages?populate=*&_t=1703123456789
Headers: Cache-Control: no-cache, no-store, must-revalidate
Response: Fresh data from Strapi
```

## 🚀 Next Steps

1. **Deploy the updated code to Vercel**
2. **Test in production**:
   - Make a change in Strapi
   - Publish the change
   - Hard refresh the frontend (`Ctrl + Shift + R`)
   - Changes should appear immediately

## 📝 Notes

- Cache-busting ensures fresh data on every request
- This may slightly increase API calls, but ensures data is always up-to-date
- For production, you might want to add a "Refresh" button or polling mechanism
- Strapi webhooks can trigger frontend rebuilds if needed (advanced setup)

## 🔗 Related Files

- `src/services/api.js` - Axios configuration with cache-busting
- `src/store/slices/globalSlice.js` - Global data fetching with cache-busting
- `FIX_VERCEL_STAGING_URL.md` - Guide for fixing environment variables

