import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

// Async thunk to fetch contact form section data
export const fetchContactFormSection = createAsyncThunk(
  'contactForm/fetchContactFormSection',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/contact-form-section?populate=*');
      return response.data?.data || response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch contact form section');
    }
  }
);

// Async thunk to fetch testimonials
export const fetchTestimonials = createAsyncThunk(
  'contactForm/fetchTestimonials',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/testimonials?populate=*');
      return response.data?.data || response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch testimonials');
    }
  }
);

// Async thunk to fetch form fields configuration
export const fetchFormFields = createAsyncThunk(
  'contactForm/fetchFormFields',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/contact-form-fields?populate=*');
      return response.data?.data || response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch form fields');
    }
  }
);

// Async thunk to fetch inquiry types
export const fetchInquiryTypes = createAsyncThunk(
  'contactForm/fetchInquiryTypes',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/inquiry-types');
      return response.data?.data || response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch inquiry types');
    }
  }
);

// Async thunk to submit contact form
export const submitContactForm = createAsyncThunk(
  'contactForm/submitContactForm',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await api.post('/contact-submissions', {
        data: formData
      });
      return response.data?.data || response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to submit contact form');
    }
  }
);

const contactFormSlice = createSlice({
  name: 'contactForm',
  initialState: {
    sectionData: null,
    testimonials: [],
    formFields: null,
    inquiryTypes: [],
    currentTestimonialIndex: 0,
    submissionStatus: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    loading: false,
    error: null,
  },
  reducers: {
    setCurrentTestimonial: (state, action) => {
      state.currentTestimonialIndex = action.payload;
    },
    resetSubmissionStatus: (state) => {
      state.submissionStatus = 'idle';
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch contact form section
      .addCase(fetchContactFormSection.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchContactFormSection.fulfilled, (state, action) => {
        state.loading = false;
        state.sectionData = action.payload;
      })
      .addCase(fetchContactFormSection.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Fetch testimonials
      .addCase(fetchTestimonials.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTestimonials.fulfilled, (state, action) => {
        state.loading = false;
        state.testimonials = action.payload;
      })
      .addCase(fetchTestimonials.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Fetch form fields
      .addCase(fetchFormFields.fulfilled, (state, action) => {
        state.formFields = action.payload;
      })
      // Fetch inquiry types
      .addCase(fetchInquiryTypes.fulfilled, (state, action) => {
        state.inquiryTypes = action.payload;
      })
      // Submit contact form
      .addCase(submitContactForm.pending, (state) => {
        state.submissionStatus = 'loading';
      })
      .addCase(submitContactForm.fulfilled, (state) => {
        state.submissionStatus = 'succeeded';
      })
      .addCase(submitContactForm.rejected, (state, action) => {
        state.submissionStatus = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { setCurrentTestimonial, resetSubmissionStatus } = contactFormSlice.actions;

export default contactFormSlice.reducer;

