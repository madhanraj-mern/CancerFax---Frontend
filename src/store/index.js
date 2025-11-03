import { configureStore } from '@reduxjs/toolkit';
import contentReducer from './slices/contentSlice';
import navigationReducer from './slices/navigationSlice';
import heroReducer from './slices/heroSlice';
import aboutReducer from './slices/aboutSlice';
import therapiesReducer from './slices/therapiesSlice';
import testimonialsReducer from './slices/testimonialsSlice';
import clinicalTrialsReducer from './slices/clinicalTrialsSlice';
import clinicalTrialsShowcaseReducer from './slices/clinicalTrialsShowcaseSlice';
import clinicalTrialsAboutReducer from './slices/clinicalTrialsAboutSlice';
import videoTestimonialsReducer from './slices/videoTestimonialsSlice';
import howItWorksReducer from './slices/howItWorksSlice';
import resourcesReducer from './slices/resourcesSlice';
import getInTouchReducer from './slices/getInTouchSlice';
import locationNetworkReducer from './slices/locationNetworkSlice';
import footerReducer from './slices/footerSlice';
import hospitalNetworkReducer from './slices/hospitalNetworkSlice';
import quickFindsReducer from './slices/quickFindsSlice';
import innovationInsightsReducer from './slices/innovationInsightsSlice';
import keyFactorsReducer from './slices/keyFactorsSlice';
import contactReducer from './slices/contactSlice';
import contactFormReducer from './slices/contactFormSlice';
import partnerHospitalsReducer from './slices/partnerHospitalsSlice';
import dedicatedSupportReducer from './slices/dedicatedSupportSlice';
import successStoriesReducer from './slices/successStoriesSlice';
import faqReducer from './slices/faqSlice';
import globalReducer from './slices/globalSlice';

const store = configureStore({
  reducer: {
    content: contentReducer, // Keep for backward compatibility
    navigation: navigationReducer,
    hero: heroReducer,
    about: aboutReducer,
    therapies: therapiesReducer,
    testimonials: testimonialsReducer,
    clinicalTrials: clinicalTrialsReducer,
    clinicalTrialsShowcase: clinicalTrialsShowcaseReducer,
    clinicalTrialsAbout: clinicalTrialsAboutReducer,
    videoTestimonials: videoTestimonialsReducer,
    howItWorks: howItWorksReducer,
    resources: resourcesReducer,
    getInTouch: getInTouchReducer,
    locationNetwork: locationNetworkReducer,
    footer: footerReducer,
    hospitalNetwork: hospitalNetworkReducer,
    quickFinds: quickFindsReducer,
    innovationInsights: innovationInsightsReducer,
    keyFactors: keyFactorsReducer,
    contact: contactReducer,
    contactForm: contactFormReducer,
    partnerHospitals: partnerHospitalsReducer,
    dedicatedSupport: dedicatedSupportReducer,
    successStories: successStoriesReducer,
    faq: faqReducer,
    global: globalReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;

