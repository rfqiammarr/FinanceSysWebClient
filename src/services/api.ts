import axios from 'axios';
import type { AxiosInstance } from 'axios';

const API_BASE_URL = 'https://localhost:7135/v1';

// Create axios instance with SSL verification disabled for development
const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add interceptor untuk handle response errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error);
    return Promise.reject(error);
  },
);

export default apiClient;
