# Separate Vercel Project Setup for Staging

This guide will help you create a completely separate Vercel project for staging deployment with the staging backend URL.

## 🎯 Overview

You'll have two separate Vercel projects:
- **Production Project**: Uses production backend (`https://cancerfax.unifiedinfotechonline.com`)
- **Staging Project**: Uses staging backend (`https://staging.cancerfax.unifiedinfotechonline.com`)

## 📋 Step-by-Step Instructions

### Step 1: Create New Vercel Project

1. **Go to Vercel Dashboard**
   - Visit: https://vercel.com/dashboard
   - Click **"Add New..."** → **"Project"**

2. **Import Your Repository**
   - Select your Git repository (same repository as production)
   - Click **"Import"**

3. **Configure Project Settings**
   - **Project Name**: `cancerfax-frontend-staging` (or any name you prefer)
   - **Framework Preset**: Create React App (should auto-detect)
   - **Root Directory**: `./` (default)
   - **Build Command**: `npm run build` (default)
   - **Output Directory**: `build` (default)
   - **Install Command**: `npm install --legacy-peer-deps`

### Step 2: Set Environment Variables

1. **Before deploying, click "Environment Variables"** (or go to Settings → Environment Variables after project creation)

2. **Add the following environment variable:**
   ```
   REACT_APP_STRAPI_URL = https://staging.cancerfax.unifiedinfotechonline.com
   ```

3. **Select environments:**
   - ✅ Production
   - ✅ Preview
   - ✅ Development

4. **Click "Save"**

### Step 3: Configure Branch Deployment (Optional but Recommended)

1. **Go to Settings → Git**
2. **Configure Production Branch:**
   - **Production Branch**: `staging` or `main` (your choice)
   - You can use a separate branch for staging deployments

3. **Or use the same branch with different environment variables:**
   - Keep production branch as `main`
   - Staging will deploy from the same branch but with different env vars

### Step 4: Deploy

1. **Click "Deploy"**
   - Vercel will build and deploy your project
   - The build will use the staging backend URL

2. **Wait for deployment to complete**
   - You'll see build logs in real-time
   - Deployment typically takes 2-5 minutes

### Step 5: Verify Deployment

1. **Check the deployment URL**
   - Vercel will provide a URL like: `https://cancerfax-frontend-staging.vercel.app`
   - You can also configure a custom domain

2. **Verify staging backend is being used:**
   - Open browser DevTools → Network tab
   - Navigate to the homepage
   - Look for API calls in the Network tab
   - All API calls should go to: `https://staging.cancerfax.unifiedinfotechonline.com`

3. **Check console logs:**
   - Open browser DevTools → Console
   - Look for any API-related logs
   - Verify the API URL being used

## 🔧 Configuration Files

### vercel.json (Already Configured)

Your `vercel.json` is already set up correctly:
```json
{
  "installCommand": "npm install --legacy-peer-deps",
  "buildCommand": "npm run build",
  "framework": "create-react-app"
}
```

This will work for both projects.

## 🌐 Custom Domain (Optional)

If you want a custom domain for staging:

1. **Go to Project Settings → Domains**
2. **Add your staging domain** (e.g., `staging.cancerfax.com`)
3. **Configure DNS** as instructed by Vercel
4. **Wait for DNS propagation** (usually a few minutes)

## 🔄 Automatic Deployments

### Option A: Same Branch, Different Projects

- **Production Project**: Deploys from `main` branch with production backend
- **Staging Project**: Deploys from `main` branch with staging backend
- **Both projects** deploy automatically when you push to `main`

### Option B: Separate Branches (Recommended)

1. **Create a staging branch:**
   ```bash
   git checkout -b staging
   git push origin staging
   ```

2. **Configure each project:**
   - **Production Project**: Production branch = `main`
   - **Staging Project**: Production branch = `staging`

3. **Deploy workflow:**
   - Push to `main` → Production deploys
   - Push to `staging` → Staging deploys
   - Merge `staging` to `main` when ready for production

## 📊 Project Comparison

| Feature | Production Project | Staging Project |
|---------|-------------------|-----------------|
| **Backend URL** | `https://cancerfax.unifiedinfotechonline.com` | `https://staging.cancerfax.unifiedinfotechonline.com` |
| **Environment Variable** | Not set (uses default) | `REACT_APP_STRAPI_URL=staging...` |
| **Deployment Branch** | `main` | `staging` or `main` |
| **Vercel URL** | `cancerfax-frontend.vercel.app` | `cancerfax-frontend-staging.vercel.app` |
| **Custom Domain** | `cancerfax.com` | `staging.cancerfax.com` (optional) |

## ✅ Verification Checklist

After deployment, verify:

- [ ] Staging project is deployed and accessible
- [ ] All API calls go to staging backend (check Network tab)
- [ ] Images load from staging backend
- [ ] Contact forms work with staging backend
- [ ] All pages load correctly
- [ ] Production project still works (unchanged)
- [ ] No CORS errors in console

## 🐛 Troubleshooting

### Issue: API calls still going to production

**Solution:**
- Verify environment variable is set correctly in Vercel
- Check that you're looking at the staging deployment URL
- Clear browser cache and hard refresh (Ctrl+Shift+R)

### Issue: Build fails

**Solution:**
- Check build logs in Vercel dashboard
- Verify `installCommand` includes `--legacy-peer-deps`
- Check for TypeScript or dependency errors

### Issue: Images not loading

**Solution:**
- Verify staging backend has the same media files
- Check that `REACT_APP_STRAPI_URL` is set correctly
- Verify CORS settings on staging backend

### Issue: CORS errors

**Solution:**
- Ensure staging backend allows requests from staging frontend domain
- Check CORS configuration in Strapi backend
- Verify both frontend and backend URLs are correct

## 📝 Quick Reference

### Environment Variable for Staging:
```
REACT_APP_STRAPI_URL=https://staging.cancerfax.unifiedinfotechonline.com
```

### Build Commands (Already in vercel.json):
```json
{
  "installCommand": "npm install --legacy-peer-deps",
  "buildCommand": "npm run build"
}
```

### Manual Deployment (if needed):
```bash
# Install dependencies
npm install --legacy-peer-deps

# Build for staging (with env var)
REACT_APP_STRAPI_URL=https://staging.cancerfax.unifiedinfotechonline.com npm run build

# The build folder is ready to deploy
```

## 🎉 Success!

Once deployed, you'll have:
- ✅ Separate staging environment
- ✅ Staging backend integration
- ✅ Independent deployment pipeline
- ✅ Production environment unchanged

---

**Need Help?** Check the main `STAGING_DEPLOYMENT.md` for more details.

