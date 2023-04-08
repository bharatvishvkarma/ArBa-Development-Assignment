import { useDispatch } from 'react-redux'
import addCategory from '../../redux/action/addCategory'
import styles from './category.module.css'
import { deleteOneCategory } from '../../api/userData'
import { useState } from 'react'
import EditCategory from '../edit/editCategory'

function CategoryListing({ category =[],user }) {
    // const {title,price,image}= product
    // console.log(category)
    const dispatch = useDispatch()
    const [show,setShow] = useState(false)
    const [data,setData] = useState()

    function deleteCategory(id){
        deleteOneCategory(id)
        .then((res)=>{
            console.log(res.data.category)
            dispatch(addCategory(res.data.category))
        })
    }

    function showBox(item){
        setData(item)
        setShow(true)
    }

    return (
        <div>
             {show ? <EditCategory category = {data} setShow = {setShow} />:<div></div>}
            <table>
                <thead>
                    <td>Image</td>
                    <td>Name</td>
                    <td>Slug</td>
                    <td>Action</td>
                </thead>
                
                {
                    category.filter((item)=>{
                        // console.log(user._id,item._id)
                        return user._id === item.owner
                    })
                    .map((item, index) => (
                        <tr>
                            <td><img className={styles.image} src = {item.image} /></td>
                            <td>{item.name}</td>
                            <td>{item.slug}</td>
                            <td><button onClick={()=>showBox(item)} >Edit</button>
                            <button onClick={()=>deleteCategory(item._id)}> Delete</button>
                            </td>
                        </tr>
                    ))
                }
            </table>

        </div>
    )
}

export default CategoryListing