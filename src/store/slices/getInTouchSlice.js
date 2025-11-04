import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getInTouchAPI } from '../../services/contentService';

export const fetchGetInTouchSection = createAsyncThunk(
  'getInTouch/fetchSection',
  async (_, { rejectWithValue }) => {
    try {
      const data = await getInTouchAPI.getGetInTouchSection();
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch get in touch section');
    }
  }
);

const getInTouchSlice = createSlice({
  name: 'getInTouch',
  initialState: {
    sectionContent: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGetInTouchSection.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchGetInTouchSection.fulfilled, (state, action) => {
        state.loading = false;
        state.sectionContent = action.payload;
      })
      .addCase(fetchGetInTouchSection.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default getInTouchSlice.reducer;























