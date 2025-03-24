
import axios from 'axios';

// API base URL - change to Django backend URL
const API_BASE_URL = 'http://localhost:8000/api';

// Create axios instance with base config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Features API
export const fetchFeatures = async () => {
  const response = await api.get('/get-features/');
  return response.data;
};

// Dashboard API
export const fetchDashboardStats = async () => {
  const response = await api.get('/dashboard-stats/');
  return response.data;
};

// Farmer API
export const fetchFarmers = async () => {
  const response = await api.get('/farmers/');
  return response.data.results;
};

export const getFarmer = async (id: string) => {
  const response = await api.get(`/farmers/${id}/`);
  return response.data;
};

export const createFarmer = async (farmerData: any) => {
  const response = await api.post('/farmers/', farmerData);
  return response.data;
};

export const updateFarmer = async (id: string, farmerData: any) => {
  const response = await api.put(`/farmers/${id}/`, farmerData);
  return response.data;
};

export const deleteFarmer = async (id: string) => {
  await api.delete(`/farmers/${id}/`);
  return true;
};

// Add similar methods for Lands, Schemes, etc.

export default api;
