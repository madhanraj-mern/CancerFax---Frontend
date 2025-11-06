import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { quickFindsAPI } from '../../services/contentService';

// Fetch Quick Finds section content
export const fetchQuickFindsSection = createAsyncThunk(
  'quickFinds/fetchSection',
  async (_, { rejectWithValue }) => {
    try {
      const data = await quickFindsAPI.getQuickFindsSection();
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch Quick Finds section');
    }
  }
);

// Fetch countries
export const fetchCountries = createAsyncThunk(
  'quickFinds/fetchCountries',
  async (_, { rejectWithValue }) => {
    try {
      const data = await quickFindsAPI.getCountries();
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch countries');
    }
  }
);

// Fetch specialties
export const fetchSpecialties = createAsyncThunk(
  'quickFinds/fetchSpecialties',
  async (_, { rejectWithValue }) => {
    try {
      const data = await quickFindsAPI.getSpecialties();
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch specialties');
    }
  }
);

// Fetch treatments
export const fetchTreatments = createAsyncThunk(
  'quickFinds/fetchTreatments',
  async (_, { rejectWithValue }) => {
    try {
      const data = await quickFindsAPI.getTreatments();
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch treatments');
    }
  }
);

const quickFindsSlice = createSlice({
  name: 'quickFinds',
  initialState: {
    sectionContent: null,
    countries: [],
    specialties: [],
    treatments: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Section Content
      .addCase(fetchQuickFindsSection.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchQuickFindsSection.fulfilled, (state, action) => {
        state.loading = false;
        state.sectionContent = action.payload;
      })
      .addCase(fetchQuickFindsSection.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Countries
      .addCase(fetchCountries.fulfilled, (state, action) => {
        state.countries = action.payload;
      })
      // Specialties
      .addCase(fetchSpecialties.fulfilled, (state, action) => {
        state.specialties = action.payload;
      })
      // Treatments
      .addCase(fetchTreatments.fulfilled, (state, action) => {
        state.treatments = action.payload;
      });
  },
});

export default quickFindsSlice.reducer;




























