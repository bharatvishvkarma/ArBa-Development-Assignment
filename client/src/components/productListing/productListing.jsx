import { useDispatch } from 'react-redux'
import { deleteOneProduct, getAllProducts } from '../../api/userData'
import addProductstoStore from '../../redux/action/productaction'
import styles from './productListing.module.css'
import EditProduct from '../edit/editproduct'
import { useState } from 'react'

function ProductListing({ product,user }) {
    // const {title,price,image}= product
    // console.log(product)
    const dispatch = useDispatch()
    const [show,setShow] = useState(false)
    const [data,setData] = useState()

    function deleteProduct(id){
        deleteOneProduct(id)
        .then((res)=>{
            // console.log(res.data.Products)
            dispatch(addProductstoStore(res.data.Products))
        })
    }

    function showBox(item){
        setData(item)
        setShow(true)
    }

    return (
        <div>
            {show ? <EditProduct product = {data} setShow = {setShow} />:<div></div>}
            <table>
                <thead>
                    <td>Image</td>
                    <td>Name</td>
                    <td>Price</td>
                    <td>Action</td>
                </thead>
                
                {
                    product.filter((item)=>{
                        // console.log(user._id, item._id)
                        return user._id === item.owner
                    })
                    .map((item, index) => (
                        <tr>
                            <td><img className={styles.image} src = {item.image} /></td>
                            <td>{item.title}</td>
                            <td>{item.price}</td>
                            <td><button onClick={()=>showBox(item)}>Edit</button>
                            <button onClick={()=> deleteProduct(item._id)}>Delete</button></td>
                        </tr>
                    ))
                }
                {
                    product.filter((item)=>{
                        return user._id === item.owner
                    }).length<1?<div>
                        <h2>No data</h2>
                    </div>:null
                    
                }
            </table>

        </div>
    )
}

export default ProductListing