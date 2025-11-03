import { getMediaUrl } from '../services/api';

/**
 * Extract a component from dynamic_zone array by component type
 * @param {object} globalData - The global data object with dynamicZone array
 * @param {string} componentType - The component type to find (e.g., 'dynamic-zone.hero')
 * @returns {object|null} The component data or null
 */
export const getDynamicZoneComponent = (globalData, componentType) => {
  if (!globalData || !globalData.dynamicZone) return null;
  
  const component = globalData.dynamicZone.find(
    (item) => item.__component === componentType
  );
  
  return component || null;
};

/**
 * Helper function to extract section data from global Strapi response
 * Tries multiple possible data structure paths (legacy support + new dynamic_zone)
 */
export const getSectionData = (globalData, sectionKey) => {
  if (!globalData) return null;
  
  // First try dynamic zone structure (new)
  const componentTypeMap = {
    'hero': 'dynamic-zone.hero',
    'about': 'dynamic-zone.about',
    'innovativeCare': 'dynamic-zone.therapy-section',
    'therapySection': 'dynamic-zone.therapy-section',
    'testimonials': 'dynamic-zone.testimonials',
    'testimonialSlider': 'dynamic-zone.testimonial-slider',
    'clinicalTrialsShowcase': 'dynamic-zone.slider-section',
    'sliderSection': 'dynamic-zone.slider-section',
    'getInTouch': 'dynamic-zone.get-in-touch',
    'location': 'dynamic-zone.location',
    'howItWorks': 'dynamic-zone.how-it-works',
    'resources': 'dynamic-zone.resources',
    'clinicalTrials': 'dynamic-zone.trials-section',
    'statistics': 'dynamic-zone.statistics',
  };
  
  const componentType = componentTypeMap[sectionKey];
  if (componentType && globalData.dynamicZone) {
    const component = getDynamicZoneComponent(globalData, componentType);
    if (component) return component;
  }
  
  // Fallback to legacy structure
  const section = globalData[`${sectionKey}Section`]?.data?.attributes 
    || globalData[sectionKey]?.data?.attributes
    || globalData[`${sectionKey}Section`]
    || globalData[sectionKey]
    || null;
    
  return section;
};

/**
 * Helper function to extract collection data from global Strapi response
 * Works with both dynamic_zone components and legacy structure
 */
export const getCollectionData = (globalData, collectionKey) => {
  if (!globalData) return [];
  
  // Map collection keys to dynamic zone component properties
  const collectionMap = {
    'therapies': { component: 'dynamic-zone.therapy-section', prop: 'Therapy' },
    'statistics': { component: 'dynamic-zone.statistics', prop: 'Statistics' },
    'clinicalTrialsShowcase': { component: 'dynamic-zone.slider-section', prop: 'Slide' },
    'testimonials': { component: 'dynamic-zone.testimonials', prop: 'Testimonials' },
    'testimonialSlider': { component: 'dynamic-zone.testimonial-slider', prop: 'Testimonials' },
  };
  
  // Try dynamic zone structure first
  if (globalData.dynamicZone && collectionMap[collectionKey]) {
    const { component: componentType, prop } = collectionMap[collectionKey];
    const component = getDynamicZoneComponent(globalData, componentType);
    if (component && component[prop]) {
      return Array.isArray(component[prop]) ? component[prop] : [];
    }
  }
  
  // Fallback to legacy structure
  const collection = globalData[collectionKey]?.data 
    || globalData[collectionKey]
    || [];
    
  return Array.isArray(collection) ? collection : [];
};

/**
 * Helper function to format media/image from Strapi response
 */
export const formatMedia = (media) => {
  if (!media) return null;
  return getMediaUrl(media);
};

/**
 * Format RichText array from Strapi to plain text
 * Handles Strapi's RichText format: [{ type: 'paragraph', children: [{ text: '...', type: 'text' }] }]
 * @param {Array|string} richText - RichText array or plain string
 * @returns {string} Plain text string
 */
export const formatRichText = (richText) => {
  if (!richText) return '';
  
  // If it's already a string, return it
  if (typeof richText === 'string') return richText;
  
  // If it's an array (RichText format), extract text
  if (Array.isArray(richText)) {
    return richText
      .map((block) => {
        if (block.children) {
          return block.children
            .filter((child) => child.type === 'text')
            .map((child) => child.text)
            .join('');
        }
        return block.text || '';
      })
      .filter(Boolean)
      .join('\n');
  }
  
  return '';
};

/**
 * Helper function to format Strapi component data
 * Handles both direct attributes and nested data.attributes
 */
export const formatComponent = (component) => {
  if (!component) return null;
  
  if (Array.isArray(component)) {
    return component.map(item => formatComponent(item));
  }
  
  // If it has attributes, extract them
  if (component.attributes) {
    return {
      id: component.id,
      ...component.attributes,
    };
  }
  
  return component;
};

/**
 * Helper function to get nested relationship data
 */
export const getRelatedData = (section, relationKey) => {
  if (!section) return null;
  
  const relation = section[relationKey]?.data || section[relationKey];
  
  if (Array.isArray(relation)) {
    return relation.map(item => ({
      id: item.id,
      ...(item.attributes || item),
    }));
  }
  
  if (relation) {
    return {
      id: relation.id,
      ...(relation.attributes || relation),
    };
  }
  
  return null;
};

