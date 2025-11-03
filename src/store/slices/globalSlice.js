import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'https://cancerfax.unifiedinfotechonline.com';

// Fetch global data from pages endpoint (contains all landing page sections in dynamic_zone)
// Also fetch from /api/global for navbar and footer data
export const fetchGlobalData = createAsyncThunk(
  'global/fetchGlobalData',
  async (_, { rejectWithValue }) => {
    try {
      // Fetch home page with all dynamic zone components populated
      // Use populate=deep or wildcard to get all nested relations
      const pagesResponse = await axios.get(`${API_URL}/api/pages?populate[0]=dynamic_zone&populate[1]=dynamic_zone.Therapy&populate[2]=dynamic_zone.Therapy.featuredImage&populate[3]=dynamic_zone.Slide&populate[4]=dynamic_zone.Slide.featuredImage&populate[5]=dynamic_zone.Statistics&populate[6]=dynamic_zone.image&populate[7]=dynamic_zone.featuredImage&populate[8]=dynamic_zone.backgroundImage&populate[9]=dynamic_zone.foregroundImage&populate[10]=dynamic_zone.video&populate[11]=dynamic_zone.featuredVideo&populate[12]=dynamic_zone.cta&populate[13]=dynamic_zone.Testimonials&populate[14]=dynamic_zone.Testimonials.image&populate[15]=dynamic_zone.Testimonials.survivor_story&populate[16]=dynamic_zone.Testimonials.survivor_story.image&populate[17]=dynamic_zone.Testimonials.survivor_story.backgroundImage&populate[18]=dynamic_zone.resources&populate[19]=dynamic_zone.resources.image&populate[20]=dynamic_zone.resources.author&populate[21]=dynamic_zone.resources.author.avatar&populate[22]=dynamic_zone.Step&populate[23]=dynamic_zone.hospitals&populate[24]=dynamic_zone.hospitals.image&populate[25]=dynamic_zone.trialTypes&populate[26]=dynamic_zone.trialTypes.icon&filters[slug][$eq]=home`);
      const homePage = pagesResponse.data.data?.[0];
      
      // Fetch global data (header menu, footer, etc.) with populate
      // Based on Strapi menu guide: Global has logo, cta_label, cta_url, header_menu (relation to Menu)
      // Menu has items (relation to Menu Item), Menu Item has parent/children relationships
      // Based on Strapi API documentation: https://cancerfax.unifiedinfotechonline.com/documentation/v1.0.0#/Global/get%2Fglobal
      let globalResponse = null;
      
      try {
        // Populate according to menu guide and actual API structure:
        // Populate footer with all its nested relations using bracket notation
        const populateUrl = `${API_URL}/api/global?` +
          `populate[logo]=*&` +
          `populate[header_menu][populate][items][populate]=children,children.children,icon,links&` +
          `populate[footer][populate][0]=logo&` +
          `populate[footer][populate][1]=social_media_links&` +
          `populate[footer][populate][2]=social_media_links.image&` +
          `populate[footer][populate][3]=social_media_links.link&` +
          `populate[footer][populate][4]=footer_columns&` +
          `populate[footer][populate][5]=footer_columns.links&` +
          `populate[footer][populate][6]=locations&` +
          `populate[footer][populate][7]=policy_links&` +
          `populate[footer][populate][8]=cta&` +
          `populate[navbar][populate][0]=logo&` +
          `populate[navbar][populate][1]=menu&` +
          `populate[navbar][populate][2]=cta`;
        
        globalResponse = await axios.get(populateUrl);
        const globalData = globalResponse?.data?.data || {};
        
        // Return populated global data (header_menu structure)
        // SEO comes from /api/global endpoint
        return {
          dynamicZone: homePage?.dynamic_zone || [],
          seo: globalData.seo || null, // SEO from /api/global
          // Store both navbar (legacy) and new structure
          navbar: globalData.navbar || null, // Legacy support
          headerMenu: globalData.header_menu || null, // New menu structure
          logo: globalData.logo || null,
          ctaLabel: globalData.cta_label || null,
          ctaUrl: globalData.cta_url || null,
          footer: globalData.footer || null,
        };
      } catch (globalError) {
        console.warn('Failed to fetch global endpoint with structured populate, trying populate=*:', globalError);
        // Fallback to populate=* if specific populate fails
        try {
          globalResponse = await axios.get(`${API_URL}/api/global?populate=*`);
          const globalData = globalResponse?.data?.data || {};
          
          return {
            dynamicZone: homePage?.dynamic_zone || [],
            seo: globalData.seo || null, // SEO from /api/global
            navbar: globalData.navbar || null,
            headerMenu: globalData.header_menu || null,
            logo: globalData.logo || null,
            ctaLabel: globalData.cta_label || null,
            ctaUrl: globalData.cta_url || null,
            footer: globalData.footer || null,
          };
        } catch (fallbackError) {
          console.warn('Failed to fetch global endpoint:', fallbackError);
          // Continue without global data if it fails
          return {
            dynamicZone: homePage?.dynamic_zone || [],
            seo: null, // SEO from /api/global (will be null if global fetch fails)
            navbar: null,
            headerMenu: null,
            logo: null,
            ctaLabel: null,
            ctaUrl: null,
            footer: null,
          };
        }
      }
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch global data');
    }
  }
);

const globalSlice = createSlice({
  name: 'global',
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducers: {},
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
      });
  },
});

export default globalSlice.reducer;

