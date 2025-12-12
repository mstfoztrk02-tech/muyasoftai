/**
 * Trunks Service
 * Handles all trunk-related API operations
 */

import apiClient from './apiClient';

const trunksService = {
  /**
   * Get paginated list of trunks
   */
  async getTrunks(params = {}) {
    try {
      const response = await apiClient.get('/api/trunks', params);
      return response;
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch trunks');
    }
  },

  /**
   * Get a single trunk by ID
   */
  async getTrunk(trunkId) {
    try {
      const response = await apiClient.get(`/api/trunks/${trunkId}`);
      return response;
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch trunk');
    }
  },

  /**
   * Create a new trunk
   */
  async createTrunk(trunkData) {
    try {
      const response = await apiClient.post('/api/trunks', trunkData);
      return response;
    } catch (error) {
      throw new Error(error.message || 'Failed to create trunk');
    }
  },

  /**
   * Update a trunk
   */
  async updateTrunk(trunkId, updateData) {
    try {
      const response = await apiClient.put(`/api/trunks/${trunkId}`, updateData);
      return response;
    } catch (error) {
      throw new Error(error.message || 'Failed to update trunk');
    }
  },

  /**
   * Delete a trunk
   */
  async deleteTrunk(trunkId) {
    try {
      const response = await apiClient.delete(`/api/trunks/${trunkId}`);
      return response;
    } catch (error) {
      throw new Error(error.message || 'Failed to delete trunk');
    }
  },

  /**
   * Perform health check on a specific trunk
   */
  async performHealthCheck(trunkId) {
    try {
      const response = await apiClient.post(`/api/trunks/${trunkId}/health-check`);
      return response;
    } catch (error) {
      throw new Error(error.message || 'Failed to perform health check');
    }
  },

  /**
   * Perform health check on all trunks
   */
  async performHealthCheckAll() {
    try {
      const response = await apiClient.post('/api/trunks/health-check-all');
      return response;
    } catch (error) {
      throw new Error(error.message || 'Failed to perform health check on all trunks');
    }
  },
};

export default trunksService;
