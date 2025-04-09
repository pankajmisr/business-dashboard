import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || '';

const api = {
  // Get overall business summary
  getSummary: async () => {
    try {
      const response = await axios.get(`${API_URL}/api/summary`);
      return response.data;
    } catch (error) {
      console.error('Error fetching summary data:', error);
      throw error;
    }
  },
  
  // Get top performing products
  getTopProducts: async () => {
    try {
      const response = await axios.get(`${API_URL}/api/top-products`);
      return response.data;
    } catch (error) {
      console.error('Error fetching top products:', error);
      throw error;
    }
  },
  
  // Get category performance
  getCategoryPerformance: async () => {
    try {
      const response = await axios.get(`${API_URL}/api/category-performance`);
      return response.data;
    } catch (error) {
      console.error('Error fetching category performance:', error);
      throw error;
    }
  },
  
  // Get monthly sales data
  getMonthlySales: async () => {
    try {
      const response = await axios.get(`${API_URL}/api/monthly-sales`);
      return response.data;
    } catch (error) {
      console.error('Error fetching monthly sales:', error);
      throw error;
    }
  },
  
  // Get customer acquisition data
  getCustomerAcquisition: async () => {
    try {
      const response = await axios.get(`${API_URL}/api/customer-acquisition`);
      return response.data;
    } catch (error) {
      console.error('Error fetching customer acquisition data:', error);
      throw error;
    }
  }
};

export default api;
