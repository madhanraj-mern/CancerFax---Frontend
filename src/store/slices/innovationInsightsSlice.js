import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { innovationInsightsAPI } from '../../services/contentService';

export const fetchInnovationInsightsSection = createAsyncThunk(
  'innovationInsights/fetchSection',
  async (_, { rejectWithValue }) => {
    try {
      const data = await innovationInsightsAPI.getSection();
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch innovation insights section');
    }
  }
);

export const fetchInnovationImages = createAsyncThunk(
  'innovationInsights/fetchImages',
  async (_, { rejectWithValue }) => {
    try {
      const data = await innovationInsightsAPI.getImages();
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch innovation insights images');
    }
  }
);

export const fetchStaticImages = createAsyncThunk(
  'innovationInsights/fetchStaticImages',
  async (_, { rejectWithValue }) => {
    try {
      const data = await innovationInsightsAPI.getStaticImages();
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch static images');
    }
  }
);

const innovationInsightsSlice = createSlice({
  name: 'innovationInsights',
  initialState: {
    sectionContent: null,
    images: [],
    staticImages: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchInnovationInsightsSection.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchInnovationInsightsSection.fulfilled, (state, action) => {
        state.loading = false;
        state.sectionContent = action.payload;
      })
      .addCase(fetchInnovationInsightsSection.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchInnovationImages.fulfilled, (state, action) => {
        state.images = action.payload;
      })
      .addCase(fetchStaticImages.fulfilled, (state, action) => {
        state.staticImages = action.payload;
      });
  },
});

export default innovationInsightsSlice.reducer;















