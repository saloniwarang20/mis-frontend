import api from "./api";

export const signup = async (userData) => {
    return api.post("auth/signup",userData);
}

export const login = async (loginData) => {
    return api.post("auth/login",loginData);
}

