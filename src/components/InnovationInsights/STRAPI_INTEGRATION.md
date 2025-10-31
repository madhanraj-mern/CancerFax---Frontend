# Innovation & Insights - Strapi Integration Guide

## 🎯 Overview

This guide explains how to integrate the **Innovation & Insights** section with Strapi CMS for dynamic content management.

---

## 📦 Required Strapi Content Types

### 1. Innovation Insights Section (Single Type)

**Collection Name**: `innovation-insights-section`  
**API ID**: `innovation-insights-section`  
**Type**: Single Type

#### Fields:

| Field Name | Type | Options | Required |
|------------|------|---------|----------|
| `label` | Text | Short text | Yes |
| `title` | Text | - | Yes |
| `description` | Rich Text / Long Text | - | Yes |
| `images` | Media | Multiple files, Images only | Yes |

#### Field Details:

```javascript
{
  label: {
    type: 'string',
    required: true,
    maxLength: 100,
    default: 'INNOVATION & INSIGHTS'
  },
  title: {
    type: 'string',
    required: true,
    maxLength: 200
  },
  description: {
    type: 'text',
    required: true
  },
  images: {
    type: 'media',
    multiple: true,
    allowedTypes: ['images'],
    required: true
  }
}
```

---

## 🔧 Redux Implementation

### 1. Create Redux Slice

**File**: `src/store/slices/innovationInsightsSlice.js`

```javascript
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { innovationInsightsAPI } from '../../services/contentService';

export const fetchInnovationInsights = createAsyncThunk(
  'innovationInsights/fetchSection',
  async (_, { rejectWithValue }) => {
    try {
      const data = await innovationInsightsAPI.getSection();
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch innovation insights');
    }
  }
);

const innovationInsightsSlice = createSlice({
  name: 'innovationInsights',
  initialState: {
    sectionContent: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchInnovationInsights.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchInnovationInsights.fulfilled, (state, action) => {
        state.loading = false;
        state.sectionContent = action.payload;
      })
      .addCase(fetchInnovationInsights.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default innovationInsightsSlice.reducer;
```

### 2. Add to Store

**File**: `src/store/index.js`

```javascript
import innovationInsightsReducer from './slices/innovationInsightsSlice';

const store = configureStore({
  reducer: {
    // ... other reducers
    innovationInsights: innovationInsightsReducer, // Add this
  },
});
```

---

## 🌐 API Service

### Add to Content Service

**File**: `src/services/contentService.js`

```javascript
// Innovation Insights API
export const innovationInsightsAPI = {
  getSection: async () => {
    const response = await api.get('/innovation-insights-section?populate=deep');
    return formatStrapiResponse(response.data.data);
  },
};
```

---

## ⚛️ Component Integration

### Updated Component

**File**: `src/components/InnovationInsights/InnovationInsights.jsx`

```javascript
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchInnovationInsights } from '../../store/slices/innovationInsightsSlice';
import { getMediaUrl } from '../../services/api';

const InnovationInsights = () => {
  const dispatch = useDispatch();
  const { sectionContent, loading, error } = useSelector(
    (state) => state.innovationInsights
  );

  useEffect(() => {
    dispatch(fetchInnovationInsights());
  }, [dispatch]);

  // Fallback content
  const defaultContent = {
    label: 'INNOVATION & INSIGHTS',
    title: 'Why Our Hospital Network Matters',
    description: 'At CancerFax, our strength lies...',
    images: [
      { id: 1, url: 'https://...', alt: 'Patient consultation' },
      { id: 2, url: 'https://...', alt: 'Medical team' },
      { id: 3, url: 'https://...', alt: 'Doctor with patient' },
    ],
  };

  const content = sectionContent || defaultContent;

  const getImageUrl = (image) => {
    if (typeof image === 'string') return image;
    if (image?.data?.attributes?.url) {
      return getMediaUrl(image.data.attributes.url);
    }
    if (image?.url) return getMediaUrl(image.url);
    return null;
  };

  // Format images array from Strapi
  const images = content.images?.data
    ? content.images.data.map((img, index) => ({
        id: img.id || index,
        url: img.attributes?.url,
        alt: img.attributes?.alternativeText || `Hospital network image ${index + 1}`,
      }))
    : content.images || defaultContent.images;

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading content</div>;

  return (
    <Section>
      <Container>
        <Header>
          <Label>{content.label}</Label>
          <Title>{content.title}</Title>
          <Description>{content.description}</Description>
        </Header>

        <ImagesGrid>
          {images.map((image) => {
            const imageUrl = getImageUrl(image);
            return (
              <ImageCard key={image.id}>
                {imageUrl ? (
                  <Image src={imageUrl} alt={image.alt} />
                ) : (
                  <ImagePlaceholder>Image Placeholder</ImagePlaceholder>
                )}
              </ImageCard>
            );
          })}
        </ImagesGrid>
      </Container>
    </Section>
  );
};
```

---

## 📊 Strapi Content Example

### Sample Data Structure

```json
{
  "data": {
    "id": 1,
    "attributes": {
      "label": "INNOVATION & INSIGHTS",
      "title": "Why Our Hospital Network Matters",
      "description": "At CancerFax, our strength lies not just in what we recommend, but with whom we partner. We carefully vet and collaborate with leading cancer hospitals and research institutions around the globe, ensuring your care is built on credibility, safety, and excellence.",
      "images": {
        "data": [
          {
            "id": 1,
            "attributes": {
              "name": "patient-consultation.jpg",
              "alternativeText": "Doctor consulting with patient",
              "url": "/uploads/patient_consultation_abc123.jpg",
              "formats": {
                "large": {
                  "url": "/uploads/large_patient_consultation_abc123.jpg",
                  "width": 1000,
                  "height": 667
                },
                "medium": {
                  "url": "/uploads/medium_patient_consultation_abc123.jpg",
                  "width": 750,
                  "height": 500
                },
                "thumbnail": {
                  "url": "/uploads/thumbnail_patient_consultation_abc123.jpg",
                  "width": 245,
                  "height": 156
                }
              }
            }
          },
          {
            "id": 2,
            "attributes": {
              "name": "medical-team.jpg",
              "alternativeText": "Medical team in operation room",
              "url": "/uploads/medical_team_def456.jpg"
            }
          },
          {
            "id": 3,
            "attributes": {
              "name": "doctor-patient.jpg",
              "alternativeText": "Doctor explaining treatment to patient",
              "url": "/uploads/doctor_patient_ghi789.jpg"
            }
          }
        ]
      },
      "createdAt": "2024-01-15T10:00:00.000Z",
      "updatedAt": "2024-01-15T10:00:00.000Z",
      "publishedAt": "2024-01-15T10:00:00.000Z"
    }
  },
  "meta": {}
}
```

---

## 🎨 Content Guidelines

### Label
- **Max Length**: 50 characters
- **Format**: ALL CAPS with letter spacing
- **Example**: "INNOVATION & INSIGHTS"

### Title
- **Max Length**: 100 characters
- **Format**: Title case
- **Recommended**: Keep under 60 characters for best display
- **Example**: "Why Our Hospital Network Matters"

### Description
- **Max Length**: 500 characters
- **Format**: Plain text or rich text
- **Recommended**: 200-300 characters for best readability
- **Line Height**: 1.8 (automatically applied)

### Images
- **Count**: Exactly 3 images
- **Format**: JPG, PNG, WebP
- **Recommended Size**: 800px × 600px minimum
- **Aspect Ratio**: 4:3 or 16:9 landscape
- **File Size**: Under 500KB per image (optimized)
- **Alt Text**: Required for accessibility

---

## 🔐 Permissions Setup

### In Strapi Admin Panel:

1. Go to **Settings** → **Users & Permissions Plugin** → **Roles** → **Public**
2. Enable these permissions for `innovation-insights-section`:
   - ✅ `find`
   - ✅ `findOne`

---

## 🧪 Testing

### Test API Endpoint

```bash
# Get innovation insights section
GET http://localhost:1337/api/innovation-insights-section?populate=deep

# Response should include:
# - label
# - title
# - description
# - images (array with 3 items)
```

### Test in React App

```javascript
// In browser console
fetch('http://localhost:1337/api/innovation-insights-section?populate=deep')
  .then(res => res.json())
  .then(data => console.log(data));
```

---

## ✅ Implementation Checklist

### Strapi Setup
- [ ] Create `innovation-insights-section` single type
- [ ] Add all required fields (label, title, description, images)
- [ ] Set field validations
- [ ] Add sample content
- [ ] Upload 3 images
- [ ] Set public permissions
- [ ] Test API endpoint

### Redux Setup
- [ ] Create `innovationInsightsSlice.js`
- [ ] Add async thunk `fetchInnovationInsights`
- [ ] Add reducer to store
- [ ] Test Redux action

### API Setup
- [ ] Add `innovationInsightsAPI` to `contentService.js`
- [ ] Test API call

### Component Update
- [ ] Add Redux hooks to component
- [ ] Add `useEffect` to fetch data on mount
- [ ] Update image handling for Strapi format
- [ ] Add loading and error states
- [ ] Test with real data
- [ ] Test with fallback data

---

## 🚀 Deployment Notes

1. **Environment Variables**: Ensure `REACT_APP_STRAPI_URL` is set
2. **Image Optimization**: Consider using Strapi's image optimization plugin
3. **Caching**: Implement caching strategy for images
4. **CDN**: Use CDN for image delivery in production

---

## 📝 Content Management Guide

### For Strapi Admins:

1. **Login to Strapi**: Navigate to Strapi admin panel
2. **Navigate**: Go to Content Manager → Single Types → Innovation Insights Section
3. **Edit Content**:
   - Update label (keep uppercase format)
   - Edit title (keep concise)
   - Update description (200-300 characters recommended)
   - Upload/replace images (3 images, landscape format)
   - Add descriptive alt text for each image
4. **Save & Publish**: Click "Save" then "Publish"
5. **Verify**: Check the frontend to see changes

---

**Status**: 📝 Documentation complete - Ready for implementation  
**Next Steps**: Create Redux slice and integrate with Strapi








