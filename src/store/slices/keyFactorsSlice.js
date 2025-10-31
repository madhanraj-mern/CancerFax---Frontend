import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { keyFactorsAPI } from '../../services/contentService';

export const fetchKeyFactorsSection = createAsyncThunk(
  'keyFactors/fetchSection',
  async (_, { rejectWithValue }) => {
    try {
      const data = await keyFactorsAPI.getSection();
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch key factors section');
    }
  }
);

export const fetchKeyFactors = createAsyncThunk(
  'keyFactors/fetchFactors',
  async (_, { rejectWithValue }) => {
    try {
      const data = await keyFactorsAPI.getFactors();
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch key factors');
    }
  }
);

const keyFactorsSlice = createSlice({
  name: 'keyFactors',
  initialState: {
    sectionContent: null,
    factors: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchKeyFactorsSection.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchKeyFactorsSection.fulfilled, (state, action) => {
        state.loading = false;
        state.sectionContent = action.payload;
      })
      .addCase(fetchKeyFactorsSection.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchKeyFactors.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchKeyFactors.fulfilled, (state, action) => {
        state.loading = false;
        state.factors = action.payload;
      })
      .addCase(fetchKeyFactors.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default keyFactorsSlice.reducer;









