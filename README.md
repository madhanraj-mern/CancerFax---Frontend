# CancerFax Frontend

A modern, responsive React application for CancerFax - connecting patients to advanced cancer treatments and clinical trials worldwide.

## 🎨 Design

This application is built to match the Figma design specifications exactly:
- **Colors**: Primary (#36454F), Pink (#FF69B4), Background (#F8F8F8)
- **Typography**: Montserrat (headings), Be Vietnam Pro (body text)
- **Layout**: Desktop-first responsive design (1440px base width)

## 🚀 Features

- **Hero Section**: Engaging introduction with background imagery
- **Innovative Care**: Showcase of breakthrough therapy options
- **Clinical Trials**: Browse and explore ongoing clinical trials
- **Testimonials**: Real patient stories and experiences
- **How It Works**: Step-by-step journey explanation
- **Resources**: Latest cancer research insights and blog posts
- **Global Network**: Partner hospitals and locations worldwide

## 🛠️ Tech Stack

- **React 18**: Modern React with hooks
- **Redux Toolkit**: State management for content
- **Styled Components**: CSS-in-JS styling matching Figma design
- **Axios**: HTTP client for Strapi CMS integration
- **React Router**: Client-side routing

## 📦 Installation

```bash
# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build
```

## 🏗️ Project Structure

```
src/
├── components/
│   ├── Navigation/       # Top navigation bar
│   ├── Hero/            # Hero section with story card
│   ├── InnovativeCare/  # Therapy cards section
│   ├── Testimonials/    # Patient testimonials
│   ├── AboutSection/    # About CancerFax
│   ├── ClinicalTrials/  # Clinical trials showcase
│   ├── HowItWorks/      # Process steps
│   ├── Resources/       # Blog and resources
│   └── Footer/          # Footer with links
├── pages/
│   └── LandingPage.jsx  # Main landing page
├── store/
│   ├── index.js         # Redux store configuration
│   └── slices/          # Redux slices
├── theme/
│   └── index.js         # Theme configuration
├── App.js
└── index.js
```

## 🎯 Redux Store

The application uses Redux Toolkit for state management with the following slices:

- **contentSlice**: Manages therapies, clinical trials, and blog content

## 🔗 Strapi CMS Integration

✅ **FULLY INTEGRATED** - The application is ready for Strapi CMS!

### Quick Start
1. **Read**: `STRAPI_INTEGRATION_COMPLETE.md` - Complete overview
2. **Follow**: `STRAPI_CHECKLIST.md` - Step-by-step setup
3. **Reference**: `STRAPI_CONTENT_TYPES.md` - All content type specs

### Environment Setup
```env
REACT_APP_STRAPI_URL=http://localhost:1337
REACT_APP_API_URL=http://localhost:1337/api
```

### What's Included
- ✅ 9 Redux slices for all content
- ✅ Complete API integration
- ✅ 20 content type specifications
- ✅ Image management system
- ✅ Fallback content for offline mode
- ✅ Comprehensive documentation

See documentation section below for all guides.

## 📱 Responsive Design

The application is responsive and adapts to:
- Desktop (1440px+)
- Tablet (768px - 1023px)
- Mobile (320px - 767px)

## 🎨 Design Tokens

All design tokens from Figma are defined in `src/theme/index.js`:
- Colors
- Typography
- Spacing
- Border Radius
- Shadows
- Breakpoints

## 🚀 Deployment

```bash
# Build production bundle
npm run build

# The build folder is ready to be deployed
```

## 📝 Development Guidelines

1. **Components**: Each component is self-contained with styled-components
2. **Naming**: Use PascalCase for components, camelCase for functions
3. **Styling**: Follow the Figma design system strictly
4. **State**: Use Redux for global state, local state for component-specific data
5. **Assets**: Use placeholder images from Unsplash, replace with actual assets

## 📚 Documentation

### Quick Start Guides
- **`STRAPI_INTEGRATION_COMPLETE.md`** ⭐ - **START HERE** - Complete overview
- **`STRAPI_QUICK_LIST.md`** - Quick reference list of everything
- `INSTALLATION.md` - Installation and setup instructions
- `GETTING_STARTED.md` - Feature guide and usage
- `QUICK_START.md` - Quick reference guide

### Strapi CMS Integration
- `STRAPI_CHECKLIST.md` - Step-by-step setup checklist (20 content types)
- `STRAPI_CONTENT_TYPES.md` - Detailed content type specifications
- `STRAPI_IMAGE_GUIDE.md` - Image requirements, optimization, and upload
- `COMPONENT_PLACEHOLDER_REFERENCE.md` - Logo and image placeholder locations
- `STRAPI_INTEGRATION_SUMMARY.md` - Technical integration details
- `INNOVATIVE_CARE_STRAPI_INTEGRATION.md` - Innovative Care section dynamic content guide
- `CLINICAL_TRIALS_STRAPI_INTEGRATION.md` - Clinical Trials (Global Breakthroughs) section complete integration guide
- `CLINICAL_TRIALS_INTEGRATION_QUICK_GUIDE.md` - Quick start guide for Clinical Trials Strapi setup

### Styling & CSS
- `CSS_FIXES.md` - CSS fixes and alignment documentation
- `INNOVATIVE_CARE_MOBILE_RESPONSIVE.md` - Mobile responsive design guide
- `TESTIMONIALS_TYPOGRAPHY_UPDATE.md` - Testimonials typography and mobile responsive guide
- `CLINICAL_TRIALS_ABOUT_SECTION.md` - Clinical Trials About section documentation
- `CLINICAL_TRIALS_REDESIGN.md` - Global Breakthroughs section redesign guide
- `GET_IN_TOUCH_SECTION.md` - Get In Touch CTA section complete guide
- `GET_IN_TOUCH_MOBILE_RESPONSIVE.md` - Get In Touch mobile responsive design guide
- `LOCATION_NETWORK_SECTION.md` - Interactive hospital location network section guide
- `LOCATION_NETWORK_STRAPI_INTEGRATION.md` - Location Network Strapi CMS integration with uploadable map background

## 🔧 Available Scripts

- `npm start`: Run development server
- `npm build`: Create production build
- `npm test`: Run tests
- `npm eject`: Eject from Create React App

## 📄 License

Copyright © 2025 CancerFax. All rights reserved.

## 🤝 Contributing

This is a proprietary project. Please contact the development team for contribution guidelines.

## 📞 Support

For questions or support, contact: info@cancerfax.com
