import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:3001/",
});

const getUsers = () => instance.get("/users");
const deleteUser = (id) => instance.delete(`/users/${id}`);
const addUser = (user) => instance.post('/users', user);

const api = {
  getUsers,
  deleteUser,
  addUser,
};

export default api;