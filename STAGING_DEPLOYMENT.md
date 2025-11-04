# Staging Deployment Guide

This guide explains how to deploy the frontend for the client using the staging backend URL without affecting the existing production deployment.

## Backend URLs

- **Production**: `https://cancerfax.unifiedinfotechonline.com`
- **Staging**: `https://staging.cancerfax.unifiedinfotechonline.com`

## Changes Made

All hardcoded backend URLs have been replaced with environment variables:
- `src/store/slices/globalSlice.js` - Now uses `REACT_APP_STRAPI_URL`
- `src/services/api.js` - Already uses `REACT_APP_STRAPI_URL`
- `src/components/Footer/Footer.jsx` - Now uses `REACT_APP_STRAPI_URL`

## Deployment Options

### Option 1: Vercel Environment Variables

1. **Create a new Vercel project** (or use a different branch/environment):
   - Go to your Vercel dashboard
   - Create a new project or use a different branch for staging

2. **Set Environment Variables in Vercel**:
   - Go to Project Settings → Environment Variables
   - Add the following variables:
     ```
     REACT_APP_STRAPI_URL=https://staging.cancerfax.unifiedinfotechonline.com
     REACT_APP_API_URL=https://staging.cancerfax.unifiedinfotechonline.com/api
     ```
   - Apply to: **Production, Preview, and Development** (or only Production if separate project)

3. **Deploy**:
   - Push your code to the staging branch
   - Vercel will automatically deploy with the staging backend URL

### Option 2: Separate Vercel Project (Recommended for Client)

**See detailed guide: [`VERCEL_SEPARATE_PROJECT_SETUP.md`](./VERCEL_SEPARATE_PROJECT_SETUP.md)**

Quick steps:
1. **Create a new Vercel project** for staging
2. **Import the same Git repository**
3. **Set environment variable**: `REACT_APP_STRAPI_URL=https://staging.cancerfax.unifiedinfotechonline.com`
4. **Deploy** - Vercel will automatically use staging backend

This keeps staging and production completely separate with independent deployments.

### Option 3: Local Build with Staging Config

1. **Create `.env` file** (copy from `.env.staging`):
   ```bash
   cp .env.staging .env
   ```

2. **Build for staging**:
   ```bash
   npm run build
   ```

3. **Deploy the build folder** to your hosting service

## Verification

After deployment, verify the staging frontend is using the staging backend:

1. **Check Network Tab**:
   - Open browser DevTools → Network tab
   - Look for API calls
   - All API calls should go to `https://staging.cancerfax.unifiedinfotechonline.com`

2. **Check Console Logs**:
   - The app logs the API URL being used during initialization
   - Look for: `REACT_APP_STRAPI_URL` in console

3. **Test API Calls**:
   - Navigate to the homepage
   - Check that data is fetched from staging backend
   - Verify images load from staging backend

## Important Notes

⚠️ **Production Deployment Unchanged**:
- The existing production deployment will continue using the production backend URL
- No changes needed to production environment variables
- The code now uses environment variables, so both environments can coexist

✅ **Environment Variable Priority**:
- If `REACT_APP_STRAPI_URL` is set, it will be used
- If not set, it falls back to production URL: `https://cancerfax.unifiedinfotechonline.com`
- This ensures production continues working even without environment variables

## Troubleshooting

### Frontend still using production URL
- Check that environment variables are set correctly in Vercel
- Verify the build was done after setting environment variables
- Clear browser cache and hard refresh

### API calls failing
- Verify the staging backend is accessible: `https://staging.cancerfax.unifiedinfotechonline.com/api/global`
- Check CORS settings on staging backend
- Verify API endpoints match between staging and production

### Images not loading
- Check that media files exist on staging backend
- Verify `REACT_APP_STRAPI_URL` is set correctly
- Check browser console for 404 errors

