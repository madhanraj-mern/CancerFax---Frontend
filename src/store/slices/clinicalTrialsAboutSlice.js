import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { clinicalTrialsAboutAPI } from '../../services/contentService';

// Fetch Clinical Trials About section content
export const fetchClinicalTrialsAboutSection = createAsyncThunk(
  'clinicalTrialsAbout/fetchSection',
  async (_, { rejectWithValue }) => {
    try {
      const data = await clinicalTrialsAboutAPI.getClinicalTrialsAboutSection();
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch clinical trials about section');
    }
  }
);

const clinicalTrialsAboutSlice = createSlice({
  name: 'clinicalTrialsAbout',
  initialState: {
    sectionContent: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchClinicalTrialsAboutSection.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchClinicalTrialsAboutSection.fulfilled, (state, action) => {
        state.loading = false;
        state.sectionContent = action.payload;
      })
      .addCase(fetchClinicalTrialsAboutSection.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default clinicalTrialsAboutSlice.reducer;























