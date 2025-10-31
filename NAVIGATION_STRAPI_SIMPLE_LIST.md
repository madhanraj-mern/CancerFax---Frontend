# Navigation Component - Strapi Integration Simple List

## Content Types Required

### 1. **Navigation** (`/api/navigation`)
**Endpoint:** `GET /api/navigation?populate=*`

**Fields:**
```
- menuItems (Component: repeater)
  - label (Text) - e.g., "About", "Hospitals & Doctors"
  - link (Text) - URL path, e.g., "/about", "/hospitals"
  - hasDropdown (Boolean) - true/false
  - dropdownType (Enumeration) - "simple" or "treatments"
  - order (Number) - for sorting
  - subMenus (Component: repeater)
    - label (Text) - e.g., "About Us", "Our Specialisation"
    - link (Text) - URL path
    - order (Number)
    - hasChildren (Boolean) - for nested items
    - categoryKey (Text) - for treatments (e.g., "car-t-cell", "gene-therapy")
    - childMenus (Component: repeater) - only if hasChildren = true
      - label (Text)
      - link (Text)
      - order (Number)
```

**Example Data:**
```json
{
  "menuItems": [
    {
      "label": "About",
      "link": "/about",
      "hasDropdown": true,
      "dropdownType": "simple",
      "order": 1,
      "subMenus": [
        {
          "label": "About Us",
          "link": "/about",
          "order": 1,
          "hasChildren": false
        },
        {
          "label": "Our Specialisation",
          "link": "/specialisation",
          "order": 2,
          "hasChildren": false
        }
      ]
    },
    {
      "label": "Hospitals & Doctors",
      "link": "/hospitals",
      "hasDropdown": true,
      "dropdownType": "simple",
      "order": 2,
      "subMenus": [
        {
          "label": "Hospitals",
          "link": "/hospitals",
          "order": 1,
          "hasChildren": false
        },
        {
          "label": "Doctors",
          "link": "/doctors",
          "order": 2,
          "hasChildren": false
        }
      ]
    },
    {
      "label": "Treatments",
      "link": "/treatments",
      "hasDropdown": true,
      "dropdownType": "treatments",
      "order": 3,
      "subMenus": [
        {
          "label": "CAR T-Cell therapy",
          "link": "/treatments/car-t-cell",
          "order": 1,
          "hasChildren": true,
          "categoryKey": "car-t-cell",
          "childMenus": [
            {
              "label": "CAR T Cell Therapy In Autoimmune Disorders",
              "link": "/treatments/car-t-autoimmune",
              "order": 1
            },
            {
              "label": "CAR T-Cell Therapy For Chronic Lymphocytic Leukemia",
              "link": "/treatments/car-t-cll",
              "order": 2
            }
          ]
        },
        {
          "label": "Gene Therapy",
          "link": "/treatments/gene-therapy",
          "order": 2,
          "hasChildren": true,
          "categoryKey": "gene-therapy",
          "childMenus": [
            {
              "label": "CRISPR/Cas9 Gene Therapy In China",
              "link": "/treatments/crispr-china",
              "order": 1
            }
          ]
        }
      ]
    },
    {
      "label": "Clinical Trials",
      "link": "/clinical-trials",
      "hasDropdown": true,
      "dropdownType": "simple",
      "order": 4,
      "subMenus": [
        {
          "label": "Ongoing Clinical Trials",
          "link": "/clinical-trials/ongoing",
          "order": 1,
          "hasChildren": false
        }
      ]
    },
    {
      "label": "Resources",
      "link": "/resources",
      "hasDropdown": true,
      "dropdownType": "simple",
      "order": 5,
      "subMenus": [
        {
          "label": "Resource Listing",
          "link": "/resources",
          "order": 1,
          "hasChildren": false
        },
        {
          "label": "FAQs",
          "link": "/faqs",
          "order": 2,
          "hasChildren": false
        }
      ]
    }
  ]
}
```

---

### 2. **Logo** (`/api/logo`)
**Endpoint:** `GET /api/logo?populate=deep`

**Fields:**
```
- logoImage (Media) - Image file (optional)
- image (Media) - Alternative image field (optional)
- logoText (Text) - Text fallback, e.g., "CancerFax" (optional)
- text (Text) - Alternative text field (optional)
```

**Priority:** `logoImage` > `image` > `logoText` > `text`

**Example Data:**
```json
{
  "logoImage": {
    "url": "/uploads/logo.png"
  },
  "logoText": "CancerFax"
}
```

---

### 3. **Languages** (`/api/languages`)
**Endpoint:** `GET /api/languages?populate=deep`

**Fields:**
```
- languages (Component: repeater)
  - name (Text) - e.g., "English", "Spanish"
  - code (Text) - e.g., "en", "es"
  - flagImage (Media) - Flag image file (optional)
  - flag (Media) - Alternative flag image (optional)
  - flag (Text) - Emoji flag, e.g., "🇬🇧" (optional)
```

**Priority:** `flagImage` > `flag` (Media) > `flag` (Text/emoji)

**Example Data:**
```json
{
  "languages": [
    {
      "name": "English",
      "code": "en",
      "flagImage": {
        "url": "/uploads/flags/uk.png"
      }
    },
    {
      "name": "Spanish",
      "code": "es",
      "flag": "🇪🇸"
    }
  ]
}
```

---

### 4. **Navigation Buttons** (`/api/navigation-buttons`)
**Endpoint:** `GET /api/navigation-buttons?populate=*`

**Fields:**
```
- connectButtonText (Text) - Button label, e.g., "Connect With Us"
- connectButtonLink (Text) - Button URL, e.g., "/contact"
- connectButton (Component: single) - Alternative structure
  - text (Text)
  - link (Text)
```

**Priority:** `connectButtonText`/`connectButtonLink` > `connectButton.text`/`connectButton.link`

**Example Data:**
```json
{
  "connectButtonText": "Connect With Us",
  "connectButtonLink": "/contact"
}
```

**OR Alternative Structure:**
```json
{
  "connectButton": {
    "text": "Connect With Us",
    "link": "/contact"
  }
}
```

---

## Quick Setup Checklist

### ✅ Step 1: Create Content Types
- [ ] Navigation (with menuItems repeater)
- [ ] Logo (with logoImage, image, logoText fields)
- [ ] Languages (with languages repeater)
- [ ] Navigation Buttons (with connectButton fields)

### ✅ Step 2: Set Up Relationships
- [ ] Navigation menuItems → subMenus → childMenus (nested repeaters)
- [ ] Logo → Media (logoImage, image)
- [ ] Languages → Media (flagImage, flag)
- [ ] Treatments dropdown with categoryKey for grouping

### ✅ Step 3: Add Sample Data
- [ ] Add 5 main menu items (About, Hospitals & Doctors, Treatments, Clinical Trials, Resources)
- [ ] Add sub-menus for each dropdown
- [ ] Add child menus for Treatments categories
- [ ] Add logo image or text
- [ ] Add at least 2-3 languages
- [ ] Add "Connect With Us" button text and link

### ✅ Step 4: Configure API
- [ ] Ensure `populate=*` or `populate=deep` includes all nested levels
- [ ] Test API endpoints return correct structure
- [ ] Verify media URLs are accessible

---

## Field Priority Reference

### Logo Fields (in order):
1. `logoImage` (Media)
2. `image` (Media)
3. `logoText` (Text)
4. `text` (Text)
5. Default: "CancerFax"

### Language Flag Fields (in order):
1. `flagImage` (Media)
2. `flag` (Media object)
3. `flag` (Text/emoji string)
4. Default: "🌐" emoji

### Button Fields (in order):
1. `connectButtonText` + `connectButtonLink`
2. `connectButton.text` + `connectButton.link`
3. Default: "Connect With Us" + "/contact"

---

## Important Notes

1. **Treatments Dropdown**: Must use `dropdownType: "treatments"` and include `categoryKey` for each category
2. **Nested Menus**: Use `hasChildren: true` and `childMenus` array for nested items
3. **Ordering**: Use `order` field to control menu item sequence
4. **Populate**: Always use `?populate=*` or `?populate=deep` to include all nested relationships
5. **Media URLs**: Frontend uses `getMediaUrl()` helper to format Strapi media URLs

---

## Testing

After setup, test these endpoints:
- ✅ `GET /api/navigation?populate=*`
- ✅ `GET /api/logo?populate=deep`
- ✅ `GET /api/languages?populate=deep`
- ✅ `GET /api/navigation-buttons?populate=*`

All should return properly structured JSON with nested data.

