import axios from "axios";

const API_URL = "http://localhost:8080/api";

export const signup = async (userData) => {
    return axios.post(`${API_URL}/auth/signup`,userData);
}

export const login = async (loginData) => {
    return axios.post(`${API_URL}/auth/login`,loginData);
}

