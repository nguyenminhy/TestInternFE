import axios from './customize-axios';

const fetchAllApi = (page) => {
    return axios.get(`api/users?page=${page}`);
};

const postCreateUser = (name, job) => {
    return axios.post('api/users', { name: name, job: job });
    // Có thể viết {name, job}
};

const putUpdateUser = (name, job) => {
    return axios.put('api/users/', { name: name, job: job });
};

const deleteUser = (id) => {
    return axios.delete(`api/users/${id}`);
};

const loginApi = (email, password) => {
    return axios.post('api/login', { email, password });
};

export { fetchAllApi, postCreateUser, putUpdateUser, deleteUser, loginApi };
