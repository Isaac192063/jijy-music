import axios from "axios";

const BASE_URL = "http://localhost:8080/api/v1";


export const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json"
    }
})

export const apiPart = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "multipart/form-data"
    }
})


