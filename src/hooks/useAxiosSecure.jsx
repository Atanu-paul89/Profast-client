import axios from 'axios';
import React from 'react';
import Swal from 'sweetalert2';

const axiosSecure = axios.create({
  baseURL: 'https://zap-shift-server-delta.vercel.app/',
});

// JWT interceptor to attach token to every request // 
axiosSecure.interceptors.request.use((config) => {
  const token = localStorage.getItem("access-token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ----- x jwt logic ended x ----- // 

const useAxiosSecure = () => {
  return axiosSecure;
};

export default useAxiosSecure;


