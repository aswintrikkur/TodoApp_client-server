import axios from "axios";

// export const API_URL = `${import.meta.env.VITE_API_URL}/api/todo` || 'http://localhost:3007/api/todo';    // for project hosted on vercel 
export const API_URL =  'http://localhost:3007/api/todo';    // for project hosted on vercel 


export const postTodoListAPI = async (method, data) => {
    try {
        const response = await axios(API_URL , {
            method,
            data
        })
        return response;
    } catch (error) {
        console.log(error.response.data.message);
    }
}