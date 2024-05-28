import axios from "axios";

const api = axios.create({
    baseURL: 'http://localhost:3000/api',
    withCredentials: true
})

export const makeRequest = async (method = "GET", url, data = {}) => {
    try {
        const response = await api({
            method,
            url: api.defaults.baseURL + url,
            data,
        });
        return response.data;
    } catch (error){
        throw error.response ? error.response.data : new Error('Network Error');
    }
}