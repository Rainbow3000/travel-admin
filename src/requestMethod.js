import axios from "axios";

const URL=  "http://localhost:8080/api/v1"
const accessToken = JSON.parse(localStorage.getItem('user'))?.accessToken || null; 

const userRequest =  axios.create({
    baseURL:URL,
    headers:{
        "Authorization":"Bearer "+ accessToken
    }
})

export {userRequest}