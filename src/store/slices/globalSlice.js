import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import qs from 'qs';
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

const fetchSliderComponentsWithMedia = async (slug, timestamp) => {
  try {
    const sliderParams = new URLSearchParams();
    sliderParams.append('filters[slug][$eq]', slug);
    sliderParams.append('populate[dynamic_zone][on][dynamic-zone.slider-section][populate][Slide][populate]', '*');
    sliderParams.append('_t', timestamp.toString());
    const response = await axios.get(`${API_URL}/api/pages?${sliderParams.toString()}`);
    const sliderDynamicZone = response.data?.data?.[0]?.dynamic_zone || [];
    return sliderDynamicZone.filter(component => component?.__component === 'dynamic-zone.slider-section');
  } catch (error) {
    console.warn('⚠️ Unable to deeply populate slider section:', error?.message || error);
    return [];
  }
};

const fetchTestimonialComponentsWithMedia = async (slug, timestamp) => {
  try {
    const testimonialParams = new URLSearchParams();
    testimonialParams.append('filters[slug][$eq]', slug);
    testimonialParams.append('populate[dynamic_zone][on][dynamic-zone.testimonial-slider][populate][survivor_story][populate]', '*');
    testimonialParams.append('_t', timestamp.toString());
    const response = await axios.get(`${API_URL}/api/pages?${testimonialParams.toString()}`);
    const dynamicZone = response.data?.data?.[0]?.dynamic_zone || [];
    return dynamicZone.filter(component => component?.__component === 'dynamic-zone.testimonial-slider');
  } catch (error) {
    console.warn('⚠️ Unable to deeply populate testimonial slider:', error?.message || error);
    return [];
  }
};

const fetchTherapiesWithMedia = async (therapyIds, timestamp) => {
  if (!therapyIds?.length) {
    return {};
  }

  try {
    const therapyParams = new URLSearchParams();
    therapyIds.forEach((id) => {
      if (id !== undefined && id !== null) {
        therapyParams.append('filters[id][$in]', id);
      }
    });
    therapyParams.append('populate', '*');
    therapyParams.append('_t', timestamp.toString());

    const response = await axios.get(`${API_URL}/api/therapies?${therapyParams.toString()}`);
    const therapiesData = response.data?.data || [];

    return therapiesData.reduce((acc, item) => {
      const therapyAttributes = item?.attributes
        ? { id: item.id, ...item.attributes }
        : item;
      if (therapyAttributes?.id) {
        acc[therapyAttributes.id] = therapyAttributes;
      }
      return acc;
    }, {});
  } catch (error) {
    console.warn('⚠️ Unable to populate therapy images:', error?.message || error);
    return {};
  }
};

// Fetch global data from pages endpoint (contains all landing page sections in dynamic_zone)
// Also fetch from /api/global for navbar and footer data
export const fetchGlobalData = createAsyncThunk(
  'global/fetchGlobalData',
  async (_, { rejectWithValue }) => {
    try {
      // Add cache-busting timestamp to ensure fresh data
      const timestamp = Date.now();
      const pageParams = new URLSearchParams();
      pageParams.append('filters[slug][$eq]', 'home');
      pageParams.append('populate[dynamic_zone][populate]', '*');
      pageParams.append('_t', timestamp.toString());
      
      // Prepare global API call in parallel
      const globalPopulateQuery = qs.stringify({
        populate: {
          navbar: { populate: true },
          footer: {
            populate: {
              logo: { fields: ['id', 'url', 'hash', 'ext', 'mime', 'name'] },
              policy_links: true,
              footer_columns: { populate: { links: true } },
              locations: {
                fields: ['id', 'country', 'country_code', 'address', 'full_address', 'phone', 'phone_country_code', 'phone_number', 'whatsapp_number', 'flag'],
                populate: { flag: { fields: ['url', 'name', 'hash', 'ext', 'mime'] } },
              },
              social_media_links: {
                populate: {
                  image: { fields: ['url', 'name', 'hash', 'ext', 'mime'] },
                  link: true,
                },
              },
              cta: true,
            },
          },
        },
        _t: timestamp,
      }, { encodeValuesOnly: true });
      
      // Fetch pages and global data in parallel for faster loading
      // Use allSettled to handle partial failures gracefully
      const [pagesResult, globalResult] = await Promise.allSettled([
        axios.get(`${API_URL}/api/pages?${pageParams.toString()}`),
        axios.get(`${API_URL}/api/global?${globalPopulateQuery}`)
      ]);
      
      // Handle pages response
      if (pagesResult.status === 'rejected') {
        console.warn('⚠️ Failed to fetch pages data:', pagesResult.reason?.message);
      }
      const pagesResponse = pagesResult.status === 'fulfilled' ? pagesResult.value : null;
      
      // Handle global response
      if (globalResult.status === 'rejected') {
        console.warn('⚠️ Failed to fetch global data:', globalResult.reason?.message);
      }
      const globalResponse = globalResult.status === 'fulfilled' ? globalResult.value : null;
      
      let homePage = pagesResponse?.data?.data?.[0] || null;
      let pageDynamicZone = Array.isArray(homePage?.dynamic_zone) ? [...homePage.dynamic_zone] : [];
      if (pageDynamicZone.length > 0) {
        // Extract therapy IDs first (synchronous operation)
        const therapyIds = pageDynamicZone
          .filter(component => component?.__component === 'dynamic-zone.therapy-section')
          .flatMap(component => {
            const list = Array.isArray(component?.Therapy) ? component.Therapy : component?.therapies;
            return Array.isArray(list) ? list : [];
          })
          .map(item => item?.id)
          .filter((id, index, arr) => id && arr.indexOf(id) === index);
        
        // Make all API calls in parallel for faster loading
        const [sliderComponentsWithMedia, testimonialComponentsWithMedia, therapiesMap] = await Promise.all([
          fetchSliderComponentsWithMedia('home', timestamp),
          fetchTestimonialComponentsWithMedia('home', timestamp),
          fetchTherapiesWithMedia(therapyIds, timestamp)
        ]);

        if (sliderComponentsWithMedia.length > 0) {
          pageDynamicZone = pageDynamicZone.map((component) => {
            if (component?.__component === 'dynamic-zone.slider-section') {
              const replacement = sliderComponentsWithMedia.find(populated => populated?.id === component?.id)
                || sliderComponentsWithMedia[0];
              return replacement || component;
            }

            if (component?.__component === 'dynamic-zone.testimonial-slider' && testimonialComponentsWithMedia.length > 0) {
              const replacement = testimonialComponentsWithMedia.find(populated => populated?.id === component?.id)
                || testimonialComponentsWithMedia[0];
              return replacement || component;
            }

            if (component?.__component === 'dynamic-zone.therapy-section' && Object.keys(therapiesMap).length > 0) {
              const therapyArray = Array.isArray(component?.Therapy)
                ? component.Therapy
                : Array.isArray(component?.therapies)
                  ? component.therapies
                  : [];

              const enrichedTherapies = therapyArray.map((therapy) => {
                const therapyId = therapy?.id;
                const enriched = therapyId ? therapiesMap[therapyId] : null;
                if (!enriched) return therapy;

                const mergedTherapy = enriched?.attributes
                  ? { id: therapyId, ...enriched.attributes }
                  : enriched;

                return { ...therapy, ...mergedTherapy };
              });

              if (Array.isArray(component?.Therapy)) {
                return { ...component, Therapy: enrichedTherapies };
              }
              if (Array.isArray(component?.therapies)) {
                return { ...component, therapies: enrichedTherapies };
              }
              return component;
            }

            return component;
          });
          if (homePage) {
            homePage = { ...homePage, dynamic_zone: pageDynamicZone };
          }
        }
      }
      
      // Process global data (already fetched in parallel above)
      const rawGlobalData = globalResponse?.data?.data || {};
      let globalData = rawGlobalData?.attributes
        ? { id: rawGlobalData.id, ...rawGlobalData.attributes }
        : rawGlobalData;
      
      // Remove excessive logging for better performance - only log errors
      // Uncomment below for debugging if needed:
      /*
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
        */
      
      /*
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
        */
      
      /*
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
        */
      
      /*
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
        */
      
      /*
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
        */
      
      // If navbar/footer only have IDs (not populated), try to fetch logo from media library
      // Check if navbar/footer have logo IDs that we can use to fetch the media
      let navbarLogoData = globalData?.navbar?.logo;
      let footerLogoData = globalData?.footer?.logo;
      
      // If logo is just an ID (number), try to fetch the media object
      if (navbarLogoData && typeof navbarLogoData === 'number') {
        try {
          const mediaResponse = await axios.get(`${API_URL}/api/upload/files/${navbarLogoData}?_t=${timestamp}`);
          if (mediaResponse?.data) {
            navbarLogoData = mediaResponse.data;
            globalData.navbar = { ...globalData.navbar, logo: navbarLogoData };
          }
        } catch (mediaError) {
          console.warn('⚠️ Failed to fetch navbar logo from media library:', mediaError.message);
        }
      }
      
      if (footerLogoData && typeof footerLogoData === 'number') {
        try {
          const mediaResponse = await axios.get(`${API_URL}/api/upload/files/${footerLogoData}?_t=${timestamp}`);
          if (mediaResponse?.data) {
            footerLogoData = mediaResponse.data;
            globalData.footer = { ...globalData.footer, logo: footerLogoData };
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
      
      // Removed console.log for better performance
      /*
      console.log('✅ Resolved Logo URLs:', {
          navbarLogoUrl,
          footerLogoUrl,
          globalLogoUrl,
        });
      */
      
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
      
      const timestamp = Date.now();
      const pageParams = new URLSearchParams();
      pageParams.append('filters[slug][$eq]', normalizedSlug);
      pageParams.append('populate[dynamic_zone][populate]', '*');
      pageParams.append('populate[seo][populate]', '*');
      pageParams.append('_t', timestamp.toString());
      const apiUrl = `${API_URL}/api/pages?${pageParams.toString()}`;
      console.log('fetchPageBySlug: Fetching page with slug:', normalizedSlug);
      
      const pagesResponse = await axios.get(apiUrl);
      
      let page = pagesResponse.data.data?.[0];
      const baseAttributes = page?.attributes || page;
      let pageDynamicZone = Array.isArray(baseAttributes?.dynamic_zone)
        ? [...baseAttributes.dynamic_zone]
        : [];
      if (pageDynamicZone.length > 0) {
        const sliderComponentsWithMedia = await fetchSliderComponentsWithMedia(normalizedSlug || 'home', timestamp);
        const testimonialComponentsWithMedia = await fetchTestimonialComponentsWithMedia(normalizedSlug || 'home', timestamp);
        const therapyIds = pageDynamicZone
          .filter(component => component?.__component === 'dynamic-zone.therapy-section')
          .flatMap(component => {
            const list = Array.isArray(component?.Therapy) ? component.Therapy : component?.therapies;
            return Array.isArray(list) ? list : [];
          })
          .map(item => item?.id)
          .filter((id, index, arr) => id && arr.indexOf(id) === index);
        const therapiesMap = await fetchTherapiesWithMedia(therapyIds, timestamp);

        if (sliderComponentsWithMedia.length > 0) {
          pageDynamicZone = pageDynamicZone.map((component) => {
            if (component?.__component === 'dynamic-zone.slider-section') {
              const replacement = sliderComponentsWithMedia.find(populated => populated?.id === component?.id)
                || sliderComponentsWithMedia[0];
              return replacement || component;
            }

            if (component?.__component === 'dynamic-zone.testimonial-slider' && testimonialComponentsWithMedia.length > 0) {
              const replacement = testimonialComponentsWithMedia.find(populated => populated?.id === component?.id)
                || testimonialComponentsWithMedia[0];
              return replacement || component;
            }

            if (component?.__component === 'dynamic-zone.therapy-section' && Object.keys(therapiesMap).length > 0) {
              const therapyArray = Array.isArray(component?.Therapy)
                ? component.Therapy
                : Array.isArray(component?.therapies)
                  ? component.therapies
                  : [];

              const enrichedTherapies = therapyArray.map((therapy) => {
                const therapyId = therapy?.id;
                const enriched = therapyId ? therapiesMap[therapyId] : null;
                if (!enriched) return therapy;

                const mergedTherapy = enriched?.attributes
                  ? { id: therapyId, ...enriched.attributes }
                  : enriched;

                return { ...therapy, ...mergedTherapy };
              });

              if (Array.isArray(component?.Therapy)) {
                component = { ...component, Therapy: enrichedTherapies };
              } else if (Array.isArray(component?.therapies)) {
                component = { ...component, therapies: enrichedTherapies };
              }
              return component;
            }

            return component;
          });
          if (page?.attributes) {
            page = {
              ...page,
              attributes: {
                ...page.attributes,
                dynamic_zone: pageDynamicZone,
              },
            };
          } else if (page) {
            page = { ...page, dynamic_zone: pageDynamicZone };
          }
        }
      }
      
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
    loading: true, // Start as true to prevent showing fallback data before Strapi data loads
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
        // Removed console.log for better performance
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

