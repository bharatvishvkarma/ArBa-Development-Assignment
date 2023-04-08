import { useEffect, useState } from 'react'
import styles from './mystore.module.css'
import ProductListing from '../../components/productListing/productListing'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import CategoryListing from '../../components/categoryList/categoryList'
import { getAllProducts, getCategories } from '../../api/userData'
import addCategory from '../../redux/action/addCategory'
import AddCategory from '../addProduct/addcategory'
import AddProduct from '../addProduct/addproduct'
import addProductstoStore from '../../redux/action/productaction'

function MyStore(){
    const [choose,setChoose] = useState("category")
    const {products,user,categories} = useSelector(state => state)
    const navigate = useNavigate()
    // console.log(categories)
    const dispatch = useDispatch()
    const [addProcuctBox, setaddProcuctBox] = useState(false)
    const [addCetogoryBox ,setCategoryBox] = useState(false)
    // const [refresh,setRefresh] = useState(false)

    useEffect(()=>{
        getCategories()
        .then((res)=>{
            // console.log(res.data)
            dispatch(addCategory(res.data.category))
        })
    },[])
    
    function refreshCategory(){
        setaddProcuctBox(false)
                    setCategoryBox(false)
        getCategories()
        .then((res)=>{
            // console.log(res.data)
            dispatch(addCategory(res.data.category))
        })
    }

    function refreshProducts(){
        setaddProcuctBox(false)
                    setCategoryBox(false)
        getAllProducts()
        .then((res)=>{
            console.log(res)
            dispatch(addProductstoStore(res.data.Products))
        })
    }

    return (
        <div  className={styles.container}>
            <div className={styles.choose}>
                <div className={choose === "category"?styles.select:""} onClick={()=>{
                    console.log("set")
                    setChoose("category")
                    setaddProcuctBox(false)
                    setCategoryBox(false)
                    }}>
                    Category
                </div>
                <div className={choose === "products"?styles.select:""} onClick={()=>{
                    setChoose("products")
                    setaddProcuctBox(false)
                    setCategoryBox(false)
                }
                }>
                    Products
                </div>
            </div>
            {
                choose === "products"?
                <div >
                    <div  style={{textAlign:"left"}}>
                    <button onClick={refreshProducts} >Refresh</button>
                    <button >Filter</button>
                    <button  onClick={()=>setaddProcuctBox(!addProcuctBox)}>Add Product</button>
                         
                    </div>
                    <ProductListing product = {products} user = {user}/>
                </div>
                
                :<div>
                    <div style={{textAlign:"left"}}>
                        <button onClick={
                            refreshCategory
                            
                            } >Refresh</button>
                        <button >Filter</button>
                        <button  onClick={()=>setCategoryBox(!addCetogoryBox)}>Add Category</button>
                    </div>
                    <CategoryListing category = {categories} user = {user}/>
                </div>
            }
            {
                addCetogoryBox ?<AddCategory setCategoryBox = {setCategoryBox}/>:<div></div>
            }
            {
                addProcuctBox ? <AddProduct setaddProcuctBox = {setaddProcuctBox}/>:<div></div>
            }
            
            
        </div>
    )
}

export default MyStore