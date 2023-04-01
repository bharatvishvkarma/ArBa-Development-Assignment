import { useEffect, useState } from 'react'
import styles from './addproduct.module.css'
import { useSelector } from 'react-redux'
import { getCategories } from '../../api/userData'
import {addOneCategory} from '../../api/userData'
import { useNavigate } from 'react-router-dom'


function AddCategory(){
    const {user,categories} = useSelector(state =>state)
    const [category,setCategoty] = useState({})
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

    function addCategory(){
        let obj = {...category}
        obj.owner = user._id
        console.log(obj)
        addOneCategory(obj)
        .then((res)=>{
            console.log(res.data)
            // navigate('/mystore')
        })

    }

    return (
        <div className={styles.inputBox}>
            <input onChange={handleInput} type = "text" name='name' placeholder="name" />
            <input onChange={handleInput} type = "text" name = "slug" placeholder="slug" />
            <button onClick={addCategory}>Add Category</button>
        </div>
    )
}

export default AddCategory