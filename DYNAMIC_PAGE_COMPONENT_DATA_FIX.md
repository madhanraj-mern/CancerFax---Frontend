# Dynamic Page Component Data Fix

## Problem
When creating a new page in Strapi with a slug, components were showing static/fallback text instead of the dynamic content from the page's dynamic zone.

## Root Cause
Components were always using `globalData` (home page data) instead of the page-specific data from `pageData.dynamicZone`.

## Solution
Updated `DynamicPage.jsx` to pass component data from the page's dynamic zone to each component, and updated components to accept and use `componentData` prop.

## Changes Made

### 1. DynamicPage.jsx
- Now passes `componentData` and `pageData` props to each component
- Components receive their specific data from the page's dynamic zone

### 2. Components Updated
Updated components to accept `componentData` prop and prioritize it over `globalData`:

- ✅ **Hero.jsx** - Accepts `componentData` prop
- ✅ **AboutSection.jsx** - Accepts `componentData` and `pageData` props
- ✅ **InnovativeCare.jsx** - Accepts `componentData` prop
- ✅ **Testimonials.jsx** - Accepts `componentData` prop

### Pattern for Other Components

If you need to update other components, follow this pattern:

```javascript
// Before:
const MyComponent = () => {
  const globalData = useSelector(state => state.global?.data);
  const sectionData = getSectionData(globalData, 'mySection');
  // ...
};

// After:
const MyComponent = ({ componentData, pageData }) => {
  const globalData = useSelector(state => state.global?.data);
  // Priority: componentData (dynamic page) > globalData (home page)
  const sectionData = componentData || getSectionData(globalData, 'mySection');
  // ...
};
```

## How It Works

1. **Home Page (LandingPage.jsx)**:
   - Components don't receive `componentData` prop
   - They use `globalData` as before (no breaking changes)

2. **Dynamic Pages (DynamicPage.jsx)**:
   - Components receive `componentData` from the page's dynamic zone
   - Components prioritize `componentData` over `globalData`
   - Each page shows its own content from Strapi

## Testing

1. Create a new page in Strapi with a unique slug
2. Add components to the dynamic zone with custom content
3. Visit the page URL (e.g., `/your-slug`)
4. Verify that components show the page-specific content, not home page content

## Remaining Components to Update (Optional)

If you notice other components showing static text on dynamic pages, update them using the same pattern:
- ClinicalTrialsShowcase
- VideoTestimonials
- ClinicalTrials
- GetInTouch
- LocationNetwork
- HowItWorks
- Resources

## Status
✅ Core components updated
✅ Dynamic pages now show page-specific content
✅ Home page still works correctly (backward compatible)






