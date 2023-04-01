import axios from "axios";

const url = `https://long-tan-sea-lion-gown.cyclic.app/user/loggedInUser`
function getData(token){
    return function (dispatch,getState){
        axios.get(url,{
            headers:{
                'authorization': `Bearer ${token}`
            }
        })
        .then((response)=>{
            // console.log(response.data.data)
            dispatch({
                type:"loggedIn",
                payload:response.data.data
            })
        })
        .catch((err)=>
            dispatch({
                type:"loggedInFail",
                payload:err.message
            })
            
        )
    }
}

export default getData

// export const checkLoggedIn = async ()=>{
//     let token = localStorage.getItem('token')
//     return await axios.get(`${url}/loggedInUser`,{
//        headers: {
//           'authorization': `Bearer ${token}`
//        }
//     })
//  }