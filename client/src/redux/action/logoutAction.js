
function logout(){
    
    return function (dispatch,getstate){
        dispatch({
            type:"logout",
            payload:"nothing"
        })
    }
}

export default logout