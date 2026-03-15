/**
 * API Configuration
 * Centralized API URL configuration using environment variables
 * 
 * To change the API URL, update the VITE_API_URL in the .env file
 */

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

if (!API_URL) {
  console.warn('⚠️ VITE_API_URL is not set. Using default: http://localhost:8080');
}

export const API_BASE_URL = API_URL.replace(/\/$/, ''); // Remove trailing slash if present

export default API_BASE_URL;

