# Strapi Global API Integration Guide

This guide explains how to integrate Strapi data from the `/api/global` endpoint into all landing page sections while preserving CSS, animations, and padding.

## API Endpoint
```
https://cancerfax.unifiedinfotechonline.com/api/global?populate=deep
```

## Setup Complete

### 1. Global Slice Created
- File: `src/store/slices/globalSlice.js`
- Redux action: `fetchGlobalData`
- Automatically fetches from the global endpoint

### 2. Helper Functions Created
- File: `src/utils/strapiHelpers.js`
- Functions:
  - `getSectionData(globalData, sectionKey)` - Extract section data
  - `getCollectionData(globalData, collectionKey)` - Extract collection/array data
  - `formatMedia(media)` - Format image/media URLs
  - `formatComponent(component)` - Format component data
  - `getRelatedData(section, relationKey)` - Get nested relationships

### 3. LandingPage Updated
- Automatically fetches global data on mount
- Data available in Redux store under `state.global.data`

## Integration Pattern for Components

### Step 1: Import Helpers
```javascript
import { getSectionData, getCollectionData, formatMedia } from '../../utils/strapiHelpers';
```

### Step 2: Access Global Data
```javascript
const globalData = useSelector(state => state.global?.data);
```

### Step 3: Extract Section Data
```javascript
// For single section
const sectionData = getSectionData(globalData, 'sectionName');

// For collections
const items = getCollectionData(globalData, 'itemsKey');
```

### Step 4: Use with Fallbacks
```javascript
// Always preserve existing fallback data
const content = sectionData || existingData || defaultData;
```

## Components to Update

### ✅ Completed
- [x] InnovativeCare
- [x] Hero

### ⏳ Remaining Components
Apply the same pattern to:

1. **ClinicalTrialsShowcase**
   - Use `getSectionData(globalData, 'clinicalTrialsShowcase')`

2. **AboutSection**
   - Use `getSectionData(globalData, 'about')`

3. **Testimonials**
   - Use `getSectionData(globalData, 'testimonials')`
   - Use `getCollectionData(globalData, 'testimonials')`

4. **ClinicalTrialsAbout**
   - Use `getSectionData(globalData, 'clinicalTrialsAbout')`

5. **ClinicalTrials**
   - Use `getSectionData(globalData, 'clinicalTrials')`
   - Use `getCollectionData(globalData, 'trials')`

6. **GetInTouch**
   - Use `getSectionData(globalData, 'getInTouch')`

7. **HowItWorks**
   - Use `getSectionData(globalData, 'howItWorks')`
   - Use `getCollectionData(globalData, 'steps')`

8. **VideoTestimonials**
   - Use `getSectionData(globalData, 'videoTestimonials')`
   - Use `getCollectionData(globalData, 'videos')`

9. **Resources**
   - Use `getSectionData(globalData, 'resources')`
   - Use `getCollectionData(globalData, 'resources')`

10. **LocationNetwork**
    - Use `getSectionData(globalData, 'locationNetwork')`

11. **Footer**
    - Use `getSectionData(globalData, 'footer')`
    - Use `getCollectionData(globalData, 'footerLinks')`

## Important Notes

### Preserve CSS, Animations, and Padding
- **DO NOT** modify styled-components
- **DO NOT** change CSS classes or animations
- **DO NOT** alter padding/margin values
- **ONLY** update the data/content being displayed

### Data Structure Flexibility
The helper functions try multiple paths to find data:
- `globalData.sectionNameSection.data.attributes`
- `globalData.sectionName.data.attributes`
- `globalData.sectionNameSection`
- `globalData.sectionName`

### Image Handling
Always use `formatMedia()` for images:
```javascript
const imageUrl = formatMedia(sectionData?.image) || fallbackImage;
```

### Example Implementation

```javascript
import { getSectionData, formatMedia } from '../../utils/strapiHelpers';

const Component = () => {
  const globalData = useSelector(state => state.global?.data);
  const existingData = useSelector(state => state.section?.data);
  
  // Extract from global
  const strapiSection = getSectionData(globalData, 'sectionName');
  
  // Use with fallbacks
  const title = strapiSection?.title || existingData?.title || 'Default Title';
  const image = formatMedia(strapiSection?.image) || 'default-image.jpg';
  
  return (
    <StyledSection>
      {/* All CSS/animations/padding preserved */}
      <Title>{title}</Title>
      <Image src={image} />
    </StyledSection>
  );
};
```

## Testing

After integration:
1. Verify data loads from Strapi API
2. Confirm fallbacks work if API fails
3. Check all CSS/animations still work
4. Verify responsive design intact
5. Test all sections on landing page








