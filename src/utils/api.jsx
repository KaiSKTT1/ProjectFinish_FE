import axios from "axios";

const api = axios.create({
    baseURL: 'http://localhost:8080/identity',
    timeout: 10000,
    headers: { 'content-type': 'application/json' }
});

export default api;
