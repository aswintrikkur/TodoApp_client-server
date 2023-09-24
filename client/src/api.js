import axios from "axios";

export const API_URL = 'http://localhost:3007/api/todo';


export const postTodoListAPI = async (method, data) => {
    const response = await axios(API_URL, {
        method,
        data
    })
    return response;
}