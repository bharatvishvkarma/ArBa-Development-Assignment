import { useEffect, useState } from 'react'
import styles from './mystore.module.css'
import ProductListing from '../../components/productListing/productListing'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import CategoryListing from '../../components/categoryList/categoryList'
import { getCategories } from '../../api/userData'
import addCategory from '../../redux/action/addCategory'


function MyStore(){
    const [choose,setChoose] = useState("category")
    const {products,user,categories} = useSelector(state => state)
    const navigate = useNavigate()
    // console.log(categories)
    const dispatch = useDispatch()

    useEffect(()=>{
        getCategories()
        .then((res)=>{
            // console.log(res.data)
            dispatch(addCategory(res.data.category))
        })
    },[])
    

    return (
        <div className={styles.container}>
            <div className={styles.choose}>
                <div className={choose === "category"?styles.select:""} onClick={()=>{
                    console.log("set")
                    setChoose("category")
                    }}>
                    Category
                </div>
                <div className={choose === "products"?styles.select:""} onClick={()=>setChoose("products")}>
                    Products
                </div>
            </div>
            {
                choose === "products"?
                <div>
                    <div style={{textAlign:"center"}}>
                         <button onClick={()=>navigate('/addProduct')}>Add Product</button>
                    </div>
                    <ProductListing product = {products} user = {user}/>
                </div>
                
                :<div>
                    <div style={{textAlign:"center"}}>
                         <button onClick={()=>navigate('/addcategory')}>Add Category</button>
                    </div>
                    <CategoryListing category = {categories} user = {user}/>
                </div>
            }
            
        </div>
    )
}

export default MyStore