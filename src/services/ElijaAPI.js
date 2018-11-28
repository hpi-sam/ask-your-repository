import axios from 'axios';

const api = axios.create({
  baseURL: process.env.ELIJA_URL,
  timeout: 2000,
});

export default api;
