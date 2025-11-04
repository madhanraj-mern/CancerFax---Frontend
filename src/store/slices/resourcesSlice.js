import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { resourcesAPI } from '../../services/contentService';

export const fetchResourcesSection = createAsyncThunk(
  'resources/fetchSection',
  async (_, { rejectWithValue }) => {
    try {
      const data = await resourcesAPI.getResourcesSection();
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch resources section');
    }
  }
);

export const fetchBlogs = createAsyncThunk(
  'resources/fetchBlogs',
  async (limit = 3, { rejectWithValue }) => {
    try {
      const data = await resourcesAPI.getBlogs(limit);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch blogs');
    }
  }
);

const resourcesSlice = createSlice({
  name: 'resources',
  initialState: {
    sectionContent: null,
    blogs: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchResourcesSection.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchResourcesSection.fulfilled, (state, action) => {
        state.loading = false;
        state.sectionContent = action.payload;
      })
      .addCase(fetchResourcesSection.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchBlogs.fulfilled, (state, action) => {
        state.blogs = action.payload;
      });
  },
});

export default resourcesSlice.reducer;























