import axios from "axios";
const baseurl = 'http://localhost:3000/api'

const axiosinstance = axios.create({
    baseURL : baseurl,
    withCredentials:true
})

export default axiosinstance