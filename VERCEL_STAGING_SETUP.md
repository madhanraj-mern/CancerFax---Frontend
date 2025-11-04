# Quick Vercel Staging Setup

## For Client Deployment with Staging Backend

### 🎯 Recommended: Separate Vercel Project

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

### Alternative: Same Project with Environment Variables

If you prefer to use the same project:

1. **Set Environment Variables in Vercel**
   - Project Settings → Environment Variables
   - Add: `REACT_APP_STRAPI_URL = https://staging.cancerfax.unifiedinfotechonline.com`
   - Select environments as needed

2. **Deploy**
   - Push code to your branch
   - Vercel will use staging backend

### Verify

After deployment, check browser Network tab - API calls should go to:
`https://staging.cancerfax.unifiedinfotechonline.com`

---

## Production (Unchanged)

Your existing production deployment will continue using:
`https://cancerfax.unifiedinfotechonline.com`

No changes needed to production! ✅

