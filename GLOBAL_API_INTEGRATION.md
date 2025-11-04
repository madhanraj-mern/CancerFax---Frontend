# Global API Integration for Header and Footer

## Endpoint
Using: `https://cancerfax.unifiedinfotechonline.com/api/global`  
Documentation: https://cancerfax.unifiedinfotechonline.com/documentation/v1.0.0#/Global/get%2Fglobal

## Current Implementation

### `src/store/slices/globalSlice.js`
- Fetches from `/api/global?populate=*` for navbar and footer data
- Falls back to `populate=*` if specific populate fails
- Returns `navbar` and `footer` in the global data object

### Navigation Component (`src/components/Navigation/Navigation.jsx`)
- Extracts data from `globalData?.navbar`
- Expected fields:
  - `menuItems` - Array of menu items
  - `logo` - Logo image object
  - `languages` - Array of available languages
  - `buttons` - Button configuration object

### Footer Component (`src/components/Footer/Footer.jsx`)
- Extracts data from `globalData?.footer`
- Expected fields:
  - `logo` - Logo image
  - `description` - Footer description text
  - `footer_bottom_text` - CTA title
  - `copyright` - Copyright text
  - `social_media_links` - Array of social media/contact links
  - `footer_columns` - Array of footer link columns
  - `locations` - Array of location data
  - `policy_links` - Array of legal/policy links
  - `cta` - Call-to-action object

## Status
✅ Code is configured to use `/api/global` endpoint for navbar and footer data
⚠️ API populate may need adjustment if nested relations aren't fully populated
✅ Components have fallback data if Strapi data is unavailable



