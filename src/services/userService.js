import axios from 'axios';

const fetchAllApi = () => {
    return axios.get('https://reqres.in/api/users?page=1');
};

export { fetchAllApi };
