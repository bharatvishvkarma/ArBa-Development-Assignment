import { useEffect, useState } from 'react'
import styles from './addproduct.module.css'
import { useSelector } from 'react-redux'
import { getCategories } from '../../api/userData'
import {addOneCategory,updateImg} from '../../api/userData'
import { useNavigate } from 'react-router-dom'


function AddCategory({setCategoryBox}){
    const {user,categories} = useSelector(state =>state)
    const [category,setCategoty] = useState({})
    const [file, setFile] = useState(null)
    const navigate = useNavigate()

    useEffect(()=>{
        getCategories()
        .then((res)=>{
            console.log(res.data)
        })
    },[])

    function handleInput(e){
        setCategoty({...category, [e.target.name]:e.target.value})
    }
    // console.log(category)

    async function addCategory(){
        let obj = {...category}
        obj.owner = user._id
        // console.log(obj)
        let data
            if(file){
                const formData = new FormData();
                formData.append('image',file)
                let result = await updateImg(formData)
                data = result.data.file.Location
            }
            
        data?obj.image = data:obj.image="https://st.depositphotos.com/2001755/3622/i/600/depositphotos_36220949-stock-photo-beautiful-landscape.jpg"
        addOneCategory(obj)
        .then((res)=>{
            setCategoryBox(false)
            // console.log(res.data)
            // navigate('/mystore')
        })

    }

    function handleFile(e){
        
        let image = e.target.files[0]
        console.log(image)
        setFile(image)
    }

    return (
        <div className={styles.inputBox}>
            <div style={{textAlign:"right",marginBottom:"40px"}}>
                <button onClick={()=>setCategoryBox(false)}>close</button>
            </div>
            <input onChange={handleInput} type = "text" name='name' placeholder="name" />
            <input onChange={handleInput} type = "text" name = "slug" placeholder="slug" />
            <input type = "file"
                    name = "image" 
                    label = "image"
                    accept = ".jpeg, .jpg, .png"
                    onChange={handleFile}
            />
            <button disabled = {!category.name || !category.slug} onClick={addCategory}>Add Category</button>
        </div>
    )
}

export default AddCategory