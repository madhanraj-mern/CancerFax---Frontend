# Strapi Global API Integration Status

## API Endpoint
```
https://cancerfax.unifiedinfotechonline.com/api/global?populate=deep
```

## ✅ Connected to Strapi Global API (5/13 sections)

### 1. Hero ✅
- **File**: `src/components/Hero/Hero.jsx`
- **Data Used**: 
  - Hero section content
  - Survivor story data
  - Background images
- **Status**: Connected via `getSectionData(globalData, 'hero')` and `getSectionData(globalData, 'survivorStory')`

### 2. ClinicalTrialsShowcase ✅
- **File**: `src/components/ClinicalTrialsShowcase/ClinicalTrialsShowcase.jsx`
- **Data Used**: 
  - Slides/Showcase items
  - Background images
- **Status**: Connected via `getCollectionData(globalData, 'clinicalTrialsShowcase')`

### 3. AboutSection ✅
- **File**: `src/components/AboutSection/AboutSection.jsx`
- **Data Used**: 
  - Section content (label, title, description, button)
  - Statistics/Counters
  - Images
- **Status**: Connected via `getSectionData(globalData, 'about')` and `getCollectionData(globalData, 'statistics')`

### 4. InnovativeCare ✅
- **File**: `src/components/InnovativeCare/InnovativeCare.jsx`
- **Data Used**: 
  - Section content (label, title, description)
  - Therapy cards (name, description, images)
- **Status**: Connected via `getSectionData(globalData, 'innovativeCare')` and `getCollectionData(globalData, 'therapies')`

### 5. Testimonials ✅
- **File**: `src/components/Testimonials/Testimonials.jsx`
- **Data Used**: 
  - Testimonial content (quote, author)
  - Section label and button
- **Status**: Connected via `getSectionData(globalData, 'testimonials')` and `globalData?.testimonials?.data`

---

## ❌ NOT Yet Connected (8/13 sections)

### 6. ClinicalTrialsAbout ❌
- **File**: `src/components/ClinicalTrialsAbout/ClinicalTrialsAbout.jsx`
- **Status**: Not connected - uses existing Redux slice only
- **Needs**: Integration with global API

### 7. ClinicalTrials ❌
- **File**: `src/components/ClinicalTrials/ClinicalTrials.jsx`
- **Status**: Not connected - uses existing Redux slice only
- **Needs**: Integration with global API

### 8. GetInTouch ❌
- **File**: `src/components/GetInTouch/GetInTouch.jsx`
- **Status**: Not connected - uses existing Redux slice only
- **Needs**: Integration with global API

### 9. LocationNetwork ❌
- **File**: `src/components/LocationNetwork/LocationNetwork.jsx`
- **Status**: Not connected - uses existing Redux slice only
- **Needs**: Integration with global API

### 10. HowItWorks ❌
- **File**: `src/components/HowItWorks/HowItWorks.jsx`
- **Status**: Not connected - uses existing Redux slice only
- **Needs**: Integration with global API

### 11. VideoTestimonials ❌
- **File**: `src/components/VideoTestimonials/VideoTestimonials.jsx`
- **Status**: Not connected - uses existing Redux slice only
- **Needs**: Integration with global API

### 12. Resources ❌
- **File**: `src/components/Resources/Resources.jsx`
- **Status**: Not connected - uses existing Redux slice only
- **Needs**: Integration with global API

### 13. Footer ❌
- **File**: `src/components/Footer/Footer.jsx`
- **Status**: Not connected - uses existing Redux slice only
- **Needs**: Integration with global API

---

## Summary

**Connected**: 5 sections (38%)
- Hero
- ClinicalTrialsShowcase
- AboutSection
- InnovativeCare
- Testimonials

**Not Connected**: 8 sections (62%)
- ClinicalTrialsAbout
- ClinicalTrials
- GetInTouch
- LocationNetwork
- HowItWorks
- VideoTestimonials
- Resources
- Footer

**Navigation**: Already connected via separate Strapi integration

---

## Next Steps

To connect remaining sections, apply this pattern to each component:

1. Import helpers: `import { getSectionData, getCollectionData, formatMedia } from '../../utils/strapiHelpers';`
2. Access global data: `const globalData = useSelector(state => state.global?.data);`
3. Extract data: `const sectionData = getSectionData(globalData, 'sectionName');`
4. Use with fallbacks: `const content = sectionData || existingData || defaultData;`

**Important**: Preserve all CSS, animations, and padding when integrating!



