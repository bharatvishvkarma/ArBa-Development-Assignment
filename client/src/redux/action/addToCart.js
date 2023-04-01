
function addToCart(products){
    return function (dispatch,getstate){
        dispatch({
            type:"addToCart",
            payload:products
        })
    }
}

export default addToCart