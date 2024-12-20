import axios from 'axios';

export const Axios = axios.create({
    baseURL: 'https://arfudy-backend-52nv.onrender.com/api',
    timeout: 60000,

    headers: {
        'content-type': 'application/json'
    }
});
