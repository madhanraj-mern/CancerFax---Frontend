import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { footerAPI } from '../../services/contentService';

// Fetch all footer data
export const fetchFooterContent = createAsyncThunk(
  'footer/fetchFooterContent',
  async (_, { rejectWithValue }) => {
    try {
      const data = await footerAPI.getFooterContent();
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch footer content');
    }
  }
);

// Fetch contact information
export const fetchContactInfo = createAsyncThunk(
  'footer/fetchContactInfo',
  async (_, { rejectWithValue }) => {
    try {
      const data = await footerAPI.getContactInfo();
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch contact info');
    }
  }
);

// Fetch social links
export const fetchSocialLinks = createAsyncThunk(
  'footer/fetchSocialLinks',
  async (_, { rejectWithValue }) => {
    try {
      const data = await footerAPI.getSocialLinks();
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch social links');
    }
  }
);

// Fetch locations
export const fetchLocations = createAsyncThunk(
  'footer/fetchLocations',
  async (_, { rejectWithValue }) => {
    try {
      const data = await footerAPI.getLocations();
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch locations');
    }
  }
);

// Fetch link columns
export const fetchLinkColumns = createAsyncThunk(
  'footer/fetchLinkColumns',
  async (_, { rejectWithValue }) => {
    try {
      const data = await footerAPI.getLinkColumns();
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch link columns');
    }
  }
);

const footerSlice = createSlice({
  name: 'footer',
  initialState: {
    content: null,
    contactInfo: [],
    socialLinks: [],
    locations: [],
    linkColumns: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Footer Content
      .addCase(fetchFooterContent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFooterContent.fulfilled, (state, action) => {
        state.loading = false;
        state.content = action.payload;
      })
      .addCase(fetchFooterContent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Contact Info
      .addCase(fetchContactInfo.fulfilled, (state, action) => {
        state.contactInfo = action.payload;
      })
      // Social Links
      .addCase(fetchSocialLinks.fulfilled, (state, action) => {
        state.socialLinks = action.payload;
      })
      // Locations
      .addCase(fetchLocations.fulfilled, (state, action) => {
        state.locations = action.payload;
      })
      // Link Columns
      .addCase(fetchLinkColumns.fulfilled, (state, action) => {
        state.linkColumns = action.payload;
      });
  },
});

export default footerSlice.reducer;

