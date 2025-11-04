# Menu Structure Migration - Strapi Menu Guide Implementation

## Overview
Updated Navigation component to use the new Strapi menu structure as per the menu guide.

## New Structure (from menu-guide.txt)

### Global Single Type
- `logo` - Media (single)
- `cta_label` - Text (e.g., "Connect With Us")
- `cta_url` - Text (e.g., `/contact`)
- `header_menu` - Relation (Global has one → Menu)

### Menu Collection Type
- `name` - Text
- `slug` - UID
- `items` - Relation (Menu has many → Menu Item)

### Menu Item Collection Type
- `label` - Text
- `slug` - UID (optional)
- `type` - Enumeration: `link`, `category`, `mega`
- `is_clickable` - Boolean
- `order` - Integer
- `icon` - Media (optional)
- `internal_path` - Text
- `external_url` - Text (optional)
- `target` - Enumeration: `_self`, `_blank`
- `menu` - Relation (many Menu Items belong to one Menu)
- `parent` - Relation (many Menu Items belong to one Menu Item)
- `children` - Relation (one Menu Item has many Menu Items)
- `links` - Component (repeatable) (optional; for mega menu columns)

## Implementation Changes

### 1. `src/store/slices/globalSlice.js`
- Updated to fetch with populate query:
  ```
  GET /api/global?populate[logo]=*&populate[header_menu][populate][items][populate]=children,children.children,icon,links&populate[footer]=*
  ```
- Returns:
  - `headerMenu` - New menu structure
  - `logo` - Logo from Global
  - `ctaLabel` - CTA label from Global
  - `ctaUrl` - CTA URL from Global
  - `navbar` - Legacy structure (for fallback)

### 2. `src/components/Navigation/Navigation.jsx`
- **Data Extraction**:
  - Prioritizes new structure (`headerMenu`, `logo`, `ctaLabel`, `ctaUrl`)
  - Falls back to legacy `navbar` structure if new structure not available
  
- **Menu Transformation**:
  - Added `transformMenuItems()` function to convert Strapi menu structure to component format
  - Filters top-level items (no parent)
  - Sorts by `order`
  - Preserves `children`, `links`, `icon` for nested menus

- **Logo Handling**:
  - Checks `logo.data.attributes.url` (new structure)
  - Falls back to legacy logo paths
  - Defaults to `/images/logo.png`

- **CTA Button**:
  - Uses `ctaLabel` and `ctaUrl` from Global
  - Falls back to legacy `buttons` structure

## Menu Type Handling

The component currently uses label-based matching (e.g., `item.label === 'About'`). The new menu structure supports:
- **`category`** - Non-clickable label with submenu (e.g., "About", "Hospitals & Doctors")
- **`link`** - Clickable item (e.g., "Survivor Stories", "Connect With Us")
- **`mega`** - Top item with mega dropdown (e.g., "Treatments")

## Next Steps

To fully utilize the new menu structure:
1. Update menu rendering logic to use `item.type` instead of label matching
2. Implement dynamic menu rendering based on `type`, `children`, and `links`
3. Support mega menu columns using the `links` component
4. Use `order` for dynamic sorting

## Backward Compatibility

✅ Legacy `navbar` structure is still supported as fallback
✅ Component will work with both old and new Strapi structures




