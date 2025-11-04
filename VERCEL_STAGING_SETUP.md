# Quick Vercel Staging Setup

## ✅ Step 1: Code Pushed to GitHub ✓

Your changes have been successfully pushed! Now proceed with the setup below.

## 🎯 Option 1: Same Project with Environment Variables (Recommended)

**See detailed guide: [`VERCEL_ENV_VARIABLE_SETUP.md`](./VERCEL_ENV_VARIABLE_SETUP.md)**

### Quick Steps:

1. **Go to Vercel Dashboard** → Your Project → **Settings** → **Environment Variables**

2. **Add Environment Variable:**
   ```
   REACT_APP_STRAPI_URL = https://staging.cancerfax.unifiedinfotechonline.com
   ```
   - Select: Production, Preview, Development
   - Click Save

3. **Deploy**
   - Vercel will automatically deploy from GitHub (already pushed)
   - Or manually redeploy from Deployments tab

4. **Verify**
   - Check Network tab → API calls should go to staging backend

---

## 🎯 Option 2: Separate Vercel Project

**See detailed guide: [`VERCEL_SEPARATE_PROJECT_SETUP.md`](./VERCEL_SEPARATE_PROJECT_SETUP.md)**

### Quick Steps:

1. **Create New Vercel Project**
   - Go to Vercel Dashboard → Add New Project
   - Import your Git repository
   - Name it: `cancerfax-frontend-staging`

2. **Set Environment Variable**
   ```
   REACT_APP_STRAPI_URL = https://staging.cancerfax.unifiedinfotechonline.com
   ```
   - Select: Production, Preview, Development

3. **Deploy**
   - Click Deploy
   - Vercel will automatically build with staging backend

### Verify

After deployment, check browser Network tab - API calls should go to:
`https://staging.cancerfax.unifiedinfotechonline.com`

---

## Production (Unchanged)

Your existing production deployment will continue using:
`https://cancerfax.unifiedinfotechonline.com`

No changes needed to production! ✅

