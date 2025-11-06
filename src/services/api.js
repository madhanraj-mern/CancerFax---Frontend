import axios from 'axios';

const API_URL = process.env.REACT_APP_STRAPI_URL || 'https://cancerfax.unifiedinfotechonline.com';
const API_BASE = `${API_URL}/api`;

// Create axios instance with default config
// Note: Cache-Control headers removed to avoid CORS preflight issues
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
    
    // Add cache-busting for GET requests to ensure fresh data from Strapi
    // Using query parameter instead of headers to avoid CORS preflight issues
    if (config.method === 'get' || config.method === 'GET') {
      // Add timestamp to prevent caching (query parameter, not header)
      const separator = config.url.includes('?') ? '&' : '?';
      config.url = `${config.url}${separator}_t=${Date.now()}`;
      // Note: Removed Cache-Control headers to avoid CORS preflight issues
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
    // Check if it's empty or invalid
    const trimmed = pathOrObject.trim();
    if (!trimmed || trimmed === 'null' || trimmed === 'undefined') return null;
    
    if (trimmed.startsWith('http')) return trimmed;
    // Ensure path starts with / if it's a relative path
    const path = trimmed.startsWith('/') ? trimmed : `/${trimmed}`;
    return `${API_BASE_URL}${path}`;
  }
  
  // If it's a Strapi media object, extract the URL
  if (pathOrObject?.url) {
    const url = pathOrObject.url;
    if (!url || url === 'null' || url === 'undefined') return null;
    if (url.startsWith('http')) return url;
    const path = url.startsWith('/') ? url : `/${url}`;
    return `${API_BASE_URL}${path}`;
  }
  
  // If it's nested in data.attributes
  if (pathOrObject?.data?.attributes?.url) {
    const url = pathOrObject.data.attributes.url;
    if (!url || url === 'null' || url === 'undefined') return null;
    if (url.startsWith('http')) return url;
    const path = url.startsWith('/') ? url : `/${url}`;
    return `${API_BASE_URL}${path}`;
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

