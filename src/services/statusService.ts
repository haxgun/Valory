import apiClient from './apiClient';

export const checkApiKey = async (): Promise<boolean> => {
  try {
    const response = await apiClient.get('/v1/status/eu');
    return response.status === 200;
  } catch (error) {
    console.error('API Key verification error:', error);
    return false;
  }
};
