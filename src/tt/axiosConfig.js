import axios from 'axios';



const axiosInstance = axios.create({
  baseURL: window.location.hostname === 'localhost' ? 'http://localhost:8080' : window.location.href, // for production or local testing
  // timeout: 1000,
  headers: { 'Content-Type': 'application/json' }
});

export default axiosInstance;