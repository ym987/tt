import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://tt-kehilot.onrender.com', 
  timeout: 1000,
  headers: { 'Content-Type': 'application/json' }
});

export default axiosInstance;