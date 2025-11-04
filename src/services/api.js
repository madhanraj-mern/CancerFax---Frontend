import axios from 'axios';

const API_URL = process.env.REACT_APP_STRAPI_URL || 'https://cancerfax.unifiedinfotechonline.com';
const API_BASE = `${API_URL}/api`;

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Add auth token if available
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem('token');
    }
    return Promise.reject(error);
  }
);

// Helper to get media URL
export const getMediaUrl = (pathOrObject) => {
  if (!pathOrObject) return null;
  
  const API_BASE_URL = process.env.REACT_APP_STRAPI_URL || 'https://cancerfax.unifiedinfotechonline.com';
  
  // If it's a string
  if (typeof pathOrObject === 'string') {
    if (pathOrObject.startsWith('http')) return pathOrObject;
    return `${API_BASE_URL}${pathOrObject}`;
  }
  
  // If it's a Strapi media object, extract the URL
  if (pathOrObject?.url) {
    const url = pathOrObject.url;
    if (url.startsWith('http')) return url;
    return `${API_BASE_URL}${url}`;
  }
  
  // If it's nested in data.attributes
  if (pathOrObject?.data?.attributes?.url) {
    const url = pathOrObject.data.attributes.url;
    if (url.startsWith('http')) return url;
    return `${API_BASE_URL}${url}`;
  }
  
  return null;
};

// Helper to format Strapi response
export const formatStrapiResponse = (data) => {
  if (!data) return null;
  
  if (Array.isArray(data)) {
    return data.map(item => ({
      id: item.id,
      ...item.attributes,
    }));
  }
  
  return {
    id: data.id,
    ...data.attributes,
  };
};

export default api;

