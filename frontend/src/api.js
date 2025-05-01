import axios from "axios";

const baseURL = 'http://localhost:8080/api';

const api = axios.create({
    baseURL: baseURL,
    headers: {
        'Content-Type': "application/json",
    },
});

api.interceptors.request.use(
    config => {
        // niz endpointa na kojima ne želimo dodavati Authorization header
        const skipAuth = ['/login', '/register', '/reset'];

        // ako URL završava jednim od njih, samo vrati config bez mijenjanja
        if (!skipAuth.some(ep => config.url.endsWith(ep))) {
            const token = localStorage.getItem('token');
            console.log("Should add the token");
            if (token) {
                console.log("Added the token");
                config.headers.Authorization = `Bearer ${token}`;
            }
        }

        return config;  // OBAVEZNO vraćaš config
    },
    error => {
        console.error("Interceptor request error:", error);
        return Promise.reject(error);
    }
);

export default api;