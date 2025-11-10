import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { getMediaUrl } from '../../services/api';
const resolveLogoUrl = (logo) => {
  if (!logo) return null;

  if (typeof logo === 'string') {
    const trimmed = logo.trim();
    return trimmed ? getMediaUrl(trimmed) : null;
  }

  // Handle Strapi v4 media structure: { id, name, hash, url, ... }
  // When populated, logo has: { id, documentId, name, hash, url, ... }
  if (logo.url) {
    const trimmed = typeof logo.url === 'string' ? logo.url.trim() : logo.url;
    return trimmed ? getMediaUrl(trimmed) : null;
  }

  // Handle nested data.attributes.url structure
  if (logo.data?.attributes?.url) {
    const trimmed = logo.data.attributes.url?.trim?.() ?? logo.data.attributes.url;
    return trimmed ? getMediaUrl(trimmed) : null;
  }

  if (logo.attributes?.url) {
    const trimmed = logo.attributes.url?.trim?.() ?? logo.attributes.url;
    return trimmed ? getMediaUrl(trimmed) : null;
  }

  // Handle array of media objects
  if (Array.isArray(logo.data) && logo.data.length > 0) {
    const nestedUrl = logo.data[0]?.attributes?.url;
    return nestedUrl ? getMediaUrl(nestedUrl) : null;
  }

  // Handle hash-based URL construction (Strapi v4 pattern)
  // If we have hash and name, construct URL: /uploads/{hash}_{name}
  if (logo.hash && logo.name) {
    const hash = logo.hash.trim();
    const name = logo.name.trim();
    return getMediaUrl(`/uploads/${hash}_${name}`);
  }

  if (logo.logo && logo.logo !== logo) {
    return resolveLogoUrl(logo.logo);
  }

  if (logo.src) {
    return getMediaUrl(logo.src);
  }

  return null;
};

// Use environment variable for API URL, with fallback to production URL
const API_URL = process.env.REACT_APP_STRAPI_URL || 'https://cancerfax.unifiedinfotechonline.com';

// Fetch global data from pages endpoint (contains all landing page sections in dynamic_zone)
// Also fetch from /api/global for navbar and footer data
export const fetchGlobalData = createAsyncThunk(
  'global/fetchGlobalData',
  async (_, { rejectWithValue }) => {
    try {
      // Add cache-busting timestamp to ensure fresh data
      const timestamp = Date.now();
      // Fetch home page with all dynamic zone components populated
      // Use URL-encoded populate syntax for nested relations (same pattern as global API)
      const pagesPopulateUrl = `${API_URL}/api/pages?` +
        `populate%5B0%5D=dynamic_zone&` +
        `populate%5B1%5D=dynamic_zone.Therapy&` +
        `populate%5B2%5D=dynamic_zone.Therapy.featuredImage&` +
        `populate%5B3%5D=dynamic_zone.Slide&` +
        `populate%5B4%5D=dynamic_zone.Slide.featuredImage&` +
        `populate%5B5%5D=dynamic_zone.Statistics&` +
        `populate%5B6%5D=dynamic_zone.image&` +
        `populate%5B7%5D=dynamic_zone.featuredImage&` +
        `populate%5B8%5D=dynamic_zone.backgroundImage&` +
        `populate%5B9%5D=dynamic_zone.foregroundImage&` +
        `populate%5B10%5D=dynamic_zone.video&` +
        `populate%5B11%5D=dynamic_zone.featuredVideo&` +
        `populate%5B12%5D=dynamic_zone.cta&` +
        `populate%5B13%5D=dynamic_zone.Testimonials&` +
        `populate%5B14%5D=dynamic_zone.Testimonials.image&` +
        `populate%5B15%5D=dynamic_zone.Testimonials.survivor_story&` +
        `populate%5B16%5D=dynamic_zone.Testimonials.survivor_story.image&` +
        `populate%5B17%5D=dynamic_zone.Testimonials.survivor_story.backgroundImage&` +
        `populate%5B18%5D=dynamic_zone.resources&` +
        `populate%5B19%5D=dynamic_zone.resources.image&` +
        `populate%5B20%5D=dynamic_zone.resources.author&` +
        `populate%5B21%5D=dynamic_zone.resources.author.avatar&` +
        `populate%5B22%5D=dynamic_zone.Step&` +
        `populate%5B23%5D=dynamic_zone.how-it-works&` +
        `populate%5B24%5D=dynamic_zone.how-it-works.steps&` +
        `populate%5B32%5D=dynamic_zone.how-it-works.steps.icon&` +
        `populate%5B25%5D=dynamic_zone.how-it-works.featuredImage&` +
        `populate%5B26%5D=dynamic_zone.how-it-works.image&` +
        `populate%5B27%5D=dynamic_zone.how-it-works.cta&` +
        `populate%5B28%5D=dynamic_zone.hospitals&` +
        `populate%5B29%5D=dynamic_zone.hospitals.image&` +
        `populate%5B30%5D=dynamic_zone.trialTypes&` +
        `populate%5B31%5D=dynamic_zone.trialTypes.icon&` +
        `filters%5Bslug%5D%5B%24eq%5D=home&` +
        `_t=${timestamp}`;
      const pagesResponse = await axios.get(pagesPopulateUrl);
      const homePage = pagesResponse.data.data?.[0];
      
      // Fetch global data (header menu, footer, etc.) with populate
      // Based on Strapi menu guide: Global has logo, cta_label, cta_url, header_menu (relation to Menu)
      // Menu has items (relation to Menu Item), Menu Item has parent/children relationships
      // Based on Strapi API documentation: https://cancerfax.unifiedinfotechonline.com/documentation/v1.0.0#/Global/get%2Fglobal
      let globalResponse = null;
      
      try {
        // Use detailed populate syntax to deeply populate all nested footer relations
        // Using axios params for proper URL encoding
        const populateParams = {
          'populate[navbar][populate]': '*',
          'populate[footer][populate][0]': 'logo',
          'populate[footer][populate][1]': 'social_media_links',
          'populate[footer][populate][2]': 'social_media_links.image',
          'populate[footer][populate][3]': 'social_media_links.link',
          'populate[footer][populate][4]': 'footer_columns',
          'populate[footer][populate][5]': 'footer_columns.links',
          'populate[footer][populate][6]': 'locations',
          'populate[footer][populate][7]': 'locations.flag',
          'populate[footer][populate][8]': 'policy_links',
          'populate[footer][populate][9]': 'cta',
          // Alternative populate syntax for locations (relation field)
          'populate[footer][populate][locations]': '*',
          'populate[contact]': '*',
          'populate[seo]': '*',
          '_t': timestamp
        };
        console.log('🌐 Fetching global data with detailed populate syntax for footer relations');
        globalResponse = await axios.get(`${API_URL}/api/global`, { params: populateParams });
        console.log('✅ Successfully fetched global data with populated relations');
        
        const rawGlobalData = globalResponse?.data?.data || {};
        let globalData = rawGlobalData?.attributes
          ? { id: rawGlobalData.id, ...rawGlobalData.attributes }
          : rawGlobalData;
        
        // Log raw API response to see actual structure
        console.log('🔍 Raw API Response Structure:', {
          hasData: !!globalResponse?.data?.data,
          hasAttributes: !!rawGlobalData?.attributes,
          rawFooter: rawGlobalData?.attributes?.footer || rawGlobalData?.footer,
          rawFooterLocations: rawGlobalData?.attributes?.footer?.locations || rawGlobalData?.footer?.locations,
          rawFooterLocationsType: typeof (rawGlobalData?.attributes?.footer?.locations || rawGlobalData?.footer?.locations),
          rawFooterLocationsIsArray: Array.isArray(rawGlobalData?.attributes?.footer?.locations || rawGlobalData?.footer?.locations),
          rawFooterLocationsKeys: rawGlobalData?.attributes?.footer?.locations || rawGlobalData?.footer?.locations 
            ? Object.keys(rawGlobalData?.attributes?.footer?.locations || rawGlobalData?.footer?.locations) 
            : null
        });
        
        console.log('📦 Processed Global Data:', {
          hasNavbar: !!globalData?.navbar,
          hasFooter: !!globalData?.footer,
          navbarHasLogo: !!globalData?.navbar?.logo,
          footerHasLogo: !!globalData?.footer?.logo,
          navbarHasMenu: !!globalData?.navbar?.menu,
          navbarHasCta: !!globalData?.navbar?.cta,
          footerHasSocialLinks: !!(globalData?.footer?.social_media_links?.length > 0),
          footerHasColumns: !!(globalData?.footer?.footer_columns?.length > 0),
          footerHasLocations: !!(globalData?.footer?.locations?.length > 0),
          footerHasPolicyLinks: !!(globalData?.footer?.policy_links?.length > 0),
          footerHasCta: !!globalData?.footer?.cta,
          navbarKeys: globalData?.navbar ? Object.keys(globalData.navbar) : null,
          footerKeys: globalData?.footer ? Object.keys(globalData.footer) : null,
          // Detailed locations check
          footerLocations: globalData?.footer?.locations,
          footerLocationsType: typeof globalData?.footer?.locations,
          footerLocationsIsArray: Array.isArray(globalData?.footer?.locations),
          footerLocationsLength: globalData?.footer?.locations?.length || 0,
        });
        
        // Detailed logging for footer nested relations
        if (globalData?.footer) {
          console.log('🔍 Footer Nested Relations Detail:', {
            social_media_links: {
              exists: !!globalData.footer.social_media_links,
              isArray: Array.isArray(globalData.footer.social_media_links),
              length: globalData.footer.social_media_links?.length || 0,
              firstItem: globalData.footer.social_media_links?.[0] || null,
              raw: globalData.footer.social_media_links
            },
            footer_columns: {
              exists: !!globalData.footer.footer_columns,
              isArray: Array.isArray(globalData.footer.footer_columns),
              length: globalData.footer.footer_columns?.length || 0,
              firstItem: globalData.footer.footer_columns?.[0] || null,
              raw: globalData.footer.footer_columns
            },
            locations: {
              exists: !!globalData.footer.locations,
              isArray: Array.isArray(globalData.footer.locations),
              length: globalData.footer.locations?.length || 0,
              firstItem: globalData.footer.locations?.[0] || null,
              raw: globalData.footer.locations,
              // Check if locations is nested in data
              hasData: !!globalData.footer.locations?.data,
              dataIsArray: Array.isArray(globalData.footer.locations?.data),
              dataLength: globalData.footer.locations?.data?.length || 0,
              // Check all possible structures
              type: typeof globalData.footer.locations,
              keys: globalData.footer.locations ? Object.keys(globalData.footer.locations) : null
            },
            policy_links: {
              exists: !!globalData.footer.policy_links,
              isArray: Array.isArray(globalData.footer.policy_links),
              length: globalData.footer.policy_links?.length || 0,
              firstItem: globalData.footer.policy_links?.[0] || null,
              raw: globalData.footer.policy_links
            },
            logo: {
              exists: !!globalData.footer.logo,
              type: typeof globalData.footer.logo,
              isObject: typeof globalData.footer.logo === 'object' && globalData.footer.logo !== null,
              hasUrl: !!globalData.footer.logo?.url,
              url: globalData.footer.logo?.url,
              fullObject: globalData.footer.logo
            }
          });
        }
        
        // Log dynamic zone data
        if (homePage?.dynamic_zone) {
          const dz = homePage.dynamic_zone;
          console.log('📄 Dynamic Zone Data:', {
            componentCount: dz.length,
            componentsWithTherapy: dz.filter(c => c.Therapy?.length > 0).length,
            componentsWithSlide: dz.filter(c => c.Slide?.length > 0).length,
            componentsWithTestimonials: dz.filter(c => c.Testimonials?.length > 0).length,
            componentsWithResources: dz.filter(c => c.resources?.length > 0).length,
            componentsWithHospitals: dz.filter(c => c.hospitals?.length > 0).length,
            componentsWithTrialTypes: dz.filter(c => c.trialTypes?.length > 0).length,
            totalTherapyItems: dz.reduce((sum, c) => sum + (c.Therapy?.length || 0), 0),
            totalSlideItems: dz.reduce((sum, c) => sum + (c.Slide?.length || 0), 0),
            totalTestimonialsItems: dz.reduce((sum, c) => sum + (c.Testimonials?.length || 0), 0),
            totalResourcesItems: dz.reduce((sum, c) => sum + (c.resources?.length || 0), 0),
            totalHospitalsItems: dz.reduce((sum, c) => sum + (c.hospitals?.length || 0), 0),
            totalTrialTypesItems: dz.reduce((sum, c) => sum + (c.trialTypes?.length || 0), 0),
          });
        }
        
        // Debug: Log logo data structure
        console.log('🔍 Global API Response - Logo Data:', {
          navbarLogo: globalData?.navbar?.logo,
          footerLogo: globalData?.footer?.logo,
          navbarLogoType: typeof globalData?.navbar?.logo,
          footerLogoType: typeof globalData?.footer?.logo,
          navbarKeys: globalData?.navbar ? Object.keys(globalData.navbar) : null,
          footerKeys: globalData?.footer ? Object.keys(globalData.footer) : null,
          fullNavbar: globalData?.navbar,
          fullFooter: globalData?.footer,
        });
        
        // If navbar/footer only have IDs (not populated), try to fetch logo from media library
        // Check if navbar/footer have logo IDs that we can use to fetch the media
        let navbarLogoData = globalData?.navbar?.logo;
        let footerLogoData = globalData?.footer?.logo;
        
        // If logo is just an ID (number), try to fetch the media object
        if (navbarLogoData && typeof navbarLogoData === 'number') {
          try {
            console.log('🔄 Fetching navbar logo from media library, ID:', navbarLogoData);
            const mediaResponse = await axios.get(`${API_URL}/api/upload/files/${navbarLogoData}?_t=${timestamp}`);
            if (mediaResponse?.data) {
              navbarLogoData = mediaResponse.data;
              globalData.navbar = { ...globalData.navbar, logo: navbarLogoData };
              console.log('✅ Successfully fetched navbar logo from media library');
            }
          } catch (mediaError) {
            console.warn('⚠️ Failed to fetch navbar logo from media library:', mediaError.message);
          }
        }
        
        if (footerLogoData && typeof footerLogoData === 'number') {
          try {
            console.log('🔄 Fetching footer logo from media library, ID:', footerLogoData);
            const mediaResponse = await axios.get(`${API_URL}/api/upload/files/${footerLogoData}?_t=${timestamp}`);
            if (mediaResponse?.data) {
              footerLogoData = mediaResponse.data;
              globalData.footer = { ...globalData.footer, logo: footerLogoData };
              console.log('✅ Successfully fetched footer logo from media library');
            }
          } catch (mediaError) {
            console.warn('⚠️ Failed to fetch footer logo from media library:', mediaError.message);
          }
        }
        
        // Return populated global data
        // Structure matches /api/global response: navbar, footer, contact, etc.
        let navbarLogoUrl = resolveLogoUrl(navbarLogoData || null);
        let footerLogoUrl = resolveLogoUrl(footerLogoData || null);
        let globalLogoUrl = resolveLogoUrl(globalData?.logo || null);
        
        // Fallback: If logo URLs are still null, use the known logo URL from Strapi
        // This is a temporary workaround until we can get the populate syntax working
        const knownLogoUrl = `${API_URL}/uploads/logo_851ef64fcb.png`;
        if (!navbarLogoUrl && !footerLogoUrl && !globalLogoUrl) {
          console.warn('⚠️ No logo URLs resolved, using known logo URL as fallback:', knownLogoUrl);
          navbarLogoUrl = knownLogoUrl;
          footerLogoUrl = knownLogoUrl;
        } else if (!navbarLogoUrl) {
          navbarLogoUrl = footerLogoUrl || globalLogoUrl || knownLogoUrl;
        } else if (!footerLogoUrl) {
          footerLogoUrl = navbarLogoUrl || globalLogoUrl || knownLogoUrl;
        }
        
        // Debug: Log resolved URLs
        console.log('✅ Resolved Logo URLs:', {
          navbarLogoUrl,
          footerLogoUrl,
          globalLogoUrl,
        });

        return {
          ...globalData,
          dynamicZone: homePage?.dynamic_zone || [],
          seo: globalData.seo || null,
          navbar: globalData.navbar || null,
          logo: globalData.logo || null,
          footer: globalData.footer || null,
          contact: globalData.contact || null,
          social_media_links: globalData.social_media_links || null,
          navbarLogoUrl,
          footerLogoUrl,
          globalLogoUrl,
        };
      } catch (globalError) {
        console.warn('⚠️ Failed to fetch global endpoint with structured populate, trying populate=*:', globalError);
        // Fallback to populate=* if specific populate fails
        try {
          const fallbackUrl = `${API_URL}/api/global?populate=*&_t=${timestamp}`;
          console.log('🔄 Trying fallback populate=* URL:', fallbackUrl);
          globalResponse = await axios.get(fallbackUrl);
          const rawGlobalDataFallback = globalResponse?.data?.data || {};
          const globalData = rawGlobalDataFallback?.attributes
            ? { id: rawGlobalDataFallback.id, ...rawGlobalDataFallback.attributes }
            : rawGlobalDataFallback;
          
          console.log('🔍 Fallback API Response - Logo Data:', {
            navbarLogo: globalData?.navbar?.logo,
            footerLogo: globalData?.footer?.logo,
            navbarLogoType: typeof globalData?.navbar?.logo,
            footerLogoType: typeof globalData?.footer?.logo,
            navbarKeys: globalData?.navbar ? Object.keys(globalData.navbar) : null,
            footerKeys: globalData?.footer ? Object.keys(globalData.footer) : null,
            // Full structures for debugging
            fullNavbar: globalData?.navbar,
            fullFooter: globalData?.footer,
            // Check if logo exists but in different structure
            navbarLogoFull: globalData?.navbar?.logo,
            footerLogoFull: globalData?.footer?.logo,
          });
          
          let navbarLogoUrl = resolveLogoUrl(globalData?.navbar?.logo || null);
          let footerLogoUrl = resolveLogoUrl(globalData?.footer?.logo || null);
          let globalLogoUrl = resolveLogoUrl(globalData?.logo || null);
          
          // Fallback: If logo URLs are still null, use the known logo URL from Strapi
          const knownLogoUrl = `${API_URL}/uploads/logo_851ef64fcb.png`;
          if (!navbarLogoUrl && !footerLogoUrl && !globalLogoUrl) {
            console.warn('⚠️ No logo URLs resolved in fallback, using known logo URL:', knownLogoUrl);
            navbarLogoUrl = knownLogoUrl;
            footerLogoUrl = knownLogoUrl;
          } else if (!navbarLogoUrl) {
            navbarLogoUrl = footerLogoUrl || globalLogoUrl || knownLogoUrl;
          } else if (!footerLogoUrl) {
            footerLogoUrl = navbarLogoUrl || globalLogoUrl || knownLogoUrl;
          }
          
          console.log('✅ Fallback Resolved Logo URLs:', {
            navbarLogoUrl,
            footerLogoUrl,
            globalLogoUrl,
          });

          return {
            ...globalData,
            dynamicZone: homePage?.dynamic_zone || [],
            seo: globalData.seo || null,
            navbar: globalData.navbar || null,
            logo: globalData.logo || null,
            footer: globalData.footer || null,
            contact: globalData.contact || null,
            social_media_links: globalData.social_media_links || null,
            navbarLogoUrl,
            footerLogoUrl,
            globalLogoUrl,
          };
        } catch (fallbackError) {
          console.warn('Failed to fetch global endpoint:', fallbackError);
          // Continue without global data if it fails
          return {
            dynamicZone: homePage?.dynamic_zone || [],
            seo: null,
            navbar: null,
            logo: null,
            footer: null,
            contact: null,
            social_media_links: null,
          };
        }
      }
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch global data');
    }
  }
);

// Fetch page by slug (for dynamic pages like /about-us, /contact, etc.)
// This automatically works for ANY slug added in Strapi - no code changes needed!
export const fetchPageBySlug = createAsyncThunk(
  'global/fetchPageBySlug',
  async (slug, { rejectWithValue }) => {
    try {
      // Normalize slug: trim and encode for URL
      const normalizedSlug = slug ? slug.trim() : '';
      
      // Fetch page with all dynamic zone components populated (same populate as home)
        const populateQuery = `populate[0]=dynamic_zone&populate[1]=dynamic_zone.Therapy&populate[2]=dynamic_zone.Therapy.featuredImage&populate[3]=dynamic_zone.Slide&populate[4]=dynamic_zone.Slide.featuredImage&populate[5]=dynamic_zone.Statistics&populate[6]=dynamic_zone.image&populate[7]=dynamic_zone.featuredImage&populate[8]=dynamic_zone.backgroundImage&populate[9]=dynamic_zone.foregroundImage&populate[10]=dynamic_zone.video&populate[11]=dynamic_zone.featuredVideo&populate[12]=dynamic_zone.cta&populate[13]=dynamic_zone.Testimonials&populate[14]=dynamic_zone.Testimonials.image&populate[15]=dynamic_zone.Testimonials.survivor_story&populate[16]=dynamic_zone.Testimonials.survivor_story.image&populate[17]=dynamic_zone.Testimonials.survivor_story.backgroundImage&populate[18]=dynamic_zone.resources&populate[19]=dynamic_zone.resources.image&populate[20]=dynamic_zone.resources.author&populate[21]=dynamic_zone.resources.author.avatar&populate[22]=dynamic_zone.Step&populate[23]=dynamic_zone.how-it-works&populate[24]=dynamic_zone.how-it-works.steps&populate[25]=dynamic_zone.how-it-works.steps.icon&populate[26]=dynamic_zone.how-it-works.featuredImage&populate[27]=dynamic_zone.how-it-works.image&populate[28]=dynamic_zone.how-it-works.cta&populate[29]=dynamic_zone.hospitals&populate[30]=dynamic_zone.hospitals.image&populate[31]=dynamic_zone.trialTypes&populate[32]=dynamic_zone.trialTypes.icon&populate[33]=seo`;
      
      // Add cache-busting timestamp to ensure fresh data
      const timestamp = Date.now();
      // Query Strapi for page with matching slug - works for ANY slug value
      const apiUrl = `${API_URL}/api/pages?${populateQuery}&filters[slug][$eq]=${encodeURIComponent(normalizedSlug)}&_t=${timestamp}`;
      console.log('fetchPageBySlug: Fetching page with slug:', normalizedSlug);
      
      const pagesResponse = await axios.get(apiUrl);
      
      const page = pagesResponse.data.data?.[0];
      
      if (!page) {
        console.warn('fetchPageBySlug: No page found for slug:', normalizedSlug);
        return rejectWithValue({ status: 404, message: `Page with slug "${normalizedSlug}" not found` });
      }
      
      console.log('fetchPageBySlug: Page found!', {
        slug: normalizedSlug,
        pageId: page?.id,
        hasDynamicZone: !!page?.dynamic_zone,
        componentCount: page?.dynamic_zone?.length || 0
      });
      
      // Handle both Strapi v4 structure (attributes) and direct structure
      // API returns: { id, slug, dynamic_zone, seo, ... } directly
      const pageAttributes = page?.attributes || page;
      
      // Return page data similar to fetchGlobalData structure
      // This structure works for ANY page created in Strapi
      return {
        dynamicZone: pageAttributes?.dynamic_zone || pageAttributes?.dynamicZone || [],
        seo: pageAttributes?.seo || null,
        slug: pageAttributes?.slug || page?.slug || normalizedSlug,
        pageId: page?.id || null,
      };
    } catch (error) {
      if (error.response?.status === 404 || !error.response?.data?.data?.[0]) {
        return rejectWithValue({ status: 404, message: 'Page not found' });
      }
      return rejectWithValue(error.response?.data || 'Failed to fetch page');
    }
  }
);

const globalSlice = createSlice({
  name: 'global',
  initialState: {
    data: null,
    pageData: null, // For dynamic pages
    loading: false,
    pageLoading: false, // For dynamic page loading
    error: null,
    pageError: null, // For dynamic page errors
  },
  reducers: {
    clearPageData: (state) => {
      state.pageData = null;
      state.pageError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGlobalData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchGlobalData.fulfilled, (state, action) => {
        state.loading = false;
        // Always update data to ensure fresh content from Strapi
        state.data = action.payload;
        console.log('✅ Global data updated in Redux store', {
          timestamp: new Date().toISOString(),
          hasDynamicZone: !!action.payload?.dynamicZone,
          dynamicZoneLength: action.payload?.dynamicZone?.length || 0
        });
      })
      .addCase(fetchGlobalData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchPageBySlug.pending, (state) => {
        state.pageLoading = true;
        state.pageError = null;
      })
      .addCase(fetchPageBySlug.fulfilled, (state, action) => {
        state.pageLoading = false;
        state.pageData = action.payload;
        state.pageError = null;
      })
      .addCase(fetchPageBySlug.rejected, (state, action) => {
        state.pageLoading = false;
        state.pageError = action.payload;
        state.pageData = null;
      });
  },
});

export const { clearPageData } = globalSlice.actions;

export default globalSlice.reducer;

