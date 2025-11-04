import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Use environment variable for API URL, with fallback to production URL
const API_URL = process.env.REACT_APP_STRAPI_URL || 'https://staging.cancerfax.unifiedinfotechonline.com';

// Async thunk for submitting contact form
export const submitContactForm = createAsyncThunk(
  'contact/submitForm',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/api/contact-submissions`, {
        data: formData
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to submit form');
    }
  }
);

// Async thunk for fetching contact page content
export const fetchContactContent = createAsyncThunk(
  'contact/fetchContent',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/api/contact-page?populate=deep`);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch content');
    }
  }
);

const initialState = {
  formData: {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    zipCode: '',
    inquiryType: '',
    message: '',
    agreeToTerms: false
  },
  content: {
    hero: {
      superTitle: 'Contact us',
      title: 'Get in touch with our team'
    },
    dedicatedSupport: {
      superTitle: 'Contact us',
      title: 'More Dedicated Support',
      cards: [
        {
          id: 1,
          title: 'Press Inquiry',
          description: 'For any press-related inquiry, please write to us on the below email directly.',
          email: 'pressinfo@email.com',
          icon: '📧'
        },
        {
          id: 2,
          title: 'Business Inquiry',
          description: 'For any business-related inquiry, please write to us on the below email directly.',
          email: 'business@email.com',
          icon: '💼'
        }
      ]
    }
  },
  isLoading: false,
  isSubmitting: false,
  error: null,
  submitSuccess: false
};

const contactSlice = createSlice({
  name: 'contact',
  initialState,
  reducers: {
    updateFormData: (state, action) => {
      state.formData = { ...state.formData, ...action.payload };
    },
    resetForm: (state) => {
      state.formData = initialState.formData;
      state.submitSuccess = false;
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Submit form
      .addCase(submitContactForm.pending, (state) => {
        state.isSubmitting = true;
        state.error = null;
        state.submitSuccess = false;
      })
      .addCase(submitContactForm.fulfilled, (state) => {
        state.isSubmitting = false;
        state.submitSuccess = true;
        state.formData = initialState.formData;
      })
      .addCase(submitContactForm.rejected, (state, action) => {
        state.isSubmitting = false;
        state.error = action.payload;
      })
      // Fetch content
      .addCase(fetchContactContent.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchContactContent.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload?.attributes) {
          state.content = action.payload.attributes;
        }
      })
      .addCase(fetchContactContent.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  }
});

export const { updateFormData, resetForm, clearError } = contactSlice.actions;

// Selectors
export const selectFormData = (state) => state.contact.formData;
export const selectContactContent = (state) => state.contact.content;
export const selectIsSubmitting = (state) => state.contact.isSubmitting;
export const selectSubmitSuccess = (state) => state.contact.submitSuccess;
export const selectContactError = (state) => state.contact.error;
export const selectIsLoading = (state) => state.contact.isLoading;

export default contactSlice.reducer;


