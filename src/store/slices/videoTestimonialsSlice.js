import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { videoTestimonialsAPI } from '../../services/contentService';

// Fetch Video Testimonials section content
export const fetchVideoTestimonialsSection = createAsyncThunk(
  'videoTestimonials/fetchSection',
  async (_, { rejectWithValue }) => {
    try {
      const data = await videoTestimonialsAPI.getVideoTestimonialsSection();
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch video testimonials section');
    }
  }
);

const videoTestimonialsSlice = createSlice({
  name: 'videoTestimonials',
  initialState: {
    sectionContent: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchVideoTestimonialsSection.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchVideoTestimonialsSection.fulfilled, (state, action) => {
        state.loading = false;
        state.sectionContent = action.payload;
      })
      .addCase(fetchVideoTestimonialsSection.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default videoTestimonialsSlice.reducer;













