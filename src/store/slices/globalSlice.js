import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

// Use environment variable for API URL, with fallback to production URL
// const API_URL = process.env.REACT_APP_STRAPI_URL || 'https://cancerfax.unifiedinfotechonline.com';
   const API_URL = 'https://abc.unifiedinfotechonline.com';


// Fetch global data from pages endpoint (contains all landing page sections in dynamic_zone)
// Also fetch from /api/global for navbar and footer data
export const fetchGlobalData = createAsyncThunk(
  'global/fetchGlobalData',
  async (_, { rejectWithValue }) => {
    try {
      // Add cache-busting timestamp to ensure fresh data
      const timestamp = Date.now();
      // Fetch home page with all dynamic zone components populated
      // Use populate=deep or wildcard to get all nested relations
      const pagesResponse = await axios.get(`${API_URL}/api/pages?populate[0]=dynamic_zone&populate[1]=dynamic_zone.Therapy&populate[2]=dynamic_zone.Therapy.featuredImage&populate[3]=dynamic_zone.Slide&populate[4]=dynamic_zone.Slide.featuredImage&populate[5]=dynamic_zone.Statistics&populate[6]=dynamic_zone.image&populate[7]=dynamic_zone.featuredImage&populate[8]=dynamic_zone.backgroundImage&populate[9]=dynamic_zone.foregroundImage&populate[10]=dynamic_zone.video&populate[11]=dynamic_zone.featuredVideo&populate[12]=dynamic_zone.cta&populate[13]=dynamic_zone.Testimonials&populate[14]=dynamic_zone.Testimonials.image&populate[15]=dynamic_zone.Testimonials.survivor_story&populate[16]=dynamic_zone.Testimonials.survivor_story.image&populate[17]=dynamic_zone.Testimonials.survivor_story.backgroundImage&populate[18]=dynamic_zone.resources&populate[19]=dynamic_zone.resources.image&populate[20]=dynamic_zone.resources.author&populate[21]=dynamic_zone.resources.author.avatar&populate[22]=dynamic_zone.Step&populate[23]=dynamic_zone.hospitals&populate[24]=dynamic_zone.hospitals.image&populate[25]=dynamic_zone.trialTypes&populate[26]=dynamic_zone.trialTypes.icon&filters[slug][$eq]=home&_t=${timestamp}`);
      const homePage = pagesResponse.data.data?.[0];
      
      // Fetch global data (header menu, footer, etc.) with populate
      // Based on Strapi menu guide: Global has logo, cta_label, cta_url, header_menu (relation to Menu)
      // Menu has items (relation to Menu Item), Menu Item has parent/children relationships
      // Based on Strapi API documentation: https://cancerfax.unifiedinfotechonline.com/documentation/v1.0.0#/Global/get%2Fglobal
      let globalResponse = null;
      
      try {
        // Populate according to actual API structure from /api/global:
        // Based on API response structure: navbar, footer, contact, social_media_links, etc.
        const populateUrl = `${API_URL}/api/global?` +
          `populate[logo]=*&` +
          `populate[navbar][populate][0]=logo&` +
          `populate[navbar][populate][1]=cta&` +
          `populate[footer][populate][0]=logo&` +
          `populate[footer][populate][1]=cta&` +
          `populate[footer][populate][2]=social_media_links&` +
          `populate[footer][populate][3]=social_media_links.image&` +
          `populate[footer][populate][4]=social_media_links.link&` +
          `populate[footer][populate][5]=footer_columns&` +
          `populate[footer][populate][6]=footer_columns.links&` +
          `populate[footer][populate][7]=locations&` +
          `populate[footer][populate][8]=policy_links&` +
          `populate[contact]=*&` +
          `populate[seo]=*&` +
          `_t=${timestamp}`;
        
        globalResponse = await axios.get(populateUrl);
        const globalData = globalResponse?.data?.data || {};
        
        // Return populated global data
        // Structure matches /api/global response: navbar, footer, contact, etc.
        return {
          dynamicZone: homePage?.dynamic_zone || [],
          seo: globalData.seo || null,
          navbar: globalData.navbar || null,
          logo: globalData.logo || null,
          footer: globalData.footer || null,
          contact: globalData.contact || null,
          social_media_links: globalData.social_media_links || null,
          // Store all global data for easy access
          ...globalData,
        };
      } catch (globalError) {
        console.warn('Failed to fetch global endpoint with structured populate, trying populate=*:', globalError);
        // Fallback to populate=* if specific populate fails
        try {
          globalResponse = await axios.get(`${API_URL}/api/global?populate=*&_t=${timestamp}`);
          const globalData = globalResponse?.data?.data || {};
          
          return {
            dynamicZone: homePage?.dynamic_zone || [],
            seo: globalData.seo || null,
            navbar: globalData.navbar || null,
            logo: globalData.logo || null,
            footer: globalData.footer || null,
            contact: globalData.contact || null,
            social_media_links: globalData.social_media_links || null,
            // Store all global data
            ...globalData,
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
      const populateQuery = `populate[0]=dynamic_zone&populate[1]=dynamic_zone.Therapy&populate[2]=dynamic_zone.Therapy.featuredImage&populate[3]=dynamic_zone.Slide&populate[4]=dynamic_zone.Slide.featuredImage&populate[5]=dynamic_zone.Statistics&populate[6]=dynamic_zone.image&populate[7]=dynamic_zone.featuredImage&populate[8]=dynamic_zone.backgroundImage&populate[9]=dynamic_zone.foregroundImage&populate[10]=dynamic_zone.video&populate[11]=dynamic_zone.featuredVideo&populate[12]=dynamic_zone.cta&populate[13]=dynamic_zone.Testimonials&populate[14]=dynamic_zone.Testimonials.image&populate[15]=dynamic_zone.Testimonials.survivor_story&populate[16]=dynamic_zone.Testimonials.survivor_story.image&populate[17]=dynamic_zone.Testimonials.survivor_story.backgroundImage&populate[18]=dynamic_zone.resources&populate[19]=dynamic_zone.resources.image&populate[20]=dynamic_zone.resources.author&populate[21]=dynamic_zone.resources.author.avatar&populate[22]=dynamic_zone.Step&populate[23]=dynamic_zone.hospitals&populate[24]=dynamic_zone.hospitals.image&populate[25]=dynamic_zone.trialTypes&populate[26]=dynamic_zone.trialTypes.icon&populate[27]=seo`;
      
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
        state.data = action.payload;
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

