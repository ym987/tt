import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.API_URL || 'http://localhost:8080', // for production or local testing
  timeout: 1000,
  headers: { 'Content-Type': 'application/json' }
});

export default axiosInstance;