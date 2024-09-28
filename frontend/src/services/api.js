// src/api/api.js

import axios from 'axios';

const API_URL = 'https://interview-home-work-backend.onrender.com';

export const signupUser = async (userData) => {
    const response = await axios.post(`${API_URL}/users/sign-up`, userData);
    return response.data;
  };

export const loginUser = async (credentials) => {
    const response = await axios.post(`${API_URL}/users/sign-in`, credentials); // Sử dụng API_URL ở đây
    return response.data;
};

export const fetchPosts = async (page) => {
  const response = await axios.get(`${API_URL}/posts/?page=${page}`);
  return response;
};