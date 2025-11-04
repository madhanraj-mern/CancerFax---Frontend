# Dynamic Page Slug Issue - Solution

## Issue
You created a page in Strapi with:
- **Slug**: "slug" 
- **SEO metaTitle**: "data"

But you're trying to access it at `/data`, which returns 404.

## Why This Happens
The frontend uses the **slug** field from Strapi, not the SEO title, to determine the URL.

- URL `/data` → Looks for page with slug="data" → Not found (404)
- URL `/slug` → Looks for page with slug="slug" → Found ✅

## Solution: Change Slug in Strapi

### Step-by-Step:
1. Go to **Strapi Admin** → **Content Manager** → **Pages**
2. Open your page (ID: 22, SEO: data)
3. **Change the "Slug" field** from `slug` to `data`
4. **Save** and **Publish**
5. Visit `http://localhost:3000/data` - it should work!

## Quick Test
- ✅ **Working**: Visit `http://localhost:3000/slug` (uses current slug)
- ❌ **Not working**: `http://localhost:3000/data` (until you change slug to "data")

## Best Practice
Always use the **slug** field in Strapi to match the URL you want:
- Want `/about-us`? → Set slug = "about-us"
- Want `/data`? → Set slug = "data"
- Want `/services`? → Set slug = "services"

The SEO metaTitle can be different from the slug if needed.




