# Landing Page Sections - Strapi Integration Status

## Landing Page Components (in order)

Based on `src/pages/LandingPage.jsx`:

1. **Navigation** - Uses separate Strapi integration (not global/pages API)
2. **Hero** ✅ - **USING STRAPI DATA**
3. **ClinicalTrialsShowcase** ✅ - **USING STRAPI DATA**
4. **AboutSection** ✅ - **USING STRAPI DATA**
5. **InnovativeCare** ✅ - **USING STRAPI DATA**
6. **Testimonials** ✅ - **USING STRAPI DATA**
7. **ClinicalTrialsAbout** ❌ - **NOT USING STRAPI DATA**
8. **ClinicalTrials** ❌ - **NOT USING STRAPI DATA**
9. **GetInTouch** ❌ - **NOT USING STRAPI DATA**
10. **LocationNetwork** ❌ - **NOT USING STRAPI DATA**
11. **HowItWorks** ❌ - **NOT USING STRAPI DATA**
12. **VideoTestimonials** ❌ - **NOT USING STRAPI DATA**
13. **Resources** ❌ - **NOT USING STRAPI DATA**
14. **Footer** ❌ - **NOT USING STRAPI DATA**

---

## ✅ Sections Using Strapi Data (5/13)

1. **Hero** - `dynamic-zone.hero`
2. **ClinicalTrialsShowcase** - `dynamic-zone.slider-section`
3. **AboutSection** - `dynamic-zone.about` + `dynamic-zone.statistics`
4. **InnovativeCare** - `dynamic-zone.therapy-section`
5. **Testimonials** - `dynamic-zone.testimonial-slider` or `dynamic-zone.testimonials`

---

## ❌ Sections NOT Using Strapi Data (8/13)

### 1. ClinicalTrialsAbout ❌
- **File**: `src/components/ClinicalTrialsAbout/ClinicalTrialsAbout.jsx`
- **Status**: Not connected to Strapi
- **Available in Strapi**: Check if `dynamic-zone.statistics` or separate component

### 2. ClinicalTrials ❌
- **File**: `src/components/ClinicalTrials/ClinicalTrials.jsx`
- **Status**: Not connected to Strapi
- **Available in Strapi**: `dynamic-zone.trials-section` exists in API

### 3. GetInTouch ❌
- **File**: `src/components/GetInTouch/GetInTouch.jsx`
- **Status**: Not connected to Strapi
- **Available in Strapi**: `dynamic-zone.get-in-touch` exists in API

### 4. LocationNetwork ❌
- **File**: `src/components/LocationNetwork/LocationNetwork.jsx`
- **Status**: Not connected to Strapi
- **Available in Strapi**: `dynamic-zone.location` exists in API

### 5. HowItWorks ❌
- **File**: `src/components/HowItWorks/HowItWorks.jsx`
- **Status**: Not connected to Strapi
- **Available in Strapi**: `dynamic-zone.how-it-works` exists in API

### 6. VideoTestimonials ❌
- **File**: `src/components/VideoTestimonials/VideoTestimonials.jsx`
- **Status**: Not connected to Strapi
- **Available in Strapi**: `dynamic-zone.testimonials` exists in API (might be different from regular Testimonials)

### 7. Resources ❌
- **File**: `src/components/Resources/Resources.jsx`
- **Status**: Not connected to Strapi
- **Available in Strapi**: `dynamic-zone.resources` exists in API

### 8. Footer ❌
- **File**: `src/components/Footer/Footer.jsx`
- **Status**: Not connected to Strapi
- **Available in Strapi**: Footer data is in `/api/global` endpoint (not pages)

---

## 📊 Summary

**Using Strapi**: 5 sections (38%)  
**NOT Using Strapi**: 8 sections (62%)

---

## 🎯 Available in Strapi but Not Connected

From the API response, these dynamic zone components exist but aren't being used:

- ✅ `dynamic-zone.trials-section` → **ClinicalTrials**
- ✅ `dynamic-zone.get-in-touch` → **GetInTouch**
- ✅ `dynamic-zone.location` → **LocationNetwork**
- ✅ `dynamic-zone.how-it-works` → **HowItWorks**
- ✅ `dynamic-zone.testimonials` → **VideoTestimonials** (might overlap with Testimonials)
- ✅ `dynamic-zone.resources` → **Resources**
- ⚠️ **Footer** - Available in `/api/global` (navbar/footer), not in pages API

---

## 📝 Next Steps

To connect remaining sections:

1. **ClinicalTrials** - Connect to `dynamic-zone.trials-section`
2. **GetInTouch** - Connect to `dynamic-zone.get-in-touch`
3. **LocationNetwork** - Connect to `dynamic-zone.location`
4. **HowItWorks** - Connect to `dynamic-zone.how-it-works`
5. **VideoTestimonials** - Connect to `dynamic-zone.testimonials`
6. **Resources** - Connect to `dynamic-zone.resources`
7. **ClinicalTrialsAbout** - Check if it should use `dynamic-zone.statistics` or separate
8. **Footer** - Connect to `/api/global` footer data (different endpoint)




