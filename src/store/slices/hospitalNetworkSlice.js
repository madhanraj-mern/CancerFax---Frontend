import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { hospitalNetworkAPI } from '../../services/contentService';

// Fetch hero section content
export const fetchHospitalHeroSection = createAsyncThunk(
  'hospitalNetwork/fetchHeroSection',
  async (_, { rejectWithValue }) => {
    try {
      const data = await hospitalNetworkAPI.getHeroSection();
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch hero section');
    }
  }
);

// Fetch hospitals list
export const fetchHospitals = createAsyncThunk(
  'hospitalNetwork/fetchHospitals',
  async (_, { rejectWithValue }) => {
    try {
      const data = await hospitalNetworkAPI.getHospitals();
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch hospitals');
    }
  }
);

const hospitalNetworkSlice = createSlice({
  name: 'hospitalNetwork',
  initialState: {
    heroSection: null,
    hospitals: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Hero Section
      .addCase(fetchHospitalHeroSection.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchHospitalHeroSection.fulfilled, (state, action) => {
        state.loading = false;
        state.heroSection = action.payload;
      })
      .addCase(fetchHospitalHeroSection.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Hospitals
      .addCase(fetchHospitals.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchHospitals.fulfilled, (state, action) => {
        state.loading = false;
        state.hospitals = action.payload;
      })
      .addCase(fetchHospitals.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default hospitalNetworkSlice.reducer;










