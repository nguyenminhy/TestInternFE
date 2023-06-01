import axios from './customize-axios';

const fetchAllApi = (page) => {
    return axios.get(`api/users?page=${page}`);
};

const postCreateUser = (name, job) => {
    return axios.post('api/users', { name: name, job: job });
    // Có thể viết {name, job}
};

export { fetchAllApi, postCreateUser };
