# Strapi Data Usage Verification Report

## ❌ Issues Found - Hardcoded Elements

### 1. Hero Component
**Issue**: Hardcoded background image in styled component
- Line 17: `url('https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1920')`
- Line 40: Same hardcoded URL in mobile media query
**Fix Needed**: Remove hardcoded URL from styled component, only use dynamic style prop

### 2. GetInTouch Component
**Issue**: Hardcoded background image in styled component
- Line 36: `background: url('https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1920')`
**Fix Needed**: Extract background image from Strapi and apply dynamically

### 3. Testimonials Component
**Issue**: Hardcoded background image in styled component
- Lines 14, 30: `url('https://images.unsplash.com/photo-1579154204845-e59e40d2c79f?w=1920')`
**Fix Needed**: Remove hardcoded URL, use Strapi image if available

### 4. ClinicalTrialsAbout Component
**Issue**: 
- Not extracting images from statistics section properly
- Using old content structure instead of statisticsSection
- Hardcoded fallback paths: `/images/background.png`, `/images/Attached_image.png`
**Fix Needed**: Extract backgroundImage and foregroundImage from statisticsSection

### 5. Footer Component
**Issue**: Using emoji icon instead of actual logo image
- Line 828: `<LogoIcon>{footerContent.logoIcon}</LogoIcon>`
- Should use: `footerContent.logo` (already extracted from Strapi but not used)
**Fix Needed**: Use logo image from Strapi instead of emoji

### 6. HowItWorks Component
**Issue**: IconType fallback - currently uses hardcoded icon types
**Status**: ✅ This is acceptable - icons are component-based, not from Strapi (unless Strapi provides iconType field)

---

## ✅ Currently Using Strapi Data Correctly

### Hero
- ✅ Background image: Extracted from `heroSection.image` and applied via style prop
- ✅ Heading, sub_heading, description: ✅
- ✅ CTA buttons: ✅

### ClinicalTrialsShowcase
- ✅ Background images: Extracted from `slide.featuredImage` or `slide.backgroundImage`
- ✅ Headings, descriptions, buttons: ✅

### AboutSection
- ✅ Image: Extracted from `aboutSection.image`
- ✅ Headings, descriptions: ✅
- ✅ Statistics: ✅

### InnovativeCare
- ✅ Card images: Extracted from `therapy.featuredImage` or `therapy.image`
- ✅ Headings, descriptions: ✅

### GetInTouch
- ✅ Headings, descriptions, button: ✅
- ❌ Background image: Hardcoded in styled component

### LocationNetwork
- ✅ Headings, descriptions: ✅
- ⚠️ Hospitals: Not from pages API (uses separate endpoint - acceptable)

### HowItWorks
- ✅ Image: Extracted from `howItWorksSection.image`
- ✅ Headings, steps: ✅
- ✅ Icon types: Extracted from `step.iconType`

### VideoTestimonials
- ✅ Background image: Extracted from `videoTestimonialsSection.featuredVideo`
- ✅ Headings: ✅

### Resources
- ✅ Images: Extracted from `resource.image`
- ✅ Author avatars: Extracted from `resource.author.avatar`
- ✅ Headings, content: ✅

### ClinicalTrialsAbout
- ❌ Images: Not properly extracted from statistics section
- ✅ Headings, descriptions: ✅

### Footer
- ✅ Description, copyright, links: ✅
- ✅ Social media icons: Extracted from `globalFooter.social_media_links[].image`
- ❌ Logo: Using emoji instead of image

### ClinicalTrials
- ✅ Headings, descriptions: ✅
- ⚠️ Trial types: Not from pages API (uses separate endpoint - acceptable)

---

## 🔧 Required Fixes

1. Fix Hero background image in styled component
2. Fix GetInTouch background image extraction from Strapi
3. Fix Testimonials background image
4. Fix ClinicalTrialsAbout images extraction
5. Fix Footer logo to use image instead of emoji



