import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { navigationAPI } from '../../services/contentService';

// Async thunks
export const fetchNavigation = createAsyncThunk(
  'navigation/fetchNavigation',
  async (_, { rejectWithValue }) => {
    try {
      const data = await navigationAPI.getNavigation();
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch navigation');
    }
  }
);

export const fetchLogo = createAsyncThunk(
  'navigation/fetchLogo',
  async (_, { rejectWithValue }) => {
    try {
      const data = await navigationAPI.getLogo();
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch logo');
    }
  }
);

export const fetchLanguages = createAsyncThunk(
  'navigation/fetchLanguages',
  async (_, { rejectWithValue }) => {
    try {
      const data = await navigationAPI.getLanguages();
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch languages');
    }
  }
);

export const fetchButtons = createAsyncThunk(
  'navigation/fetchButtons',
  async (_, { rejectWithValue }) => {
    try {
      const data = await navigationAPI.getButtons();
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch buttons');
    }
  }
);

const navigationSlice = createSlice({
  name: 'navigation',
  initialState: {
    menuItems: [],
    logo: null,
    languages: [],
    currentLanguage: null,
    buttons: {
      connectButton: null,
    },
    loading: false,
    error: null,
  },
  reducers: {
    setCurrentLanguage: (state, action) => {
      state.currentLanguage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Navigation
      .addCase(fetchNavigation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNavigation.fulfilled, (state, action) => {
        state.loading = false;
        state.menuItems = action.payload?.menuItems || [];
      })
      .addCase(fetchNavigation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch Logo
      .addCase(fetchLogo.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchLogo.fulfilled, (state, action) => {
        state.loading = false;
        state.logo = action.payload;
      })
      .addCase(fetchLogo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch Languages
      .addCase(fetchLanguages.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchLanguages.fulfilled, (state, action) => {
        state.loading = false;
        state.languages = action.payload?.languages || [];
        if (!state.currentLanguage && action.payload?.languages?.length > 0) {
          state.currentLanguage = action.payload.languages[0];
        }
      })
      .addCase(fetchLanguages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch Buttons
      .addCase(fetchButtons.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchButtons.fulfilled, (state, action) => {
        state.loading = false;
        state.buttons = action.payload || { connectButton: null };
      })
      .addCase(fetchButtons.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setCurrentLanguage } = navigationSlice.actions;
export default navigationSlice.reducer;

