import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Use environment variable for API URL, with fallback to production URL
const API_URL = process.env.REACT_APP_STRAPI_URL || 'https://cancerfax.unifiedinfotechonline.com';

// Async thunk to fetch FAQs
export const fetchFAQs = createAsyncThunk(
  'faq/fetchFAQs',
  async () => {
    try {
      const response = await axios.get(`${API_URL}/api/faqs?populate=*&sort=order:asc`);
      return response.data?.data || [];
    } catch (error) {
      console.error('Error fetching FAQs:', error);
      return [];
    }
  }
);

const faqSlice = createSlice({
  name: 'faq',
  initialState: {
    faqs: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFAQs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFAQs.fulfilled, (state, action) => {
        state.loading = false;
        state.faqs = action.payload;
      })
      .addCase(fetchFAQs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default faqSlice.reducer;
