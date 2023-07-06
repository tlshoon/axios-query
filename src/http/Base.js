import axios from 'axios'

export const instance = axios.create({
    baseURL: "https://reqres.in",
    headers: { "Content-type": "application/json; charset=UTF-8" },
    responseType: "json",
})


