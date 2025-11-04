import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk to fetch partner hospitals section data
export const fetchPartnerHospitals = createAsyncThunk(
  'partnerHospitals/fetchPartnerHospitals',
  async () => {
    const API_URL = process.env.REACT_APP_STRAPI_URL || 'https://cancerfax.unifiedinfotechonline.com';
    const response = await fetch(`${API_URL}/api/partner-hospitals-section?populate=*`);
    const data = await response.json();
    return data.data;
  }
);

// Async thunk to fetch partner logos
export const fetchPartners = createAsyncThunk(
  'partnerHospitals/fetchPartners',
  async () => {
    const API_URL = process.env.REACT_APP_STRAPI_URL || 'https://cancerfax.unifiedinfotechonline.com';
    const response = await fetch(`${API_URL}/api/partners?populate=*&sort=order:asc`);
    const data = await response.json();
    return data.data;
  }
);

const partnerHospitalsSlice = createSlice({
  name: 'partnerHospitals',
  initialState: {
    sectionData: null,
    partners: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch partner hospitals section
      .addCase(fetchPartnerHospitals.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPartnerHospitals.fulfilled, (state, action) => {
        state.loading = false;
        state.sectionData = action.payload;
        // If partners are included in the section data, use them
        if (action.payload?.attributes?.partners?.data) {
          state.partners = action.payload.attributes.partners.data;
        }
      })
      .addCase(fetchPartnerHospitals.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Fetch partners separately
      .addCase(fetchPartners.fulfilled, (state, action) => {
        state.partners = action.payload;
      })
      .addCase(fetchPartners.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export default partnerHospitalsSlice.reducer;

