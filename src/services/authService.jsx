import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}`;

export const signup = async (userData) => {
    return axios.post(`${API_URL}/auth/signup`,userData);
}

export const login = async (loginData) => {
    return axios.post(`${API_URL}/auth/login`,loginData);
}

