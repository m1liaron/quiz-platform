import axios from "axios";

const api = axios.create({
    baseURL: 'https://localhost:3000/api',
})

export const makeRequest = async (method = "GET", url, data = {}, headers = []) => {
    const token = localStorage.getItem("token");
    if (!token) {
        throw new Error('Authorization token not found. Please login to make requests.');
    }

    try {
        const response = await api({
            method,
            url,
            data,
            headers: {
                ...headers,
                authorization: token // Add the Authorization header with the token
            }
        });
        return response.data;
    } catch (error){
        throw error.response ? error.response.data : new Error('Network Error');
    }
}