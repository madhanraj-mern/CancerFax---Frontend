import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { clinicalTrialsShowcaseAPI } from '../../services/contentService';

// Async thunks
export const fetchClinicalTrialsShowcase = createAsyncThunk(
  'clinicalTrialsShowcase/fetchShowcase',
  async (_, { rejectWithValue }) => {
    try {
      const data = await clinicalTrialsShowcaseAPI.getShowcaseSlides();
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch clinical trials showcase');
    }
  }
);

const clinicalTrialsShowcaseSlice = createSlice({
  name: 'clinicalTrialsShowcase',
  initialState: {
    slides: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchClinicalTrialsShowcase.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchClinicalTrialsShowcase.fulfilled, (state, action) => {
        state.loading = false;
        state.slides = action.payload?.slides || [];
      })
      .addCase(fetchClinicalTrialsShowcase.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default clinicalTrialsShowcaseSlice.reducer;




























