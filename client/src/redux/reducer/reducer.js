import { json } from "react-router-dom"

let intialData = {
    isLoggedIn: false,
    user: {
        
    },
    products: JSON.parse(localStorage.getItem('allProducts')) || [],
    cartProducts: JSON.parse(localStorage.getItem('cart')) || [],
    categories : []
}

const reducer = (state=intialData,action)=>{
    if(action.type == 'loggedIn'){
        state = {...state, isLoggedIn:true,user:action.payload}
        // state = {...state, user:action.payload}
    }
    if(action.type === 'addProducts'){
        state = {...state, products:action.payload}
        localStorage.setItem('allProducts',JSON.stringify(action.payload))
    }
    if(action.type === 'addToCart'){
        state = {...state, cartProducts:action.payload}
        localStorage.setItem('cart',JSON.stringify(action.payload))
    }
    if(action.type === 'logout'){
        state = {...state, isLoggedIn:false,user:{}}
    }
    if(action.type === 'addCategory'){
        state = {...state, categories:action.payload}
    }
    return state
}

export default reducer