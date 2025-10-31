import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { innovativeCareAPI } from '../../services/contentService';

export const fetchInnovativeCare = createAsyncThunk(
  'therapies/fetchInnovativeCare',
  async (_, { rejectWithValue }) => {
    try {
      const data = await innovativeCareAPI.getInnovativeCare();
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch innovative care content');
    }
  }
);

export const fetchTherapies = createAsyncThunk(
  'therapies/fetchTherapies',
  async (_, { rejectWithValue }) => {
    try {
      const data = await innovativeCareAPI.getTherapies();
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch therapies');
    }
  }
);

const therapiesSlice = createSlice({
  name: 'therapies',
  initialState: {
    sectionContent: null,
    therapies: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchInnovativeCare.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchInnovativeCare.fulfilled, (state, action) => {
        state.loading = false;
        state.sectionContent = action.payload;
      })
      .addCase(fetchInnovativeCare.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchTherapies.fulfilled, (state, action) => {
        state.therapies = action.payload;
      });
  },
});

export default therapiesSlice.reducer;









