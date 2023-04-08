import { useEffect, useState } from 'react';
import styles from './edit.module.css';
import { getOneProduct } from '../../api/userData';
import { useDispatch, useSelector } from 'react-redux';
import { updateImg } from '../../api/userData';
import { updateCategory } from '../../api/userData';
import addCategory from '../../redux/action/addCategory'

function EditCategory({ category, setShow }) {
    const { categories, user } = useSelector(state => state)
    const [cat, setCategory] = useState(category)
    const [file, setFile] = useState()
    const dispatch = useDispatch()
    // useEffect(()=>{
    //     getOneProduct(id)
    //     .then((res)=>{
    //         console.log(res.data.produt)
    //     })
    // },[])

    function handleInput(e) {
        setCategory({ ...cat, [e.target.name]: e.target.value })
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
            image: cat.image,
            name: cat.name,
            slug: cat.slug
        }
        if (file) {
            const formData = new FormData();
            formData.append('image', file)
            let result = await updateImg(formData)
            data = result.data.file.Location
            obj.image = data
        }
        let p = await updateCategory(obj, cat._id)
        console.log(p)
        dispatch(addCategory(p.data.category))
        setShow(false)
    }

    return (
        <>
            
            <div className={styles.inputBox}>
            <div style={{textAlign:"right",marginBottom:"40px"}}>
                <button onClick={()=>setShow(false)}>close</button>
            </div>
                <input onChange={handleInput} value={cat.name} name='name' type="text" placeholder="name" />
                <input onChange={handleInput} value={cat.slug} name='slug' type="text" placeholder="slug" />

                <input type="file"
                    name="image"
                    label="image"
                    accept=".jpeg, .jpg, .png"
                    onChange={handleFile}
                />
                <button disabled={!cat.name || !cat.slug } onClick={update}>Update</button>
            </div>
        </>

    )
}

export default EditCategory