import { useSelector } from 'react-redux'
import styles from './addproduct.module.css'
import { useState } from 'react'
import { addProduct,getAllProducts,updateImg } from '../../api/userData'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux'
import addProductstoStore from '../../redux/action/productaction'

function AddProduct() {

    const {products, categories, user } = useSelector(state => state)
    const [product, setProducts] = useState({})
    const navigate = useNavigate()
    const [file, setFile] = useState(null)
    const dispatch = useDispatch()
    function handleInput(e) {
        setProducts({ ...product, [e.target.name]: e.target.value })
    }
    // console.log(product)
    async function addOneProduct() {
        console.log("sdfdfs")
        let obj = { ...product }
        obj.owner = user._id
        let data
            if(file){
                const formData = new FormData();
                formData.append('image',file)
                let result = await updateImg(formData)
                data = result.data.file.Location
            }
            
        data?obj.image = data:obj.image="https://st.depositphotos.com/2001755/3622/i/600/depositphotos_36220949-stock-photo-beautiful-landscape.jpg"
        addProduct(obj)
            .then((res) => {
                // console.log(res)
                products.push(res.data.product)
                dispatch(addProductstoStore(products))
                toast('Product added successfully',{
                    type: 'success',
                })
                navigate('/mystore')
            })
    }
    function handleFile(e){
        
        let image = e.target.files[0]
        console.log(image)
        setFile(image)
    }

    return (
        <div className={styles.inputBox}>
            <input onChange={handleInput} name='title' type="text" placeholder="title" />
            <input onChange={handleInput} name='description' type="text" placeholder="description" />
            <input onChange={handleInput} name='price' type="number" placeholder="price" />

            <select onChange={handleInput} name='category'>
                {
                    categories.map((item) => (
                        <option value={item._id}>{item.name}</option>
                    ))
                }
            </select>

            <input type = "file"
                    name = "image" 
                    label = "image"
                    accept = ".jpeg, .jpg, .png"
                    onChange={handleFile}
            />
            <button onClick={addOneProduct}>Add Product</button>
        </div>
    )
}

export default AddProduct