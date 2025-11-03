# Global API Integration - Header, Footer & SEO

## Overview

The application uses the `/api/global` endpoint ([reference](https://cancerfax.unifiedinfotechonline.com/api/global)) to fetch:

1. **Header/Navigation** - Menu items, logo, CTA button
2. **Footer** - Logo, columns, links, locations, contact info, social media
3. **SEO** - Meta tags, Open Graph, Twitter cards, structured data

---

## API Endpoint

```
GET https://cancerfax.unifiedinfotechonline.com/api/global
```

### Populate Query Parameters

The endpoint is called with specific populate parameters to fetch nested relations:

```javascript
populate[logo]=*&
populate[header_menu][populate][items][populate]=children,children.children,icon,links&
populate[footer][populate][0]=logo&
populate[footer][populate][1]=social_media_links&
populate[footer][populate][2]=social_media_links.image&
populate[footer][populate][3]=social_media_links.link&
populate[footer][populate][4]=footer_columns&
populate[footer][populate][5]=footer_columns.links&
populate[footer][populate][6]=locations&
populate[footer][populate][7]=policy_links&
populate[footer][populate][8]=cta&
populate[navbar][populate][0]=logo&
populate[navbar][populate][1]=menu&
populate[navbar][populate][2]=cta
```

---

## Implementation

### 1. Global Slice (`src/store/slices/globalSlice.js`)

The `fetchGlobalData` thunk fetches from `/api/global` and returns:

```javascript
{
  seo: globalData.seo || null,        // SEO data from /api/global
  navbar: globalData.navbar || null,  // Header/Navigation data
  headerMenu: globalData.header_menu || null, // New menu structure
  logo: globalData.logo || null,      // Site logo
  ctaLabel: globalData.cta_label || null,
  ctaUrl: globalData.cta_url || null,
  footer: globalData.footer || null,  // Footer data
  dynamicZone: [...],                 // From /api/pages (page sections)
}
```

**Key Change**: SEO is now extracted from `globalData.seo` (from `/api/global`) instead of `homePage.seo`.

### 2. SEO Component (`src/components/SEO/SEO.jsx`)

The SEO component:
- ✅ Extracts SEO data from Redux store (`state.global.data.seo`)
- ✅ Updates document `<head>` tags dynamically
- ✅ Handles meta tags, Open Graph, Twitter cards
- ✅ Supports structured data (JSON-LD)
- ✅ Has fallback defaults if Strapi SEO data is not available

**Features:**
- Title tag
- Meta description
- Meta keywords
- Robots meta
- Canonical URL
- Open Graph tags (og:title, og:description, og:image, etc.)
- Twitter Card tags
- Structured Data (JSON-LD)

### 3. Navigation Component (`src/components/Navigation/Navigation.jsx`)

Uses data from `/api/global`:
- `globalData.navbar` or `globalData.headerMenu` - Menu structure
- `globalData.logo` - Site logo
- `globalData.ctaLabel` / `globalData.ctaUrl` - Connect button

### 4. Footer Component (`src/components/Footer/Footer.jsx`)

Uses data from `/api/global`:
- `globalData.footer.logo` - Footer logo
- `globalData.footer.footer_columns` - Footer link columns
- `globalData.footer.social_media_links` - Contact info & social links
- `globalData.footer.locations` - Office locations
- `globalData.footer.policy_links` - Terms, Privacy, etc.
- `globalData.footer.description` - Footer description
- `globalData.footer.copyright` - Copyright text

### 5. LandingPage (`src/pages/LandingPage.jsx`)

Includes the `<SEO />` component to inject SEO meta tags:

```jsx
<PageWrapper>
  <SEO />  {/* Injects SEO meta tags from Strapi */}
  <Navigation />  {/* Uses header data from /api/global */}
  {/* ... other sections ... */}
  <Footer />  {/* Uses footer data from /api/global */}
</PageWrapper>
```

---

## Data Flow

```
LandingPage (mounts)
    ↓
dispatch(fetchGlobalData())
    ↓
/api/global?populate[...] (Header, Footer, SEO)
/api/pages?populate[...] (Page sections)
    ↓
Redux Store (state.global.data)
    ↓
├─ SEO Component → Updates <head> tags
├─ Navigation Component → Renders header
└─ Footer Component → Renders footer
```

---

## SEO Structure (Expected from Strapi)

The SEO object from `/api/global` should contain:

```javascript
{
  metaTitle: string,           // Page title
  metaDescription: string,     // Meta description
  keywords: string,            // Meta keywords
  canonicalURL: string,        // Canonical URL
  robots: string,              // Robots meta (e.g., "index, follow")
  
  // Open Graph
  ogTitle: string,
  ogDescription: string,
  ogImage: { url: string },    // OG image
  ogType: string,              // e.g., "website"
  ogSiteName: string,
  
  // Twitter Card
  twitterTitle: string,
  twitterDescription: string,
  twitterImage: { url: string },
  twitterCard: string,         // e.g., "summary_large_image"
  
  // Additional
  author: string,
  themeColor: string,
  
  // Structured Data
  structuredData: object | string  // JSON-LD
}
```

---

## Current Status

✅ **Header/Navigation**: Using `/api/global` for menu, logo, CTA  
✅ **Footer**: Using `/api/global` for all footer data  
✅ **SEO**: Using `/api/global` for SEO meta tags  
✅ **SEO Component**: Created and integrated in LandingPage  
✅ **Global Slice**: Updated to extract SEO from `globalData.seo`

---

## Testing

1. Check browser console for "LandingPage: Global data loaded" log
2. Verify `hasNavbar`, `hasFooter`, and `hasSEO` are true
3. Inspect `<head>` tags in browser DevTools
4. Verify meta tags match Strapi SEO data
5. Test Open Graph tags with [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
6. Test Twitter cards with [Twitter Card Validator](https://cards-dev.twitter.com/validator)

---

## Notes

- If SEO data is `null` in Strapi, default values will be used
- SEO component updates `<head>` tags on mount and when SEO data changes
- All meta tags are dynamically inserted/updated based on Strapi data
- Fallback defaults ensure the site always has basic SEO tags

