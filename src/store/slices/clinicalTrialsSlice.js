import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { clinicalTrialsAPI } from '../../services/contentService';

export const fetchClinicalTrialsSection = createAsyncThunk(
  'clinicalTrials/fetchSection',
  async (_, { rejectWithValue }) => {
    try {
      const data = await clinicalTrialsAPI.getClinicalTrialsSection();
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch clinical trials section');
    }
  }
);

export const fetchTrialTypes = createAsyncThunk(
  'clinicalTrials/fetchTrialTypes',
  async (_, { rejectWithValue }) => {
    try {
      const data = await clinicalTrialsAPI.getTrialTypes();
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch trial types');
    }
  }
);

const clinicalTrialsSlice = createSlice({
  name: 'clinicalTrials',
  initialState: {
    sectionContent: null,
    trialTypes: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchClinicalTrialsSection.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchClinicalTrialsSection.fulfilled, (state, action) => {
        state.loading = false;
        state.sectionContent = action.payload;
      })
      .addCase(fetchClinicalTrialsSection.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchTrialTypes.fulfilled, (state, action) => {
        state.trialTypes = action.payload;
      });
  },
});

export default clinicalTrialsSlice.reducer;


















