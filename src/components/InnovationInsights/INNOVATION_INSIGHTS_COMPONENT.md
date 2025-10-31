# Innovation & Insights Component

## 📋 Overview

The **Innovation & Insights** section showcases CancerFax's hospital network credibility and partnerships. It features a centered header with label, title, and description, followed by three image cards in a grid layout.

---

## 📁 File Location

```
src/components/InnovationInsights/InnovationInsights.jsx
```

---

## 🎨 Design Specifications

### Section Layout
- **Background**: `#F5F5F5` (Light gray)
- **Padding**: `50px 120px` (Desktop)
- **Max Width**: `1440px` (Container)
- **Alignment**: Center-aligned header, grid images

### Typography

#### Label (INNOVATION & INSIGHTS)
- **Font**: Montserrat, sans-serif
- **Size**: `12px`
- **Weight**: `600` (Semi-bold)
- **Color**: `#666` (Gray)
- **Letter Spacing**: `3px`
- **Transform**: Uppercase
- **Margin Bottom**: `24px`

#### Title (Why Our Hospital Network Matters)
- **Font**: Montserrat, sans-serif
- **Size**: `48px`
- **Weight**: `700` (Bold)
- **Color**: `#36454F` (Dark gray-blue)
- **Line Height**: `1.3`
- **Letter Spacing**: `-0.5px`
- **Margin Bottom**: `28px`

#### Description
- **Font**: Montserrat, sans-serif
- **Size**: `16px`
- **Weight**: `400` (Regular)
- **Color**: `#36454F` (Dark gray-blue)
- **Line Height**: `1.8`
- **Max Width**: `1200px`

### Images Grid

#### Grid Layout
- **Display**: Horizontal flexbox with infinite scroll
- **Gap**: `32px`
- **Animation**: 30s linear infinite scroll from left to right
- **Layout**: Cards flow continuously

#### Image Cards
- **Width**: `420px` (Desktop)
- **Height**: `265px` (Desktop)
- **Background**: `#E0E0E0` (Placeholder)
- **Object Fit**: `cover`

#### Card Shapes (Varied Border Radius)
- **Rounded-Left**: `border-radius: 40px` (square with subtle rounded corners)
- **Rounded-Center**: `border-radius: 134px` (large uniform rounded corners creating oval/pill shape)
- **Rounded-Right**: `border-radius: 134px` (large uniform rounded corners creating oval/pill shape - same as center)

#### Scroll Animation
- **Duration**: `30s` (Desktop), `25s` (Mobile)
- **Direction**: Left to right continuous flow
- **Behavior**: Pauses on hover
- **Effect**: Infinite seamless loop

#### 3D Floating Hover Effect
- **Animation**: Scroll pauses
- **Card Transform**: `translateY(-12px)` (lifts up)
- **Box Shadow**: 
  - Normal: `0 4px 12px rgba(0, 0, 0, 0.1)`
  - Hover: `0 16px 32px rgba(0, 0, 0, 0.2)`
- **Transition**: `0.4s ease`
- **Effect**: Creates 3D floating illusion

---

## 📱 Responsive Breakpoints

### Desktop (> 1400px)
```css
padding: 50px 120px;
title: 48px;
image-height: 268px;
border-radius: 24px;
gap: 24px;
```

### Laptop (1200px - 1400px)
```css
padding: 50px 80px;
title: 42px;
image-height: 250px;
border-radius: 20px;
gap: 24px;
```

### Tablet (1024px - 1200px)
```css
padding: 45px 60px;
title: 38px;
image-height: 230px;
border-radius: 18px;
gap: 20px;
```

### Large Mobile (768px - 1024px)
```css
padding: 40px 40px;
title: 32px;
image-height: 280px;
border-radius: 16px;
grid-template-columns: 1fr;
gap: 16px;
```

### Mobile (< 768px)
```css
padding: 35px 24px;
title: 28px;
image-height: 240px;
border-radius: 14px;
grid-template-columns: 1fr;
```

---

## 🔧 Component Structure

```jsx
<Section>
  <Container>
    <Header>
      <Label>INNOVATION & INSIGHTS</Label>
      <Title>Why Our Hospital Network Matters</Title>
      <Description>At CancerFax, our strength lies...</Description>
    </Header>

    <ImagesGrid>
      <ImageCard>
        <Image src={url} alt="..." />
      </ImageCard>
      {/* 2 more image cards */}
    </ImagesGrid>
  </Container>
</Section>
```

---

## 🎯 Features

### Current Features
✅ **Centered header** with label, title, and description  
✅ **Horizontal scrolling animation** - Continuous left-to-right flow  
✅ **Three card shapes** - Rounded-left, rounded-center, rounded-right  
✅ **3D Floating hover effect** - Cards lift up with shadow on hover  
✅ **Infinite loop** - Seamless repeating animation  
✅ **Pause on hover** - User can stop animation to view cards  
✅ **Gradient fade edges** - Smooth visual effect on sides  
✅ **Static grid section** - Non-animated cards below scrolling section  
✅ **Box shadow** - Depth effect on all cards  
✅ **Responsive design** - Adapts animation speed and card sizes  
✅ **Image placeholders** for missing images  
✅ **Consistent spacing** with other sections  

### Animation Details
🎬 **30-second duration** on desktop (25s on mobile)  
🎬 **Linear timing** for smooth consistent movement  
🎬 **Duplicate images** for seamless infinite loop  
🎬 **Transform-based** for hardware acceleration  
🎬 **Pause-able** on hover for better UX  

### Strapi Integration (Ready)
🔄 **Dynamic content** - Label, title, description  
🔄 **Dynamic images** - Multiple images with alt text and shape types  
🔄 **Flexible layout** - Supports any number of images  
🔄 **Shape customization** - Each image can have different shape  

---

## 📐 Spacing & Layout

```
┌─────────────────────────────────────────────────────────────┐
│              INNOVATION & INSIGHTS                          │ ← Label (12px)
│                                                             │
│         Why Our Hospital Network Matters                    │ ← Title (48px)
│                                                             │
│      At CancerFax, our strength lies...                    │ ← Description
│                                                             │
│  ◀────── Scrolling Section (Animated) ────────▶            │
│  ┌────────┐    ╭────────╮    ╭────────╮   ┌────────┐     │
│  │        │    │        │    │        │   │        │ ... │
│  │ Image1 │    │ Image2 │    │ Image3 │   │ Image1 │     │
│  │(square)│    │ (oval) │    │ (oval) │   │(repeat)│     │
│  └────────┘    ╰────────╯    ╰────────╯   └────────┘     │
│   32px gap      420×265px     ↑ 3D float on hover         │
│  ← Square      Oval/pill    Oval/pill →                    │
│                                                             │
│                    80px margin-top                          │
│                                                             │
│  ────── Static Grid Section (No Animation) ──────          │
│  ┌────────┐     ╭────────╮     ╭────────╮                │
│  │        │     │        │     │        │                 │
│  │ Image4 │     │ Image5 │     │ Image6 │                 │
│  │(square)│     │ (oval) │     │ (oval) │                 │
│  └────────┘     ╰────────╯     ╰────────╯                 │
│   32px gap     3-column grid    ↑ 3D float on hover       │
└─────────────────────────────────────────────────────────────┘
   ← Gradient fade edges + Box shadows for depth
```

---

## 🎨 Color Palette

| Element | Color | Hex |
|---------|-------|-----|
| **Section Background** | Light gray | `#F5F5F5` |
| **Label Text** | Gray | `#666` |
| **Title Text** | Dark gray-blue | `#36454F` |
| **Description Text** | Dark gray-blue | `#36454F` |
| **Image Placeholder** | Light gray gradient | `#E0E0E0` → `#C0C0C0` |

---

## 📊 Content Structure

### Default Content
```javascript
{
  label: 'INNOVATION & INSIGHTS',
  title: 'Why Our Hospital Network Matters',
  description: 'At CancerFax, our strength lies not just in what we recommend, but with whom we partner. We carefully vet and collaborate with leading cancer hospitals and research institutions around the globe, ensuring your care is built on credibility, safety, and excellence.',
  images: [
    { id: 1, url: '...', alt: 'Patient consultation' },
    { id: 2, url: '...', alt: 'Medical team' },
    { id: 3, url: '...', alt: 'Doctor with patient' }
  ]
}
```

---

## 🚀 Usage

### Import
```javascript
import InnovationInsights from '../components/InnovationInsights/InnovationInsights';
```

### Implementation
```jsx
<InnovationInsights />
```

### In Hospital Network Page
```jsx
<QuickFinds />
<HospitalGrid />
<InnovationInsights /> {/* ← New section */}
<Footer />
```

---

## ✅ Quality Checklist

- [x] Centered header layout
- [x] 3-column responsive grid
- [x] Rounded image cards (24px radius)
- [x] Hover zoom effect on images
- [x] Mobile responsive (1 column)
- [x] Consistent typography (Montserrat)
- [x] Proper spacing (50px section padding)
- [x] Image placeholder support
- [x] Strapi-ready structure
- [x] Accessible alt text support

---

## 📝 Notes

1. **Image Aspect Ratio**: Images should be landscape format for best results
2. **Image Quality**: Minimum 800px width recommended
3. **Alt Text**: Always provide descriptive alt text for accessibility
4. **Grid Flexibility**: Can support 1-3 images, auto-adjusts
5. **Section Gaps**: Maintains consistent 100px gaps with adjacent sections

---

## 🔄 Future Enhancements

- [ ] Add Redux slice for Strapi integration
- [ ] Support for more than 3 images
- [ ] Add overlay captions on images
- [ ] Implement lightbox for image viewing
- [ ] Add lazy loading for images
- [ ] Support for video content

---

## 📚 Related Components

- **QuickFinds** (Previous section)
- **HospitalGrid** (Previous section)
- **Footer** (Next section)

---

**Last Updated**: Current session  
**Status**: ✅ Complete and ready for use

