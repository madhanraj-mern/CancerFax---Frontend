# Strapi Pages API Data Analysis

## Correct API Endpoint
```
https://cancerfax.unifiedinfotechonline.com/api/pages?populate=*&filters[slug][$eq]=home
```

## ✅ Data Structure

The landing page data is stored in the **Pages** content type with a `dynamic_zone` array containing all sections:

```json
{
  "data": [{
    "slug": "home",
    "dynamic_zone": [
      { "__component": "dynamic-zone.hero", ... },
      { "__component": "dynamic-zone.slider-section", ... },
      ...
    ]
  }]
}
```

---

## 📋 Available Dynamic Zone Components

Based on the API response, here are all available sections:

| Component Type | Maps To | Component File |
|---------------|---------|----------------|
| `dynamic-zone.hero` | Hero section | `Hero.jsx` |
| `dynamic-zone.slider-section` | Clinical Trials Showcase | `ClinicalTrialsShowcase.jsx` |
| `dynamic-zone.about` | About section | `AboutSection.jsx` |
| `dynamic-zone.therapy-section` | Innovative Care | `InnovativeCare.jsx` |
| `dynamic-zone.testimonial-slider` | Testimonials | `Testimonials.jsx` |
| `dynamic-zone.statistics` | Statistics (part of About?) | `AboutSection.jsx` |
| `dynamic-zone.trials-section` | Clinical Trials | `ClinicalTrials.jsx` |
| `dynamic-zone.get-in-touch` | Get In Touch | `GetInTouch.jsx` |
| `dynamic-zone.location` | Location Network | `LocationNetwork.jsx` |
| `dynamic-zone.how-it-works` | How It Works | `HowItWorks.jsx` |
| `dynamic-zone.testimonials` | Video Testimonials | `VideoTestimonials.jsx` |
| `dynamic-zone.resources` | Resources | `Resources.jsx` |

---

## 🔄 Required Changes

### 1. Update `globalSlice.js`
- Change endpoint from `/api/global` to `/api/pages?populate=*&filters[slug][$eq]=home`
- Return `dynamicZone` array instead of flat object

### 2. Update `strapiHelpers.js`
- Add function to extract component by type from `dynamic_zone` array
- Update `getSectionData` to work with dynamic zone components
- Update `getCollectionData` to extract collections from dynamic zone components

### 3. Update All Components
- Change from `getSectionData(globalData, 'hero')` to `getDynamicZoneComponent(globalData, 'dynamic-zone.hero')`
- Adjust data extraction to match new structure

---

## 📝 Component Data Structure Examples

### Hero Component
```json
{
  "__component": "dynamic-zone.hero",
  "id": 6,
  "heading": "Survivor Stories",
  "sub_heading": "Andrea... A hero, a fighter.. Know her journey..",
  "description": "CancerFax helps patients...",
  "isActive": true,
  "image": { "url": "/uploads/..." },
  "CTAs": [{ "text": "Read Andrea's Story", "URL": "/" }]
}
```

### Slider Section (ClinicalTrialsShowcase)
```json
{
  "__component": "dynamic-zone.slider-section",
  "id": 6,
  "isActive": true,
  "Slide": [
    {
      "id": 6,
      "heading": "Treatments",
      "subheading": "CancerFax's Role In Clinical Trial Advancements",
      "description": [...],
      "cta": { "text": "Find Relevant Clinical Trials", "URL": "/" },
      "featuredImage": { "url": "/uploads/..." }
    }
  ]
}
```

### Therapy Section (InnovativeCare)
```json
{
  "__component": "dynamic-zone.therapy-section",
  "id": 6,
  "heading": "Innovative Care",
  "subheading": "Explore Breakthrough Therapies",
  "description": "From revolutionary cell therapies...",
  "isActive": true,
  "Therapy": [
    {
      "id": 1,
      "title": "CAR-T Cell Therapy",
      "description": "A breakthrough treatment...",
      "featuredImage": { "url": "/uploads/..." }
    }
  ]
}
```

---

## 🎯 Integration Strategy

1. ✅ **Update Redux Slice**: Fetch from `/api/pages` endpoint - **DONE**
2. ✅ **Update Helpers**: Create `getDynamicZoneComponent()` function - **DONE**
3. ⏳ **Update Components**: Use new helper to extract component data - **IN PROGRESS**
4. ✅ **Preserve Fallbacks**: Keep existing fallback logic intact - **DONE**
5. ⏳ **Test Each Section**: Verify each component works with new data structure - **PENDING**

---

## ✅ Completed Updates

- ✅ `globalSlice.js` - Now fetches from `/api/pages?populate=*&filters[slug][$eq]=home`
- ✅ `strapiHelpers.js` - Added `getDynamicZoneComponent()` function
- ✅ `getSectionData()` - Updated to work with both dynamic_zone and legacy structure
- ✅ `getCollectionData()` - Updated to extract collections from dynamic_zone components

---

## ⏳ Remaining Work

All components need to be tested with the new data structure. The helper functions should automatically work, but each component may need adjustments based on the actual API response structure.

