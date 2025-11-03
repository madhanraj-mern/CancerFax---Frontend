# Strapi Global API Data Analysis

## API Endpoint
```
https://cancerfax.unifiedinfotechonline.com/api/global?populate=*
```

## ✅ Available Data in Strapi Global API

### Current API Response Structure:

```json
{
  "data": {
    "id": 4,
    "navbar": {
      "id": 4,
      "logo": {
        "id": 7,
        "name": "logo.png",
        "url": "/uploads/logo_851ef64fcb.png",
        "width": 193,
        "height": 33
      },
      "menu": null,  // ⚠️ Currently null
      "cta": {
        "id": 66,
        "text": "Connect With Us",
        "URL": "/",
        "target": "_self",
        "variant": "primary"
      }
    },
    "footer": {
      "id": 3,
      "description": "Empowering patients with global access...",
      "footer_bottom_text": "Explore the Latest Insights in Cancer Research",
      "copyright": "Copyright © 2025 CancerFax",
      "logo": {
        "id": 7,
        "name": "logo.png",
        "url": "/uploads/logo_851ef64fcb.png"
      },
      "cta": {
        "id": 67,
        "text": "Connect with Our Experts",
        "URL": "/",
        "target": "_self",
        "variant": "primary"
      },
      "contact": [],
      "social_media_links": [
        {
          "id": 4,
          "image": { "url": "/uploads/email_svgrepo_com_1_3b045954b7.svg" },
          "link": { "text": "info@cancerfax.com", "URL": "info@cancerfax.com" }
        },
        {
          "id": 5,
          "image": { "url": "/uploads/whatsapp_alt_svgrepo_com_db55304d4b.svg" },
          "link": { "text": "(+1) 213 789 56 55", "URL": "(+1) 213 789 56 55" }
        },
        {
          "id": 6,
          "image": { "url": "/uploads/call_191_svgrepo_com_5a439fed55.svg" },
          "link": { "text": "(+91) 96 1588 1588", "URL": "(+91) 96 1588 1588" }
        }
      ],
      "footer_columns": [
        {
          "id": 2,
          "title": null,
          "links": []
        }
      ],
      "locations": [],
      "policy_links": [
        { "id": 15, "text": "Terms of Service", "URL": "/", "target": null },
        { "id": 16, "text": "Privacy Policy", "URL": "/", "target": "_self" },
        { "id": 17, "text": "Refund Policy", "URL": "/", "target": null },
        { "id": 18, "text": "Cookies", "URL": "/", "target": "_self" }
      ]
    },
    "seo": null
  }
}
```

---

## ❌ Missing Data in Global API

### Components Currently Expecting Global Data:

The following components are trying to fetch data from global API, but these sections are **NOT present** in the API response:

1. **Hero** - Looking for:
   - `globalData.hero` ❌
   - `globalData.survivorStory` ❌

2. **ClinicalTrialsShowcase** - Looking for:
   - `globalData.clinicalTrialsShowcase` ❌

3. **AboutSection** - Looking for:
   - `globalData.about` ❌
   - `globalData.statistics` ❌

4. **InnovativeCare** - Looking for:
   - `globalData.innovativeCare` ❌
   - `globalData.therapies` ❌

5. **Testimonials** - Looking for:
   - `globalData.testimonials` ❌

---

## 🔍 Possible Solutions

### Option 1: Check if Sections are Stored Separately
These sections might be stored as separate content types (not in global):
- `/api/hero`
- `/api/about`
- `/api/innovative-care`
- `/api/testimonials`
- `/api/therapies`
- `/api/statistics`
- `/api/clinical-trials-showcase`

### Option 2: Check if Different Populate Strategy is Needed
The sections might require a different populate structure:
- `?populate[hero][populate]=*`
- `?populate[about][populate]=*`
- etc.

### Option 3: Strapi Schema Might Need Updates
The Global content type in Strapi might need to include these sections as components or relations.

---

## ✅ Currently Available for Integration

1. **Navigation** (already integrated)
   - Logo
   - Menu (currently null)
   - CTA button

2. **Footer** (not yet integrated)
   - Description
   - Logo
   - Copyright
   - CTA button
   - Social media links (Email, WhatsApp, Phone)
   - Footer columns
   - Policy links

---

## 📝 Recommendation

**Current Status:**
- ✅ Components have fallback logic, so they still work
- ❌ Components are NOT actually using Strapi data (data doesn't exist yet)
- ✅ Only Navigation and Footer data is actually available in global endpoint
- ❌ Separate endpoints checked: None exist (`/api/hero`, `/api/about`, etc. all return 404)

**What Needs to Happen:**

### Option 1: Add Sections to Global Content Type (Recommended)
In Strapi admin, add these sections as components/relations to the Global content type:
- `hero` (single component or relation)
- `survivorStory` (single component or relation)
- `about` (single component or relation)
- `statistics` (collection component)
- `innovativeCare` (single component or relation)
- `therapies` (collection component)
- `testimonials` (collection component)
- `clinicalTrialsShowcase` (collection component)

### Option 2: Create Separate Content Types
Create separate content types for each section and update components to fetch from individual endpoints.

### Option 3: Keep Current Setup
Continue using fallback data until Strapi schema is updated. Components will automatically use Strapi data once it's available.

---

## 🔧 Fixed Issues

1. **globalSlice.js** - Updated from `populate=deep` to `populate=*` (deep is not supported)
2. **Response parsing** - Fixed to use `response.data.data` instead of `response.data.data.attributes`

