import axios from 'axios'
import {store} from '../store'


const axiosInstance = axios.create({
    baseURL:'http://localhost:8000/'

});

axiosInstance.interceptors.request.use((config)=>{
    const token = store.getState().auth.userToken;
    if(token){
        config.headers['Authorization'] = 'Bearer ${token}';
        


    }
    return config
}, (error) =>{
    return Promise.reject(error);
});

export default axiosInstance;
