import styles from './cart.module.css'
import Product from '../../components/product/product'
import { useDispatch } from "react-redux"
import { useSelector } from 'react-redux'
import addToCart from '../../redux/action/addToCart'
import addProductstoStore from '../../redux/action/productaction'
import { useNavigate } from "react-router-dom";

function Cart(){

    const {products, cartProducts } = useSelector(state => state)
    const dispatch = useDispatch()
    // console.log(cartProducts)
    const navigate = useNavigate()
    function addQuantity(_id){
        for(let i=0;i<products.length;i++){
            if(products[i]._id == _id){
                products[i].quantity++;
                if(products[i].quantity == 1){
                    cartProducts.push(products[i])
                    dispatch(addToCart(cartProducts))
                }
                else {
                    for(let j=0;j<cartProducts.length;j++){
                        if(_id === cartProducts[j]._id){
                            // cartProducts[j].quantity++;
                            dispatch(addToCart(cartProducts))
                            break;
                        }
                    }
                }
                break;
            }
        }
        dispatch(addProductstoStore(products))
    }
    function substractQuantity(_id){

        for(let i=0;i<products.length;i++){
            if(products[i]._id == _id){
                products[i].quantity--;
                if(products[i].quantity == 0){
                    // console.log('its 0')
                    for(let j=0;j<cartProducts.length;j++){
                        if(_id == cartProducts[j]._id){
                            cartProducts.splice(j,1);
                            dispatch(addToCart(cartProducts))
                            break;
                        }
                    }
                }
                else{
                    for(let j=0;j<cartProducts.length;j++){
                        if(_id == cartProducts[j]._id){
                            
                            dispatch(addToCart(cartProducts))
                            break;
                        }
                    }
                }
                dispatch(addToCart(cartProducts))
                break;
            }
        }
        dispatch(addProductstoStore(products))
    }
    return (
        <div className={styles.main}>
            {cartProducts.length>0?<div className={styles.allProducts}>
                {
                    cartProducts.map((item,index)=>(
                        <Product key={index} data = {item} addQuantity = {addQuantity} 
                        substractQuantity = {substractQuantity}/>
                    ))
                }
            </div>:<div>
                <h1 style={{color:"red",textAlign:"center"}}>No items in the cart</h1>
                </div>}
            <div className={styles.btnAllProducts}>
                <button >{"CheckOut >>"} </button>
            </div>
        </div>
    )
}

export default Cart