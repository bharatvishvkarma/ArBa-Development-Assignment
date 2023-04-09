
function addProductstoStore(products){
    return function (dispatch,getstate){
        for(var i=0;i<products.length;i++){
            if(!products[i].quantity) products[i].quantity = 0;
        }
        dispatch({
            type:"addProducts",
            payload:products,
        })
    }
}

export default addProductstoStore