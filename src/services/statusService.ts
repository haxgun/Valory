import apiClient from './apiClient';
import { useSettingsStore } from '@/stores/settings';

const settingsStore = useSettingsStore()

export const checkApiKey = async (): Promise<boolean> => {
  try {
    const response = await apiClient.get('/v1/status/eu');
    settingsStore.verifyApiKey = response.status === 200;
    return true;

  } catch (error) {
    console.error('API Key verification error:', error);
    settingsStore.verifyApiKey = false;
    return false;
  }
};
