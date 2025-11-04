# Dynamic Pages Implementation Guide

## ✅ Overview

The application now supports **fully dynamic pages** based on Strapi slugs. Users can create new pages in Strapi, and they will automatically be accessible via their slug URL (e.g., `/about-us`, `/contact-us`, etc.).

---

## 🎯 Features

### 1. **Dynamic Routing**
- ✅ Routes like `/about-us` automatically load page data from Strapi
- ✅ Uses the `slug` field from Strapi Pages content type
- ✅ Reserved routes (`/`, `/hospitals`, `/contact`, `/faq`) use their own components

### 2. **404 Error Handling**
- ✅ Shows custom 404 page if page doesn't exist in Strapi
- ✅ Option to redirect to home page instead (configurable)
- ✅ Clear error messages with navigation back to home

### 3. **Page Data Loading**
- ✅ Fetches page data by slug from `/api/pages?filters[slug][$eq]=<slug>`
- ✅ Loads all dynamic zone components with full population
- ✅ Supports page-specific SEO data
- ✅ Handles both Strapi v4 structure and direct structure

### 4. **Component Reusability**
- ✅ All dynamic zone components are reusable across pages
- ✅ Same component mapping as homepage
- ✅ Components render in the order defined in Strapi dynamic zone

---

## 📋 How It Works

### URL Structure
```
/                    => LandingPage (home page)
/about-us            => DynamicPage (loads Strapi page with slug="about-us")
/contact-us          => DynamicPage (loads Strapi page with slug="contact-us")
/any-slug            => DynamicPage (loads Strapi page with that slug)
/nonexistent         => 404 Error Page
```

### Data Flow

1. **User visits `/about-us`**
   - React Router matches `/:slug` route
   - `DynamicPage` component renders

2. **DynamicPage Component**
   - Extracts `slug` from URL params
   - Dispatches `fetchPageBySlug(slug)` action

3. **Redux Thunk (`fetchPageBySlug`)**
   - Fetches from: `/api/pages?filters[slug][$eq]=about-us&populate=...`
   - Returns page data with `dynamicZone` array and `seo` object

4. **Component Rendering**
   - Maps each component in `dynamicZone` to React component
   - Renders components in Strapi order
   - Uses page-specific SEO data

5. **404 Handling**
   - If page not found → Shows 404 page
   - If page has no components → Optionally shows 404 or empty page

---

## 🔧 Implementation Details

### Files Modified

#### 1. **`src/store/slices/globalSlice.js`**
- Added `fetchPageBySlug` thunk
- Added `pageData`, `pageLoading`, `pageError` state
- Handles both `page.attributes` and direct `page` structure

#### 2. **`src/pages/DynamicPage.jsx`**
- Component that loads and renders pages by slug
- Component mapping for all dynamic zone types
- 404 error handling
- Loading states

#### 3. **`src/App.js`**
- Dynamic route: `/:slug` (must be last route)
- Reserved routes defined before dynamic route

#### 4. **`src/components/SEO/SEO.jsx`**
- Updated to use page-specific SEO data
- Priority: Page SEO > Global SEO > Defaults

---

## 📝 Creating New Pages in Strapi

### Step-by-Step Guide

1. **Go to Strapi Admin** → Content Manager → Pages
2. **Click "Create new entry"**
3. **Fill in the slug field** (e.g., `about-us`, `contact-us`, `services`)
4. **Add components to Dynamic Zone**:
   - Click "Add a component to dynamic_zone"
   - Select any component (Hero, About, Resources, etc.)
   - Fill in component fields
   - Add more components as needed
5. **Configure SEO** (optional):
   - Fill in metaTitle, metaDescription, etc.
6. **Save and Publish**

### Component Options Available

All components from the homepage can be used:
- Hero Section
- Slider Section
- About Section
- Therapy Section
- Testimonials
- Testimonial Slider
- Trials Section
- Get in Touch
- Location
- How It Works
- Resources
- Statistics

---

## 🔄 Page Data Structure

### Strapi API Response
```json
{
  "data": [{
    "id": 11,
    "slug": "about-us",
    "dynamic_zone": [
      { "__component": "dynamic-zone.hero", ... },
      { "__component": "dynamic-zone.about", ... },
      { "__component": "dynamic-zone.resources", ... }
    ],
    "seo": {
      "metaTitle": "about-us",
      "metaDescription": "...",
      ...
    }
  }]
}
```

### Redux State Structure
```javascript
{
  global: {
    pageData: {
      dynamicZone: [...],  // Array of components
      seo: {...},          // SEO data
      slug: "about-us",    // Page slug
      pageId: 11           // Strapi page ID
    },
    pageLoading: false,
    pageError: null
  }
}
```

---

## ✅ Features

### 1. **Automatic Page Creation**
- Create page in Strapi → Available immediately at `/slug`
- No code changes needed
- Same component system as homepage

### 2. **Component Reusability**
- All components work on any page
- Same styling and functionality
- Dynamic ordering based on Strapi

### 3. **404 Error Handling**
- Custom 404 page design
- Shows which slug was not found
- "Go to Home" button
- Option to redirect instead (configurable)

### 4. **SEO Support**
- Page-specific SEO meta tags
- Falls back to global SEO if page SEO missing
- Dynamic title, description, Open Graph tags

### 5. **Loading States**
- Shows loading indicator while fetching
- Smooth transitions
- Error handling

---

## 🎨 404 Page Options

### Current: Show 404 Page
The default behavior shows a custom 404 page with:
- Error message
- Slug that was requested
- "Go to Home" button

### Alternative: Redirect to Home
To redirect to home instead of showing 404, uncomment this line in `DynamicPage.jsx`:
```javascript
// return <Navigate to="/" replace />;
```

---

## 🧪 Testing

### Test Cases

1. **Existing Page**:
   - Visit `/about-us`
   - Should load page with components
   - Check browser console for "DynamicPage: Page data loaded"

2. **Non-existent Page**:
   - Visit `/nonexistent-page`
   - Should show 404 error page

3. **Empty Page**:
   - Create page in Strapi with no components
   - Visit the page
   - Should render (empty) or show 404 (configurable)

4. **Reserved Routes**:
   - Visit `/home` → Should redirect to `/`
   - Visit `/hospitals` → Should use HospitalListing component (not DynamicPage)

---

## 📌 Component Mapping

All component types are mapped:
- `dynamic-zone.hero` → Hero
- `dynamic-zone.slider-section` → ClinicalTrialsShowcase
- `dynamic-zone.about` → AboutSection
- `dynamic-zone.therapy-section` → InnovativeCare
- `dynamic-zone.testimonials` → Testimonials
- `dynamic-zone.testimonial-slider` → VideoTestimonials
- `dynamic-zone.trials-section` → ClinicalTrials
- `dynamic-zone.get-in-touch` → GetInTouch
- `dynamic-zone.location` → LocationNetwork
- `dynamic-zone.how-it-works` → HowItWorks
- `dynamic-zone.resources` → Resources
- Plus alternative naming conventions

---

## ✅ Summary

**Dynamic pages are fully functional!**

- ✅ Create pages in Strapi with any slug
- ✅ Access pages via `/slug` URL
- ✅ Use any combination of dynamic zone components
- ✅ Page-specific SEO support
- ✅ 404 error handling for missing pages
- ✅ No code changes needed for new pages

**Users can now create unlimited pages in Strapi, and they will automatically work on the frontend!** 🎉




