/**
 * Authentication Service
 * Handles user login, registration, and session management
 */

import apiClient from './apiClient';

const authService = {
  /**
   * Register a new user
   */
  async register(userData) {
    try {
      const response = await apiClient.post('/api/auth/register', userData);
      
      // Save token
      if (response.access_token) {
        apiClient.setToken(response.access_token);
      }
      
      return response;
    } catch (error) {
      throw new Error(error.message || 'Registration failed');
    }
  },

  /**
   * Login user
   */
  async login(credentials) {
    try {
      const response = await apiClient.post('/api/auth/login', credentials);
      
      // Save token
      if (response.access_token) {
        apiClient.setToken(response.access_token);
      }
      
      return response;
    } catch (error) {
      throw new Error(error.message || 'Login failed');
    }
  },

  /**
   * Get current user info
   */
  async getCurrentUser() {
    try {
      const token = apiClient.getToken();
      if (!token) {
        throw new Error('No auth token found');
      }
      
      const response = await apiClient.get(`/api/auth/me?token=${token}`);
      return response;
    } catch (error) {
      throw new Error(error.message || 'Failed to get user info');
    }
  },

  /**
   * Logout user
   */
  async logout() {
    try {
      await apiClient.post('/api/auth/logout');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Always remove token on logout
      apiClient.removeToken();
      localStorage.removeItem('user');
    }
  },

  /**
   * Check if user is authenticated
   */
  isAuthenticated() {
    return !!apiClient.getToken();
  },

  /**
   * Get stored user from localStorage
   */
  getStoredUser() {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        return JSON.parse(userStr);
      } catch (e) {
        return null;
      }
    }
    return null;
  },

  /**
   * Save user to localStorage
   */
  saveUser(user) {
    localStorage.setItem('user', JSON.stringify(user));
  },
};

export default authService;
