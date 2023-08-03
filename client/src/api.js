import axios from "axios";

export const API_URL = 'https://pv9c69-4000.csb.app/api/todo';


export const postTodoListAPI = async (method, data) => {
    const response = await axios(API_URL, {
        method,
        data
    })
    return response;
}