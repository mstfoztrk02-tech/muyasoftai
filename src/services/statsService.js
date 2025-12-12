/**
 * Statistics Service
 * Handles dashboard statistics and KPI data
 */

import apiClient from './apiClient';

const statsService = {
  /**
   * Get dashboard statistics
   */
  async getDashboardStats() {
    try {
      const response = await apiClient.get('/api/stats/dashboard');
      return response;
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch dashboard stats');
    }
  },
};

export default statsService;
