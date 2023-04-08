import axios from 'axios'

const url = 'http://localhost:7777'
// const url =  'https://long-tan-sea-lion-gown.cyclic.app'

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

export const deleteOneProduct = async(id)=>{
    return await axios.delete(`${url}/product/delete/${id}`)
}

export const deleteOneCategory = async(id)=>{
    return await axios.delete(`${url}/category/delete/${id}`)
}

export const getOneProduct = async(id)=>{
    return await axios.get(`${url}/product/get/${id}`)
}

export const updateProduct = async(data,id)=>{
    return await axios.patch(`${url}/product/update/${id}`,data)
}

export const updateCategory = async(data,id)=>{
    return await axios.patch(`${url}/category/update/${id}`,data)
}