import axios from 'axios'

const url =  'https://long-tan-sea-lion-gown.cyclic.app'

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

export const getCategories = async()=>{
    return await axios.get(`${url}/category/get`)
}

export const addOneCategory = async(data)=>{
    return await axios.post(`${url}/category/add`,data)
}

export const addProduct = async(data)=>{
    return await axios.post(`${url}/product/add`,data)
}