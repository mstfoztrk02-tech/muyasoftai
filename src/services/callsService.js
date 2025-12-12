/**
 * Calls Service
 * Handles all call-related API operations
 */

import apiClient from './apiClient';

const callsService = {
  /**
   * Get paginated list of calls
   */
  async getCalls(params = {}) {
    try {
      const response = await apiClient.get('/api/calls', params);
      return response;
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch calls');
    }
  },

  /**
   * Get a single call by ID
   */
  async getCall(callId) {
    try {
      const response = await apiClient.get(`/api/calls/${callId}`);
      return response;
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch call');
    }
  },

  /**
   * Create a new call
   */
  async createCall(callData) {
    try {
      const response = await apiClient.post('/api/calls', callData);
      return response;
    } catch (error) {
      throw new Error(error.message || 'Failed to create call');
    }
  },

  /**
   * Update a call
   */
  async updateCall(callId, updateData) {
    try {
      const response = await apiClient.put(`/api/calls/${callId}`, updateData);
      return response;
    } catch (error) {
      throw new Error(error.message || 'Failed to update call');
    }
  },

  /**
   * Delete a call
   */
  async deleteCall(callId) {
    try {
      const response = await apiClient.delete(`/api/calls/${callId}`);
      return response;
    } catch (error) {
      throw new Error(error.message || 'Failed to delete call');
    }
  },

  /**
   * Start automatic calling
   */
  async startAutoCalls(callCount, phoneNumbers) {
    try {
      const response = await apiClient.post('/api/calls/auto-start', {
        call_count: callCount,
        phone_numbers: phoneNumbers,
      });
      return response;
    } catch (error) {
      throw new Error(error.message || 'Failed to start automatic calls');
    }
  },

  /**
   * Stop automatic calling
   */
  async stopAutoCalls() {
    try {
      const response = await apiClient.post('/api/calls/auto-stop');
      return response;
    } catch (error) {
      throw new Error(error.message || 'Failed to stop automatic calls');
    }
  },
};

export default callsService;
