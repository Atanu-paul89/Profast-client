import axios from 'axios';
import React from 'react';
import Swal from 'sweetalert2';

const axiosSecure = axios.create({
  baseURL: 'http://localhost:5000/',
});

// JWT interceptor to attach token to every request // 
axiosSecure.interceptors.request.use((config) => {
  const token = localStorage.getItem("access-token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ✅ Response interceptor: catch 401/403
axiosSecure.interceptors.response.use(
  response => response,
  error => {
    const status = error.response?.status;

    if (status === 401 || status === 403) {
      // Clear token
      localStorage.removeItem("access-token");
     

      // Optional: show alert
      Swal.fire({
        icon: 'warning',
        iconColor: '#CAEB66',
        title: 'Session Expired',
        text: 'Please log in again to continue.',
        confirmButtonText: 'Sign In',
        confirmButtonColor: '#03373D',
        allowOutsideClick: false,
      });

       window.location.href = '/auth/signin';


    }

    return Promise.reject(error);
  }
);
// ----- x jwt logic ended x ----- // 

const useAxiosSecure = () => {
  return axiosSecure;
};

export default useAxiosSecure;