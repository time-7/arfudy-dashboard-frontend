import axios from 'axios';

export const Api = axios.create({
  baseURL: 'https://arfudy-nestjs-backend.onrender.com/api',
  timeout: 60000,
  headers: {
    'content-type': 'application/json',
  },
});
