import styles from './product.module.css'
import { AiOutlinePlus } from 'react-icons/ai';
import { AiOutlineMinus } from 'react-icons/ai';

function Product({data,addQuantity,substractQuantity}) {
    const {title,image,price,description,quantity,_id} = data
    return (
        <div className={styles.productBox}>
            <img className={styles.image} src={image} />
            <div className={styles.childBox}>
                <div>
                    <h4>{title}</h4>
                    <p>{description}
                    </p>
                    <h4>Rs. {price}</h4>
                </div>

                <div className={styles.addToCart}>
                    {
                       quantity<1?<button className={styles.addToCardbtn} onClick={()=>{addQuantity(_id)}} >Add to cart</button>:
                        <div className={styles.twobtn}>
                            <button onClick={(e)=>{
                                e.stopPropagation()
                                substractQuantity(_id)
                                }}><AiOutlineMinus /></button>
                                <p>{quantity}</p>
                                <button onClick={(e)=>{
                                e.stopPropagation()
                                addQuantity(_id)
                                }}><AiOutlinePlus /></button>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default Product