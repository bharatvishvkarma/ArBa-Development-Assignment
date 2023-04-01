
function addCategory(data){
    return function (dispatch, getstate){
        dispatch({
            type:"addCategory",
            payload:data,
        })
    }
}

export default addCategory