import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk to fetch dedicated support section data
export const fetchDedicatedSupport = createAsyncThunk(
  'dedicatedSupport/fetchDedicatedSupport',
  async () => {
    const API_URL = process.env.REACT_APP_STRAPI_URL || 'https://cancerfax.unifiedinfotechonline.com';
    const response = await fetch(
      `${API_URL}/api/dedicated-support-section?populate[cards][populate]=*`
    );
    const data = await response.json();
    return data.data;
  }
);

const dedicatedSupportSlice = createSlice({
  name: 'dedicatedSupport',
  initialState: {
    sectionData: null,
    cards: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDedicatedSupport.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchDedicatedSupport.fulfilled, (state, action) => {
        state.loading = false;
        state.sectionData = action.payload;
        // Extract cards from the section data
        if (action.payload?.attributes?.cards?.data) {
          state.cards = action.payload.attributes.cards.data;
        }
      })
      .addCase(fetchDedicatedSupport.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default dedicatedSupportSlice.reducer;

