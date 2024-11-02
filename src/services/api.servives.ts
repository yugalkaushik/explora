import axios from 'axios';

export const createApiService = (token: string) => {
  const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return {
    getProfile: () => api.get('/api/profile'),
    // Add other API calls here
  };
};