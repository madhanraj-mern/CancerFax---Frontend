import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Use environment variable for API URL, with fallback to production URL
const API_URL = process.env.REACT_APP_STRAPI_URL || 'https://staging.cancerfax.unifiedinfotechonline.com';

// Async thunk to fetch Success Stories section data
export const fetchSuccessStories = createAsyncThunk(
  'successStories/fetchSuccessStories',
  async () => {
    try {
      // Fetch section data
      const sectionResponse = await axios.get(`${API_URL}/api/success-stories-section?populate=*`);
      
      // Fetch stories
      const storiesResponse = await axios.get(`${API_URL}/api/success-stories?populate=*`);

      return {
        sectionData: sectionResponse.data?.data || null,
        stories: storiesResponse.data?.data || [],
      };
    } catch (error) {
      console.error('Error fetching success stories:', error);
      return {
        sectionData: null,
        stories: [],
      };
    }
  }
);

const successStoriesSlice = createSlice({
  name: 'successStories',
  initialState: {
    sectionData: null,
    stories: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSuccessStories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSuccessStories.fulfilled, (state, action) => {
        state.loading = false;
        state.sectionData = action.payload.sectionData;
        state.stories = action.payload.stories;
      })
      .addCase(fetchSuccessStories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default successStoriesSlice.reducer;

