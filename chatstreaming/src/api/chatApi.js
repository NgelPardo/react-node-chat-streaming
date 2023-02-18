import axios from "axios";
import { getEnvVariables } from "../helpers/getEnvVariables";


const { VITE_API_URL } = getEnvVariables();

const chatApi = axios.create({
    baseURL: "http://localhost:4000/api"
});

chatApi.interceptors.request.use( config => {

    config.headers = {
        ...config.headers,
        'x-token': localStorage.getItem('token')    
    }

    return config;
})


export default chatApi;
