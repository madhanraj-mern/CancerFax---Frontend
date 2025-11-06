import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { aboutAPI } from '../../services/contentService';

export const fetchAboutContent = createAsyncThunk(
  'about/fetchAboutContent',
  async (_, { rejectWithValue }) => {
    try {
      const data = await aboutAPI.getAboutContent();
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch about content');
    }
  }
);

const aboutSlice = createSlice({
  name: 'about',
  initialState: {
    content: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAboutContent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAboutContent.fulfilled, (state, action) => {
        state.loading = false;
        state.content = action.payload;
      })
      .addCase(fetchAboutContent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default aboutSlice.reducer;




























