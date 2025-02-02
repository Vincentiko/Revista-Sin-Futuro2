import axios from 'axios';
import {getEnvVariables} from '../helpers';

const {VITE_API_URL} = getEnvVariables()

const revistaApi = axios.create({
    baseURL: VITE_API_URL
});

//Todo: configurar interceptores
revistaApi.interceptors.request.use(config => {
    config.headers = {
        ...config.headers,
        'x-token': localStorage.getItem('token')
    }

    return config;
})

export default revistaApi;