import axios from './customize-axios';

const fetchAllApi = (page) => {
    return axios.get(`api/users?page=${page}`);
};

export { fetchAllApi };
