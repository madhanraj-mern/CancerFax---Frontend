# Strapi Data Availability Summary

## ✅ Correct API Endpoint Found

**Endpoint**: `https://cancerfax.unifiedinfotechonline.com/api/pages?populate=*&filters[slug][$eq]=home`

The landing page data is stored in the **Pages** content type (not Global), with all sections in a `dynamic_zone` array.

---

## 📊 Available Data in Strapi

Based on the API response from `/api/pages`, here's what's available:

### ✅ Available Sections (12 components in dynamic_zone)

1. **Hero** (`dynamic-zone.hero`)
   - ✅ heading, sub_heading, description
   - ✅ image
   - ✅ CTAs (buttons)

2. **Clinical Trials Showcase** (`dynamic-zone.slider-section`)
   - ✅ Slide array with heading, subheading, description
   - ✅ Featured images
   - ✅ CTA buttons

3. **About Section** (`dynamic-zone.about`)
   - ✅ heading, sub_heading, content
   - ✅ image_position
   - ✅ image

4. **Innovative Care** (`dynamic-zone.therapy-section`)
   - ✅ heading, subheading, description
   - ✅ Therapy array (therapies)

5. **Testimonials Slider** (`dynamic-zone.testimonial-slider`)
   - ✅ heading
   - ⚠️ Need to check full structure

6. **Statistics** (`dynamic-zone.statistics`)
   - ✅ heading, sub_heading, description
   - ✅ Statistics array (for counters)

7. **Clinical Trials** (`dynamic-zone.trials-section`)
   - ✅ heading, subheading

8. **Get In Touch** (`dynamic-zone.get-in-touch`)
   - ✅ heading, subheading, description
   - ✅ backgroundColor

9. **Location Network** (`dynamic-zone.location`)
   - ✅ heading, subheading, description

10. **How It Works** (`dynamic-zone.how-it-works`)
    - ✅ heading, sub_heading
    - ✅ steps array

11. **Video Testimonials** (`dynamic-zone.testimonials`)
    - ✅ heading, sub_heading
    - ✅ featuredVideo (image)
    - ✅ CTA

12. **Resources** (`dynamic-zone.resources`)
    - ✅ heading, subheading
    - ✅ resources array
    - ✅ CTA

---

## 🔄 Integration Status

### ✅ Updated Files

1. **`src/store/slices/globalSlice.js`**
   - ✅ Changed endpoint to `/api/pages?populate=*&filters[slug][$eq]=home`
   - ✅ Returns `{ dynamicZone: [...], seo: {...} }`

2. **`src/utils/strapiHelpers.js`**
   - ✅ Added `getDynamicZoneComponent()` function
   - ✅ Updated `getSectionData()` to work with dynamic_zone
   - ✅ Updated `getCollectionData()` to extract collections from dynamic_zone
   - ✅ Maintains backward compatibility with legacy structure

### ⚠️ Components Status

All existing components should **automatically work** with the new structure because:
- Helper functions check `dynamic_zone` first, then fallback to legacy
- Components already have fallback logic
- Field mapping may need minor adjustments per component

**Components that need testing/adjustment:**
- [ ] Hero - Field names may differ (heading vs title, etc.)
- [ ] ClinicalTrialsShowcase - Slide array structure
- [ ] AboutSection - Statistics array location
- [ ] InnovativeCare - Therapy array vs therapies
- [ ] Testimonials - Component structure
- [ ] All other sections - Field name mappings

---

## 📝 Field Mapping Notes

Some components may need field name adjustments:

| Component Expects | Strapi Provides | Action Needed |
|------------------|-----------------|---------------|
| `title` | `heading` or `sub_heading` | Map in component |
| `label` | `heading` | Map in component |
| `buttonText` | `cta.text` | Extract from CTA object |
| `buttonUrl` | `cta.URL` | Extract from CTA object |
| `description` (text) | `description` (array) | May need to format RichText |

---

## 🎯 Next Steps

1. ✅ **Fetch from correct endpoint** - DONE
2. ✅ **Update helper functions** - DONE  
3. ⏳ **Test each component** - Test and adjust field mappings as needed
4. ⏳ **Handle RichText descriptions** - Some descriptions are RichText arrays, need formatting
5. ⏳ **Verify image URLs** - Ensure media URLs are properly formatted

---

## 💡 Key Changes Made

### Before:
- Fetching from `/api/global` (only had navbar/footer)
- Looking for flat object structure
- No data available for sections

### After:
- Fetching from `/api/pages` (has all sections)
- Extracting from `dynamic_zone` array
- All 12 sections available
- Backward compatible with legacy structure

