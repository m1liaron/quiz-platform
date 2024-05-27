import axios from "axios";

const api = axios.create({
    baseURL: 'http://localhost:3000/api',
})

export const makeRequest = async (method = "GET", url, data = {}, headers = []) => {
    const token = localStorage.getItem("token") || "";

    try {
        const response = await api({
            method,
            url: api.defaults.baseURL + url,
            data,
            headers: {
                // ...headers,
                authorization: `Bearer ${token}` // Add the Authorization header with the token
            }
        });
        return response.data;
    } catch (error){
        throw error.response ? error.response.data : new Error('Network Error');
    }
}