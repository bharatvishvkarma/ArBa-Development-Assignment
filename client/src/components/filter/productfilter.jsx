import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import styles from './filter.module.css'
import { getSearchedProduts } from "../../api/userData"
import addProductstoStore from "../../redux/action/productaction"

function ProductFilter({ setFilter2 }) {
    const { categories, user } = useSelector(state => state)
    const [filter, setFilter] = useState({
        title: "",
        category: "",
        sort: "",
    })

    const dispatch = useDispatch()

    function handleInput(e) {
        setFilter({ ...filter, [e.target.name]: e.target.value })
    }

    function searchProducts(){
        getSearchedProduts(filter)
        .then((res)=>{
            if(filter.category){
                
                let arr = res.data.Products.filter((elem)=>{
                    // console.log(elem.category,filter.category)
                    return elem.category === filter.category
                })
                
                dispatch(addProductstoStore(arr))
            }
            else{
                dispatch(addProductstoStore(res.data.Products))
            }
            setFilter2(false)
        })
    }

    return (
        <div>
            <div className={styles.search}>
                <div style={{ textAlign: "right" }}>
                    <button onClick={() => setFilter2(false)}>close</button>
                </div>
                <h2>Filter Products</h2>
                <input onChange={handleInput} name="title" type="text" placeholder="Title" />
                <select name="category" onChange={handleInput}>
                    <option value="">All</option>
                    {
                        categories.filter((category) => {
                            // console.log(category.owner, user._id)
                            return category.owner == user._id
                        })
                            .map((elem) => 
                                (
                                    <option value={elem._id}>{elem.name}</option>
                                )

                            )
                    }
                </select>
                <select name="sort" onChange={handleInput}>
                    <option value="">Sort by Price</option>
                    <option value="lth">Low to High</option>
                    <option value="htl">High to Low</option>
                </select>
                <button onClick={searchProducts}>Search</button>
            </div>
        </div>
    )
}

export default ProductFilter