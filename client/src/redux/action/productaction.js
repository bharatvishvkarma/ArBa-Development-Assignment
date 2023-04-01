
function addProductstoStore(products){
    return function (dispatch,getstate){
        dispatch({
            type:"addProducts",
            payload:products,
        })
    }
}

export default addProductstoStore