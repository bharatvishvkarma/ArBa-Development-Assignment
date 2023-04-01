
import Navbar from "../navbar/navbar"
import { useSelector } from "react-redux"
import Product from "../product/product"
import { useEffect, useState } from "react"
import { getAllProducts } from "../../api/userData"
import { useDispatch } from "react-redux"
import addProductstoStore from "../../redux/action/productaction"
import styles from "./allProducts.module.css"
import addToCart from "../../redux/action/addToCart"

function AllProducts({setLoad}) {

    const { isLoggedIn, user, products, cartProducts } = useSelector(state => state)
    // console.log(products)
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        let arr = JSON.parse(localStorage.getItem('allProducts')) || []
        if (products.length < 1 && arr.length > 0) {
            dispatch(addProductstoStore(arr))
        }
        else if (arr.length < 1 && products.length < 1) {
            getAllProducts()
                .then((res) => {
                    // console.log(res.data.Products)
                    for (let i = 0; i < res.data.Products.length; i++) {
                        arr.push(res.data.Products[i])
                        arr[i].quantity = 0;
                    }
                    setLoad(true)
                    dispatch(addProductstoStore(arr))
                })
        }
        setLoading(false)
        setLoad(true)
        
    }, [products])
    console.log(products)
    function addQuantity(_id) {
        for (let i = 0; i < products.length; i++) {
            if (products[i]._id == _id) {
                products[i].quantity++;
                if (products[i].quantity == 1) {
                    // cartProducts.push(products[i])
                    let arr = []
                    arr.push(products[i])
                    dispatch(addToCart(arr))
                    localStorage.setItem('cart', JSON.stringify(arr))
                }
                else {
                    for (let j = 0; j < cartProducts.length; j++) {
                        if (_id === cartProducts[j]._id) {
                            // cartProducts[j].quantity++;
                            dispatch(addToCart(cartProducts))
                            localStorage.setItem('cart', JSON.stringify(cartProducts))
                            break;
                        }
                    }
                }
                break;
            }
        }
        dispatch(addProductstoStore(products))
    }
    function substractQuantity(_id) {
        for (let i = 0; i < products.length; i++) {
            if (products[i]._id == _id) {
                products[i].quantity--;
                if (products[i].quantity == 0) {
                    for (let j = 0; j < cartProducts.length; j++) {
                        if (_id == cartProducts[j]._id) {
                            cartProducts.splice(j, 1);
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

    return (

        loading ? <div>Loading...</div> : <div className={styles.main}>
            {/* <Product /> */}
            <div className={styles.allProducts}>
                {
                    products.length > 0 ? products.map((item, index) => {
                        return (
                            <Product key={index} data={item} addQuantity={addQuantity}
                                substractQuantity={substractQuantity} />
                        )
                    }) : null
                }
            </div>
        </div>



    )
}

export default AllProducts