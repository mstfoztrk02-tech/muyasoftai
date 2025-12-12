/**
 * Settings Service
 * Handles application settings management
 */

import apiClient from './apiClient';

const settingsService = {
  /**
   * Get application settings
   */
  async getSettings() {
    try {
      const response = await apiClient.get('/api/settings');
      return response;
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch settings');
    }
  },

  /**
   * Update application settings
   */
  async updateSettings(settingsData) {
    try {
      const response = await apiClient.put('/api/settings', settingsData);
      return response;
    } catch (error) {
      throw new Error(error.message || 'Failed to update settings');
    }
  },

  /**
   * Update API keys
   */
  async updateAPIKeys(apiKeys) {
    try {
      const response = await apiClient.put('/api/settings', {
        api_keys: apiKeys
      });
      return response;
    } catch (error) {
      throw new Error(error.message || 'Failed to update API keys');
    }
  },

  /**
   * Update SMTP settings
   */
  async updateSMTP(smtpSettings) {
    try {
      const response = await apiClient.put('/api/settings', {
        smtp: smtpSettings
      });
      return response;
    } catch (error) {
      throw new Error(error.message || 'Failed to update SMTP settings');
    }
  },

  /**
   * Update general settings
   */
  async updateGeneral(generalSettings) {
    try {
      const response = await apiClient.put('/api/settings', {
        general: generalSettings
      });
      return response;
    } catch (error) {
      throw new Error(error.message || 'Failed to update general settings');
    }
  },

  /**
   * Update security settings
   */
  async updateSecurity(securitySettings) {
    try {
      const response = await apiClient.put('/api/settings', {
        security: securitySettings
      });
      return response;
    } catch (error) {
      throw new Error(error.message || 'Failed to update security settings');
    }
  },
};

export default settingsService;
