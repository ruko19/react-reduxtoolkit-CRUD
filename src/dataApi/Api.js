import axios from "axios";

export const usersAPI = axios.create({
    baseURL: "https://api-prueba-users-production.up.railway.app"
})