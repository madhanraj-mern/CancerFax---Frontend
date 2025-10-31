import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { howItWorksAPI } from '../../services/contentService';

export const fetchHowItWorksSection = createAsyncThunk(
  'howItWorks/fetchSection',
  async (_, { rejectWithValue }) => {
    try {
      const data = await howItWorksAPI.getHowItWorksSection();
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch how it works section');
    }
  }
);

export const fetchSteps = createAsyncThunk(
  'howItWorks/fetchSteps',
  async (_, { rejectWithValue }) => {
    try {
      const data = await howItWorksAPI.getSteps();
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch steps');
    }
  }
);

const howItWorksSlice = createSlice({
  name: 'howItWorks',
  initialState: {
    sectionContent: null,
    steps: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchHowItWorksSection.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchHowItWorksSection.fulfilled, (state, action) => {
        state.loading = false;
        state.sectionContent = action.payload;
      })
      .addCase(fetchHowItWorksSection.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchSteps.fulfilled, (state, action) => {
        state.steps = action.payload;
      });
  },
});

export default howItWorksSlice.reducer;








