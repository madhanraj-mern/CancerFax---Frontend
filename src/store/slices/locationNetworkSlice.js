import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { locationNetworkAPI } from '../../services/contentService';

// Async thunks
export const fetchLocationNetworkSection = createAsyncThunk(
  'locationNetwork/fetchSection',
  async (_, { rejectWithValue }) => {
    try {
      const data = await locationNetworkAPI.getLocationNetworkSection();
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch location network section');
    }
  }
);

export const fetchHospitals = createAsyncThunk(
  'locationNetwork/fetchHospitals',
  async (_, { rejectWithValue }) => {
    try {
      const data = await locationNetworkAPI.getHospitals();
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch hospitals');
    }
  }
);

const locationNetworkSlice = createSlice({
  name: 'locationNetwork',
  initialState: {
    sectionContent: null,
    hospitals: [],
    selectedHospitalId: 1,
    loading: false,
    error: null,
  },
  reducers: {
    setSelectedHospital: (state, action) => {
      state.selectedHospitalId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Section
      .addCase(fetchLocationNetworkSection.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLocationNetworkSection.fulfilled, (state, action) => {
        state.loading = false;
        state.sectionContent = action.payload;
      })
      .addCase(fetchLocationNetworkSection.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch Hospitals
      .addCase(fetchHospitals.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchHospitals.fulfilled, (state, action) => {
        state.loading = false;
        state.hospitals = action.payload;
        // Set first hospital as selected if not already set
        if (!state.selectedHospitalId && action.payload.length > 0) {
          state.selectedHospitalId = action.payload[0].id;
        }
      })
      .addCase(fetchHospitals.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setSelectedHospital } = locationNetworkSlice.actions;
export default locationNetworkSlice.reducer;

