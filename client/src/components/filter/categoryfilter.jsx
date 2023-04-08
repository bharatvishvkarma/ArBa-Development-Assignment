import { useDispatch, useSelector } from 'react-redux';
import styles from './filter.module.css';
import { getSearchedCategory } from '../../api/userData';
import { useState } from 'react';
import addCategory from '../../redux/action/addCategory';

function CategoryFilter({setFilter1}){

    const {user} = useSelector(state =>state)
    const [name,setName] = useState("")
    const dispatch = useDispatch()

    function searchCategory(){
        getSearchedCategory(name)
        .then((res)=>{
            // console.log(res)
            dispatch(addCategory(res.data.category))
            setFilter1(false)
        })
    }

    return (
        <div className = {styles.search}>
            <div style={{textAlign:"right"}}>
                <button onClick={()=>setFilter1(false)}>close</button>
            </div>
            <input onChange={(e)=>setName(e.target.value)} type = "text" placeholder = "Search by Name" />
            <button onClick={searchCategory}>Search</button>
        </div>
    )
}

export default CategoryFilter