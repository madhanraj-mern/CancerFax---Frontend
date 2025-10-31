import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { heroAPI } from '../../services/contentService';

export const fetchHeroContent = createAsyncThunk(
  'hero/fetchHeroContent',
  async (_, { rejectWithValue }) => {
    try {
      const data = await heroAPI.getHeroContent();
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch hero content');
    }
  }
);

export const fetchSurvivorStory = createAsyncThunk(
  'hero/fetchSurvivorStory',
  async (_, { rejectWithValue }) => {
    try {
      const data = await heroAPI.getSurvivorStory();
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch survivor story');
    }
  }
);

const heroSlice = createSlice({
  name: 'hero',
  initialState: {
    heroContent: null,
    survivorStory: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchHeroContent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchHeroContent.fulfilled, (state, action) => {
        state.loading = false;
        state.heroContent = action.payload;
      })
      .addCase(fetchHeroContent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchSurvivorStory.fulfilled, (state, action) => {
        state.survivorStory = action.payload;
      });
  },
});

export default heroSlice.reducer;













