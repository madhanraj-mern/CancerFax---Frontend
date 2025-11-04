import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getMediaUrl } from '../../services/api';

// Async thunk to fetch contact form section data
export const fetchContactFormSection = createAsyncThunk(
  'contactForm/fetchContactFormSection',
  async () => {
    const API_URL = process.env.REACT_APP_STRAPI_URL || 'https://cancerfax.unifiedinfotechonline.com';
    const response = await fetch(`${API_URL}/api/contact-form-section?populate=*`);
    const data = await response.json();
    return data.data;
  }
);

// Async thunk to fetch testimonials
export const fetchTestimonials = createAsyncThunk(
  'contactForm/fetchTestimonials',
  async () => {
    const API_URL = process.env.REACT_APP_STRAPI_URL || 'https://cancerfax.unifiedinfotechonline.com';
    const response = await fetch(`${API_URL}/api/testimonials?populate=*`);
    const data = await response.json();
    return data.data;
  }
);

// Async thunk to fetch form fields configuration
export const fetchFormFields = createAsyncThunk(
  'contactForm/fetchFormFields',
  async () => {
    const API_URL = process.env.REACT_APP_STRAPI_URL || 'https://cancerfax.unifiedinfotechonline.com';
    const response = await fetch(`${API_URL}/api/contact-form-fields?populate=*`);
    const data = await response.json();
    return data.data;
  }
);

// Async thunk to fetch inquiry types
export const fetchInquiryTypes = createAsyncThunk(
  'contactForm/fetchInquiryTypes',
  async () => {
    const API_URL = process.env.REACT_APP_STRAPI_URL || 'https://cancerfax.unifiedinfotechonline.com';
    const response = await fetch(`${API_URL}/api/inquiry-types`);
    const data = await response.json();
    return data.data;
  }
);

// Async thunk to submit contact form
export const submitContactForm = createAsyncThunk(
  'contactForm/submitContactForm',
  async (formData) => {
    const API_URL = process.env.REACT_APP_STRAPI_URL || 'https://cancerfax.unifiedinfotechonline.com';
    const response = await fetch(`${API_URL}/api/contact-submissions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ data: formData }),
    });
    const data = await response.json();
    return data.data;
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

