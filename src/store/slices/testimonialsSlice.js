import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { testimonialsAPI } from '../../services/contentService';

export const fetchTestimonials = createAsyncThunk(
  'testimonials/fetchTestimonials',
  async (_, { rejectWithValue }) => {
    try {
      const data = await testimonialsAPI.getTestimonials();
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch testimonials');
    }
  }
);

export const fetchFeaturedTestimonial = createAsyncThunk(
  'testimonials/fetchFeaturedTestimonial',
  async (_, { rejectWithValue }) => {
    try {
      const data = await testimonialsAPI.getFeaturedTestimonial();
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch featured testimonial');
    }
  }
);

const testimonialsSlice = createSlice({
  name: 'testimonials',
  initialState: {
    testimonials: [],
    featured: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTestimonials.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTestimonials.fulfilled, (state, action) => {
        state.loading = false;
        state.testimonials = action.payload;
      })
      .addCase(fetchTestimonials.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchFeaturedTestimonial.fulfilled, (state, action) => {
        state.featured = action.payload;
      });
  },
});

export default testimonialsSlice.reducer;















