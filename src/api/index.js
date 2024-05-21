import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3003/',
});

const getUsers = () => instance.get('/users');
const deleteUser = (id) => instance.delete(`/users/${id}`);
const addUser = (user) => instance.post('/users', user);
const login = (credentials) => instance.post('/login', credentials);
const register = (user) => instance.post('/register', user);
const deleteLogin = (id) => instance.delete(`/login/${id}`)

const api = {
  getUsers,
  deleteUser,
  addUser,
  login,
  register,
  deleteLogin
};

export default api;