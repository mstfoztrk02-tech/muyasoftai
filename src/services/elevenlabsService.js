/**
 * ElevenLabs Service
 * Handles TTS/STT operations via ElevenLabs API
 */

import apiClient from './apiClient';

const elevenlabsService = {
  /**
   * Get available voices
   */
  async getVoices() {
    try {
      const response = await apiClient.get('/api/elevenlabs/voices');
      return response;
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch voices');
    }
  },

  /**
   * Convert text to speech
   */
  async textToSpeech(text, voiceId, modelId = 'eleven_multilingual_v2', voiceSettings = null) {
    try {
      const response = await apiClient.post('/api/elevenlabs/text-to-speech', {
        text,
        voice_id: voiceId,
        model_id: modelId,
        voice_settings: voiceSettings
      });
      return response;
    } catch (error) {
      throw new Error(error.message || 'Failed to generate speech');
    }
  },

  /**
   * Convert text to speech with streaming
   */
  async textToSpeechStream(text, voiceId, modelId = 'eleven_multilingual_v2', voiceSettings = null) {
    try {
      const response = await apiClient.post('/api/elevenlabs/text-to-speech/stream', {
        text,
        voice_id: voiceId,
        model_id: modelId,
        voice_settings: voiceSettings
      });
      return response;
    } catch (error) {
      throw new Error(error.message || 'Failed to generate streamed speech');
    }
  },

  /**
   * Get available models
   */
  async getModels() {
    try {
      const response = await apiClient.get('/api/elevenlabs/models');
      return response;
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch models');
    }
  },

  /**
   * Play audio from base64
   */
  playAudioFromBase64(base64Audio) {
    try {
      const audio = new Audio(`data:audio/mpeg;base64,${base64Audio}`);
      audio.play();
      return audio;
    } catch (error) {
      throw new Error('Failed to play audio');
    }
  },
};

export default elevenlabsService;
