import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:4000', // Cambia esto con la URL de tu API
});

export default api;
