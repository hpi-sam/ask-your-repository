import axios from 'axios';

export default () => axios.create({
  baseURL: process.env.ELIJA_URL,
  timeout: 2000,
});
