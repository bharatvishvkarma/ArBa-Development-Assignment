import { useEffect, useState } from 'react';
import styles from './edit.module.css';
import { getOneProduct } from '../../api/userData';
import { useDispatch, useSelector } from 'react-redux';
import { updateImg } from '../../api/userData';
import { updateProduct } from '../../api/userData';
import addProductstoStore from '../../redux/action/productaction';

function EditProduct({ product, setShow }) {
    const { products, categories, user } = useSelector(state => state)
    const [prod, setProducts] = useState(product)
    const [file, setFile] = useState()
    const dispatch = useDispatch()
    // useEffect(()=>{
    //     getOneProduct(id)
    //     .then((res)=>{
    //         console.log(res.data.produt)
    //     })
    // },[])

    function handleInput(e) {
        setProducts({ ...prod, [e.target.name]: e.target.value })
    }

    function handleFile(e) {

        let image = e.target.files[0]
        // console.log(image)
        setFile(image)
    }
    // console.log(prod)
    async function update() {
        let data
        let obj = {
            image: prod.image,
            title: prod.title,
            price: prod.price,
            description: prod.description,
            category: prod.category,
        }
        if (file) {
            const formData = new FormData();
            formData.append('image', file)
            let result = await updateImg(formData)
            data = result.data.file.Location
            obj.image = data
        }
        let p = await updateProduct(obj, prod._id)
        dispatch(addProductstoStore(p.data.product))
        setShow(false)

    }

    return (
        <>
            
            <div className={styles.inputBox}>
            <div style={{textAlign:"right",marginBottom:"40px"}}>
                <button onClick={()=>setShow(false)}>close</button>
            </div>
                <input onChange={handleInput} value={prod.title} name='title' type="text" placeholder="title" />
                <input onChange={handleInput} value={prod.description} name='description' type="text" placeholder="description" />
                <input onChange={handleInput} value={prod.price} name='price' type="number" placeholder="price" />

                <select onChange={handleInput} name='category'>
                    {
                        categories.filter((item) => {
                            return item.owner === user._id
                        })
                            .map((item) => (
                                <option value={item._id}>{item.name}</option>
                            ))
                    }
                </select>

                <input type="file"
                    name="image"
                    label="image"
                    accept=".jpeg, .jpg, .png"
                    onChange={handleFile}
                />
                <button disabled={!prod.title || !prod.description || !prod.price} onClick={update}>Update</button>
            </div>
        </>

    )
}

export default EditProduct