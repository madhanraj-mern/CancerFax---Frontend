import api, { formatStrapiResponse } from './api';

// Navigation API
export const navigationAPI = {
  getNavigation: async () => {
    const response = await api.get('/navigation?populate=*');
    return formatStrapiResponse(response.data.data);
  },
  
  getLogo: async () => {
    const response = await api.get('/logo?populate=deep');
    return formatStrapiResponse(response.data.data);
  },

  getLanguages: async () => {
    const response = await api.get('/languages?populate=deep');
    return formatStrapiResponse(response.data.data);
  },

  getButtons: async () => {
    const response = await api.get('/navigation-buttons?populate=*');
    return formatStrapiResponse(response.data.data);
  },
};

// Hero Section API
export const heroAPI = {
  getHeroContent: async () => {
    const response = await api.get('/hero-section?populate=*');
    return formatStrapiResponse(response.data.data);
  },
  
  getSurvivorStory: async () => {
    const response = await api.get('/survivor-story?populate=*');
    return formatStrapiResponse(response.data.data);
  },
};

// About Section API
export const aboutAPI = {
  getAboutContent: async () => {
    const response = await api.get('/about-section?populate=*');
    return formatStrapiResponse(response.data.data);
  },
};

// Innovative Care API
export const innovativeCareAPI = {
  getInnovativeCare: async () => {
    const response = await api.get('/innovative-care?populate=*');
    return formatStrapiResponse(response.data.data);
  },
  
  getTherapies: async () => {
    const response = await api.get('/therapies?populate=*');
    return formatStrapiResponse(response.data.data);
  },
};

// Testimonials API
export const testimonialsAPI = {
  getTestimonials: async () => {
    const response = await api.get('/testimonials?populate=*');
    return formatStrapiResponse(response.data.data);
  },
  
  getFeaturedTestimonial: async () => {
    const response = await api.get('/testimonials?filters[featured][$eq]=true&populate=*');
    const data = formatStrapiResponse(response.data.data);
    return Array.isArray(data) ? data[0] : data;
  },
};

// Clinical Trials API
export const clinicalTrialsAPI = {
  getClinicalTrialsSection: async () => {
    const response = await api.get('/clinical-trials-section?populate=*');
    return formatStrapiResponse(response.data.data);
  },
  
  getTrialTypes: async () => {
    const response = await api.get('/trial-types?populate=*');
    return formatStrapiResponse(response.data.data);
  },
};

// How It Works API
export const howItWorksAPI = {
  getHowItWorksSection: async () => {
    const response = await api.get('/how-it-works?populate=*');
    return formatStrapiResponse(response.data.data);
  },
  
  getSteps: async () => {
    const response = await api.get('/steps?populate=*&sort=order:asc');
    return formatStrapiResponse(response.data.data);
  },
};

// Resources API
export const resourcesAPI = {
  getResourcesSection: async () => {
    const response = await api.get('/resources-section?populate=*');
    return formatStrapiResponse(response.data.data);
  },
  
  getBlogs: async (limit = 3) => {
    const response = await api.get(`/blogs?populate=*&pagination[limit]=${limit}&sort=publishedAt:desc`);
    return formatStrapiResponse(response.data.data);
  },
};

// Clinical Trials Showcase API
export const clinicalTrialsShowcaseAPI = {
  getShowcaseSlides: async () => {
    const response = await api.get('/clinical-trials-showcase?populate=deep');
    return formatStrapiResponse(response.data.data);
  },
};

// Footer API
export const footerAPI = {
  getFooterContent: async () => {
    const response = await api.get('/footer?populate=deep');
    return formatStrapiResponse(response.data.data);
  },
  
  getContactInfo: async () => {
    const response = await api.get('/contact-infos?populate=*&sort=order:asc');
    return formatStrapiResponse(response.data.data);
  },
  
  getSocialLinks: async () => {
    const response = await api.get('/social-links?populate=*&sort=order:asc');
    return formatStrapiResponse(response.data.data);
  },
  
  getLocations: async () => {
    const response = await api.get('/footer-locations?populate=*&sort=order:asc');
    return formatStrapiResponse(response.data.data);
  },
  
  getLinkColumns: async () => {
    const response = await api.get('/footer-link-columns?populate=deep&sort=order:asc');
    return formatStrapiResponse(response.data.data);
  },
};

// Get In Touch API
export const getInTouchAPI = {
  getGetInTouchSection: async () => {
    const response = await api.get('/get-in-touch-section?populate=*');
    return formatStrapiResponse(response.data.data);
  },
};

// Location Network API
export const locationNetworkAPI = {
  getLocationNetworkSection: async () => {
    const response = await api.get('/location-network-section?populate=deep');
    return formatStrapiResponse(response.data.data);
  },
  
  getHospitals: async () => {
    const response = await api.get('/hospitals?populate=*&sort=order:asc');
    return formatStrapiResponse(response.data.data);
  },
};

// Clinical Trials About API
export const clinicalTrialsAboutAPI = {
  getClinicalTrialsAboutSection: async () => {
    const response = await api.get('/clinical-trials-about-section?populate=*');
    return formatStrapiResponse(response.data.data);
  },
};

// Video Testimonials API
export const videoTestimonialsAPI = {
  getVideoTestimonialsSection: async () => {
    const response = await api.get('/video-testimonials-section?populate=*');
    return formatStrapiResponse(response.data.data);
  },
};

// General Settings API
export const settingsAPI = {
  getGeneralSettings: async () => {
    const response = await api.get('/general-setting?populate=*');
    return formatStrapiResponse(response.data.data);
  },
  
  getSEOSettings: async () => {
    const response = await api.get('/seo-setting?populate=*');
    return formatStrapiResponse(response.data.data);
  },
};

// Hospital Network API
export const hospitalNetworkAPI = {
  getHeroSection: async () => {
    const response = await api.get('/hospital-network-hero?populate=deep');
    return formatStrapiResponse(response.data.data);
  },
  
  getHospitals: async () => {
    const response = await api.get('/hospitals?populate=deep&sort=order:asc');
    return formatStrapiResponse(response.data.data);
  },
};

// Quick Finds API
export const quickFindsAPI = {
  getQuickFindsSection: async () => {
    const response = await api.get('/quick-finds-section?populate=*');
    return formatStrapiResponse(response.data.data);
  },
  
  getCountries: async () => {
    const response = await api.get('/countries?populate=*&sort=order:asc');
    return formatStrapiResponse(response.data.data);
  },
  
  getSpecialties: async () => {
    const response = await api.get('/specialties?populate=*&sort=order:asc');
    return formatStrapiResponse(response.data.data);
  },
  
  getTreatments: async () => {
    const response = await api.get('/treatments?populate=*&sort=order:asc');
    return formatStrapiResponse(response.data.data);
  },
};

// Innovation & Insights API
export const innovationInsightsAPI = {
  getSection: async () => {
    const response = await api.get('/innovation-insights-section?populate=deep');
    return formatStrapiResponse(response.data.data);
  },
  
  getImages: async () => {
    const response = await api.get('/innovation-images?populate=*&sort=order:asc');
    return formatStrapiResponse(response.data.data);
  },
  
  getStaticImages: async () => {
    const response = await api.get('/static-images?populate=*&sort=order:asc');
    return formatStrapiResponse(response.data.data);
  },
};

// Key Factors API
export const keyFactorsAPI = {
  getSection: async () => {
    const response = await api.get('/key-factors-section?populate=deep');
    return formatStrapiResponse(response.data.data);
  },
  
  getFactors: async () => {
    const response = await api.get('/key-factors?populate=*&sort=order:asc');
    return formatStrapiResponse(response.data.data);
  },
};

