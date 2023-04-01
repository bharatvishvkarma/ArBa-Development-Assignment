import axios from 'axios'

const url =  'http://localhost:7777'

export const updateImg = async (file)=>{
    return await axios.post(`${url}/file/upload`,file)
}

export const addUser = async (user)=>{
    return await axios.post(`${url}/user/register`, user)
}

export const logIn = async(user)=>{
    return await axios.post(`${url}/user/login`, user)
}

export const getAllProducts = async()=>{
    return await axios.get(`${url}/product/getall`)
}