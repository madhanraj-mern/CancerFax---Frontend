# Key Factors - Strapi Integration Guide

## Overview
This guide explains how to integrate the Key Factors component with Strapi CMS, allowing dynamic content management for the key factors section.

## Strapi Content Types

### 1. Single Type: `key-factors-section`

Create a single type for the section header and image:

```json
{
  "kind": "singleType",
  "collectionName": "key_factors_section",
  "info": {
    "singularName": "key-factors-section",
    "pluralName": "key-factors-sections",
    "displayName": "Key Factors Section",
    "description": "Key factors section header and main image"
  },
  "options": {
    "draftAndPublish": true
  },
  "pluginOptions": {},
  "attributes": {
    "label": {
      "type": "string",
      "default": "KEY FACTORS"
    },
    "title": {
      "type": "string",
      "default": "Why Choose Our Hospital Network"
    },
    "image": {
      "type": "media",
      "multiple": false,
      "required": true,
      "allowedTypes": ["images"]
    },
    "imageAlt": {
      "type": "string",
      "default": "Healthcare professional"
    }
  }
}
```

### 2. Collection Type: `key-factor`

Create a collection type for individual factors:

```json
{
  "kind": "collectionType",
  "collectionName": "key_factors",
  "info": {
    "singularName": "key-factor",
    "pluralName": "key-factors",
    "displayName": "Key Factor",
    "description": "Individual key factors for hospital network"
  },
  "options": {
    "draftAndPublish": true
  },
  "pluginOptions": {},
  "attributes": {
    "title": {
      "type": "string",
      "required": true
    },
    "description": {
      "type": "text",
      "required": true
    },
    "icon": {
      "type": "enumeration",
      "enum": ["document", "user", "hospital", "settings", "heart"],
      "default": "document",
      "required": true
    },
    "order": {
      "type": "integer",
      "required": true,
      "default": 1,
      "min": 1,
      "max": 5
    }
  }
}
```

## API Endpoints

### Get Key Factors Section
```
GET /api/key-factors-section?populate=*
```

### Get All Key Factors
```
GET /api/key-factors?populate=*&sort=order:asc
```

## Redux Integration

### 1. Create Redux Slice

Create `src/store/slices/keyFactorsSlice.js`:

```javascript
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { keyFactorsAPI } from '../../services/contentService';

export const fetchKeyFactorsSection = createAsyncThunk(
  'keyFactors/fetchKeyFactorsSection',
  async (_, { rejectWithValue }) => {
    try {
      const data = await keyFactorsAPI.getKeyFactorsSection();
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch key factors section');
    }
  }
);

export const fetchKeyFactors = createAsyncThunk(
  'keyFactors/fetchKeyFactors',
  async (_, { rejectWithValue }) => {
    try {
      const data = await keyFactorsAPI.getKeyFactors();
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch key factors');
    }
  }
);

const keyFactorsSlice = createSlice({
  name: 'keyFactors',
  initialState: {
    sectionContent: null,
    factors: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchKeyFactorsSection.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchKeyFactorsSection.fulfilled, (state, action) => {
        state.loading = false;
        state.sectionContent = action.payload;
      })
      .addCase(fetchKeyFactorsSection.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchKeyFactors.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchKeyFactors.fulfilled, (state, action) => {
        state.loading = false;
        state.factors = action.payload;
      })
      .addCase(fetchKeyFactors.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default keyFactorsSlice.reducer;
```

### 2. Add to Store

Update `src/store/index.js`:

```javascript
import keyFactorsReducer from './slices/keyFactorsSlice';

const store = configureStore({
  reducer: {
    // ... other reducers
    keyFactors: keyFactorsReducer,
  },
});
```

### 3. Add API Service

Update `src/services/contentService.js`:

```javascript
// Key Factors API
export const keyFactorsAPI = {
  getKeyFactorsSection: async () => {
    const response = await api.get('/key-factors-section?populate=*');
    return formatStrapiResponse(response.data.data);
  },
  
  getKeyFactors: async () => {
    const response = await api.get('/key-factors?populate=*&sort=order:asc');
    return formatStrapiResponse(response.data.data);
  },
};
```

## Update Component

Update `src/components/KeyFactors/KeyFactors.jsx` to use Redux:

```javascript
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchKeyFactorsSection, fetchKeyFactors } from '../../store/slices/keyFactorsSlice';
import { getMediaUrl } from '../../services/api';

const KeyFactors = () => {
  const dispatch = useDispatch();
  const { sectionContent, factors, loading, error } = useSelector((state) => state.keyFactors);

  useEffect(() => {
    dispatch(fetchKeyFactorsSection());
    dispatch(fetchKeyFactors());
  }, [dispatch]);

  // Fallback content
  const defaultContent = {
    label: 'KEY FACTORS',
    title: 'Why Choose Our Hospital Network',
    image: {
      url: 'https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=800',
      alt: 'Healthcare professional',
    },
  };

  const defaultFactors = [
    {
      id: 1,
      title: '1. Share Your Medical Reports',
      description: 'Upload your medical reports for comprehensive evaluation and analysis',
      icon: 'document',
      order: 1,
    },
    {
      id: 2,
      title: '2. Receive Expert Evaluation',
      description: 'Get expert analysis to guide your treatment decisions',
      icon: 'user',
      order: 2,
    },
    {
      id: 3,
      title: '3. Choose the Right Hospital or Trial',
      description: 'Select the best hospital or participate in the latest clinical trials',
      icon: 'hospital',
      order: 3,
    },
    {
      id: 4,
      title: '4. Seamless Coordination',
      description: 'Enjoy smooth coordination with healthcare professionals throughout',
      icon: 'settings',
      order: 4,
    },
    {
      id: 5,
      title: '5. Continuous Support',
      description: 'Receive continuous support throughout your treatment journey',
      icon: 'heart',
      order: 5,
    },
  ];

  // Use Strapi data or fallback
  const content = sectionContent || defaultContent;
  const factorsList = Array.isArray(factors) && factors.length > 0 ? factors : defaultFactors;

  // Get image URL from Strapi or use default
  const imageUrl = sectionContent?.image ? getMediaUrl(sectionContent.image) : content.image.url;
  const imageAlt = sectionContent?.imageAlt || content.image.alt;

  if (loading) return <div>Loading...</div>;
  if (error) console.error('Key Factors error:', error);

  return (
    <Section>
      <Container>
        <Header>
          <Label>{content.label}</Label>
          <Title>{content.title}</Title>
        </Header>

        <ContentWrapper>
          <ImageSection>
            <img src={imageUrl} alt={imageAlt} />
          </ImageSection>

          {factorsList.map((factor) => {
            // Grid positioning logic...
            const gridPosition = {
              1: { row: '1', column: '2', showLeftBorder: true },
              2: { row: '1', column: '3', showLeftBorder: true, topRightCorner: true },
              3: { row: '2', column: '1', showRightBorder: true, bottomLeftCorner: true },
              4: { row: '2', column: '2', showLeftBorder: true },
              5: { row: '2', column: '3', showLeftBorder: true, bottomRightCorner: true },
            };

            const position = gridPosition[factor.order || factor.id];

            return (
              <StepCard
                key={factor.id}
                gridRow={position.row}
                gridColumn={position.column}
                showLeftBorder={position.showLeftBorder}
                showRightBorder={position.showRightBorder}
                showBottomBorder={position.showBottomBorder}
                topRightCorner={position.topRightCorner}
                bottomLeftCorner={position.bottomLeftCorner}
                bottomRightCorner={position.bottomRightCorner}
              >
                <IconWrapper>{getIcon(factor.icon)}</IconWrapper>
                <StepTitle>{factor.title}</StepTitle>
                <StepDescription>{factor.description}</StepDescription>
              </StepCard>
            );
          })}
        </ContentWrapper>
      </Container>
    </Section>
  );
};
```

## Strapi Admin Setup

### Step 1: Create Content Types

1. Go to **Content-Type Builder** in Strapi admin
2. Create **Single Type**: `key-factors-section`
   - Add fields as specified above
3. Create **Collection Type**: `key-factor`
   - Add fields as specified above

### Step 2: Add Content

#### Key Factors Section
1. Go to **Content Manager** > **Key Factors Section**
2. Fill in:
   - Label: `KEY FACTORS`
   - Title: `Why Choose Our Hospital Network`
   - Upload image (recommended size: 700×444px)
   - Image Alt: `Healthcare professional`
3. Click **Save** and **Publish**

#### Key Factors
1. Go to **Content Manager** > **Key Factors**
2. Click **Create new entry** for each factor:

**Factor 1:**
- Title: `1. Share Your Medical Reports`
- Description: `Upload your medical reports for comprehensive evaluation and analysis`
- Icon: `document`
- Order: `1`

**Factor 2:**
- Title: `2. Receive Expert Evaluation`
- Description: `Get expert analysis to guide your treatment decisions`
- Icon: `user`
- Order: `2`

**Factor 3:**
- Title: `3. Choose the Right Hospital or Trial`
- Description: `Select the best hospital or participate in the latest clinical trials`
- Icon: `hospital`
- Order: `3`

**Factor 4:**
- Title: `4. Seamless Coordination`
- Description: `Enjoy smooth coordination with healthcare professionals throughout`
- Icon: `settings`
- Order: `4`

**Factor 5:**
- Title: `5. Continuous Support`
- Description: `Receive continuous support throughout your treatment journey`
- Icon: `heart`
- Order: `5`

3. Click **Save** and **Publish** for each

### Step 3: Set Permissions

1. Go to **Settings** > **Roles** > **Public**
2. Enable permissions for:
   - `key-factors-section`: `find`
   - `key-factor`: `find`, `findOne`
3. Click **Save**

## Testing

### Test API Endpoints

```bash
# Test section endpoint
curl http://localhost:1337/api/key-factors-section?populate=*

# Test factors endpoint
curl http://localhost:1337/api/key-factors?populate=*&sort=order:asc
```

### Expected Response Format

**Section:**
```json
{
  "data": {
    "id": 1,
    "attributes": {
      "label": "KEY FACTORS",
      "title": "Why Choose Our Hospital Network",
      "image": {
        "data": {
          "attributes": {
            "url": "/uploads/...",
            "alternativeText": "Healthcare professional"
          }
        }
      },
      "imageAlt": "Healthcare professional"
    }
  }
}
```

**Factors:**
```json
{
  "data": [
    {
      "id": 1,
      "attributes": {
        "title": "1. Share Your Medical Reports",
        "description": "Upload your medical reports...",
        "icon": "document",
        "order": 1
      }
    }
  ]
}
```

## Features

✅ **Dynamic Content Management** - Edit all text through Strapi  
✅ **Image Management** - Upload and manage main image  
✅ **Reusable Component** - Can be added to any page  
✅ **Order Control** - Control factor display order  
✅ **Icon Selection** - Choose from 5 predefined icons  
✅ **Fallback Content** - Works without Strapi data  

## Customization Options

Administrators can customize:
- Section label and title
- Main image
- All factor titles and descriptions
- Factor order
- Icon selection for each factor

## Best Practices

1. **Image Optimization**: Upload images at 700×444px for best quality
2. **Order Management**: Use sequential numbers (1-5) for factor order
3. **Content Length**: Keep descriptions concise (2-3 lines maximum)
4. **Icon Selection**: Choose icons that match the factor meaning
5. **Testing**: Always test changes on a staging environment first

## Troubleshooting

### Factors not showing
- Check if factors are published in Strapi
- Verify API permissions are set correctly
- Check Redux state in browser DevTools

### Image not loading
- Verify image is uploaded and published
- Check Strapi media URL configuration
- Ensure `getMediaUrl` helper is working

### Wrong order
- Check `order` field values in Strapi
- Verify API call includes `sort=order:asc`
- Ensure order values are unique (1-5)

## Next Steps

After setting up the Key Factors integration:
1. ✅ Create Strapi content types
2. ✅ Add initial content
3. ✅ Set up API permissions
4. ✅ Update React component
5. ✅ Test on staging
6. ✅ Deploy to production






















