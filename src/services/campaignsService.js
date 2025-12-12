/**
 * Campaigns Service
 * Handles all campaign-related API operations
 */

import apiClient from './apiClient';

const campaignsService = {
  /**
   * Get paginated list of campaigns
   */
  async getCampaigns(params = {}) {
    try {
      const response = await apiClient.get('/api/campaigns', params);
      return response;
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch campaigns');
    }
  },

  /**
   * Get a single campaign by ID
   */
  async getCampaign(campaignId) {
    try {
      const response = await apiClient.get(`/api/campaigns/${campaignId}`);
      return response;
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch campaign');
    }
  },

  /**
   * Create a new campaign
   */
  async createCampaign(campaignData) {
    try {
      const response = await apiClient.post('/api/campaigns', campaignData);
      return response;
    } catch (error) {
      throw new Error(error.message || 'Failed to create campaign');
    }
  },

  /**
   * Update a campaign
   */
  async updateCampaign(campaignId, updateData) {
    try {
      const response = await apiClient.put(`/api/campaigns/${campaignId}`, updateData);
      return response;
    } catch (error) {
      throw new Error(error.message || 'Failed to update campaign');
    }
  },

  /**
   * Delete a campaign
   */
  async deleteCampaign(campaignId) {
    try {
      const response = await apiClient.delete(`/api/campaigns/${campaignId}`);
      return response;
    } catch (error) {
      throw new Error(error.message || 'Failed to delete campaign');
    }
  },
};

export default campaignsService;
