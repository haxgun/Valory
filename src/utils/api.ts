import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://api.henrikdev.xyz/valorant',
  headers: {
    'accept': 'application/json',
  },
});

export const checkApiKey = async (apiKey: string) => {
  try {
    const response = await apiClient.get('/v1/status/eu?api_key=' + apiKey);
    return response.status === 200;
  } catch (error: any) {
    console.error(error)
    return false
  }
};
