import Axios from 'axios';
const httpClient = Axios.create({
  baseURL: 'http://localhost:3000/users',
});

export const fetchAllUsers = () => httpClient('/');

export const getUserById = (id) => httpClient(`/${id}`);

export const deleteUserById = (id) => httpClient.delete(`/${id}`);

export const updateUserById = (updatedUser) => httpClient.put(`/${updatedUser.id}`, updatedUser);

export const createNewUser = (newUser) => httpClient.post('/', newUser);
