import api from "./api";

export const signup = (userData) => {
    return api.post("auth/signup",userData);
}

export const login = (loginData) => {
    return api.post("auth/login",loginData);
}

