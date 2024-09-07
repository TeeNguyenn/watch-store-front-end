import axios from "axios";


const request = axios.create({
    baseURL: 'http://localhost:8080/api/v1/',
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
        "Accept-Language": "en",
    },

})

// custom get method of instance axios
export const get = async (path: string, options = {}) => {
    const response = await request.get(path, options);

    return response.data;
}


export default request;
