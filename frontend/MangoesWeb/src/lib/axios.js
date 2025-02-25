import axios from "axios";

 const axiosInstance = axios.create({
    baseURL : "https://mangoexpress-backend.onrender.com/api",
    withCredentials: true,
});
export default axiosInstance;
