# Key Factors Component Documentation

## Overview
The Key Factors component displays the key benefits and processes of the hospital network in a structured grid layout with an image section. It uses the same design pattern as the "How It Works" section from the landing page.

## File Location
```
src/components/KeyFactors/KeyFactors.jsx
```

## Component Structure

```
┌─────────────────────────────────────────────────────────────┐
│  KEY FACTORS                                                │ ← Label
│  Our Criteria for Partner Hospital Selection               │ ← Title
│                                    [Connect with Experts →] │ ← CTA Button
│                                                             │
│  ┌─────────┐ │ Factor 1 │ Factor 2 │                      │
│  │         │ ├──────────┼──────────┤                      │
│  │  Image  │ │ Factor 3 │ Factor 4 │ Factor 5 │          │
│  │         │ └──────────┴──────────┴──────────┘          │
│  └─────────┘                                               │
│   349×222px     Grid Layout (3 columns × 2 rows)          │
└─────────────────────────────────────────────────────────────┘
```

## Design Specifications

### Section Layout
- **Padding**: `160px 120px 50px 120px` (Desktop - Top, Right, Bottom, Left)
- **Background**: `#F5F5F5` (Light gray)
- **Max Width**: `1440px` (Centered container)
- **Gap to Previous Section**: `210px` (160px top + 50px from previous section)

### Header
- **Layout**: Horizontal flex with space-between alignment
- **Gap**: `12px` between label and title

#### Label
- **Font**: `Montserrat`, `11px`, `600`
- **Color**: `#6B7280` (Gray)
- **Text Transform**: `uppercase`
- **Letter Spacing**: `2.5px`

#### Title
- **Font**: `Montserrat`, `40px`, `600`
- **Color**: `#2D3748`
- **Line Height**: `1.2`
- **Letter Spacing**: `-0.6px`
- **Max Width**: `750px`

#### CTA Button
- **Padding**: `20px 40px`
- **Background**: Pink gradient (`#FF69B4` to `#FF1493`)
- **Border Radius**: `50px` (pill shape)
- **Font**: `Montserrat`, `16px`, `600`
- **Color**: `white`
- **Box Shadow**: `0 4px 15px rgba(255, 105, 180, 0.3)`

### Grid Layout
- **Grid Columns**: `349px 1fr 1fr`
- **Grid Rows**: `222px 212px`
- **Border**: `1px solid #E5E7EB`
- **Border Radius**: `24px`
- **Background**: `white`

### Image Section
- **Width**: `349px`
- **Height**: `222px`
- **Position**: Grid row 1, column 1
- **Border Radius**: `24px 0 0 24px` (rounded left corners)
- **Object Fit**: `cover`

### Factor Cards
- **Padding**: `40px 32px`
- **Background**: `white`
- **Display**: `flex column`
- **Gap**: `18px`
- **Justify Content**: `center`
- **Border**: `1px solid #E5E7EB` (between cards)

#### Card Positions
1. **Factor 1**: Row 1, Column 2
2. **Factor 2**: Row 1, Column 3 (top-right corner rounded)
3. **Factor 3**: Row 2, Column 1 (bottom-left corner rounded)
4. **Factor 4**: Row 2, Column 2
5. **Factor 5**: Row 2, Column 3 (bottom-right corner rounded)

### Icon Style
- **Size**: `68px × 68px`
- **Border Radius**: `50%` (circle)
- **Background**: `#556B7F`
- **Icon Color**: `white`
- **Icon Size**: `32px × 32px`

### Typography
- **Factor Title**: 
  - Font: `Montserrat`, `22px`, `600`
  - Color: `#36454F`
  - Line Height: `1.4`
- **Factor Description**: 
  - Font: `Montserrat`, `15px`, `400`
  - Color: `#6B7280`
  - Line Height: `1.6`
  - Note: Optional field (not shown if empty)

## Responsive Breakpoints

### Desktop (1200px+)
- Full 3-column grid layout
- Image on left, factors in 2×3 grid

### Laptop (1024px - 1200px)
- Adjusted grid columns: `320px 1fr 1fr`
- Adjusted grid rows: `200px 190px`
- Reduced padding and font sizes

### Tablet (900px - 1024px)
- Adjusted grid columns: `280px 1fr 1fr`
- Adjusted grid rows: `180px 170px`

### Mobile (< 900px)
- **Single column layout**
- Image at top (full width, min-height: `300px`)
- Factors stack vertically below
- Each factor card maintains full width
- Border between cards

## Default Content

The component includes fallback content with:

- **Label**: "KEY FACTORS"
- **Title**: "Our Criteria for Partner Hospital Selection"
- **Button**: "Connect with our Experts"

### 5 Key Factors:

1. **International accreditation and certifications (JCI, NCI, etc.)**
2. **Specialized cancer / oncology departments & advanced therapy capability**
3. **Experience with clinical trials & research infrastructure**
4. **Strong patient outcome metrics & ethical practices**
5. **Multidisciplinary teams and language / logistical support**

## Icons

The component includes 5 different icons:
- **Certificate** - Accreditation/certification icon
- **Brain** - Cancer/oncology specialization icon
- **Research** - Clinical trials/research icon
- **Chart** - Patient outcomes/metrics icon
- **Team** - Multidisciplinary team/support icon

## Usage

```jsx
import KeyFactors from '../components/KeyFactors/KeyFactors';

function HospitalNetwork() {
  return (
    <div>
      <KeyFactors />
    </div>
  );
}
```

## Strapi Integration Ready

This component is structured to easily integrate with Strapi CMS:

### Content Type: `key-factors-section`
- `label` (Text)
- `title` (Text)
- `image` (Media)

### Collection Type: `key-factors`
- `title` (Text)
- `description` (Text)
- `icon` (Enum: document, user, hospital, settings, heart)
- `order` (Number)

## Mobile Responsive Features

✅ **Adaptive Grid Layout** - Changes from 3-column to single-column  
✅ **Flexible Image Height** - Adjusts based on screen size  
✅ **Touch-Friendly Spacing** - Adequate padding for mobile  
✅ **Readable Typography** - Font sizes optimized for mobile  
✅ **Stack Navigation** - Vertical layout on small screens  

## Accessibility

- Semantic HTML structure
- Proper heading hierarchy
- SVG icons with proper viewBox
- Descriptive alt text for images
- Keyboard navigation support

## Performance

- CSS-in-JS with styled-components
- No external dependencies for icons
- Optimized for fast rendering
- Responsive images

## Future Enhancements

- [ ] Add Strapi integration
- [ ] Add animation on scroll
- [ ] Add custom icon upload support
- [ ] Add color customization per factor
- [ ] Add optional CTA button for each factor

