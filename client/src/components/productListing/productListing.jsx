import styles from './productListing.module.css'

function ProductListing({ product,user }) {
    // const {title,price,image}= product
    // console.log(product)
    return (
        <div>
            <table>
                <thead>
                    <td>Image</td>
                    <td>Name</td>
                    <td>Price</td>
                    <td>Action</td>
                </thead>
                
                {
                    product.filter((item)=>{
                        // console.log(user._id, item._id)
                        return user._id === item.owner
                    })
                    .map((item, index) => (
                        <tr>
                            <td><img className={styles.image} src = {item.image} /></td>
                            <td>{item.title}</td>
                            <td>{item.price}</td>
                            <td>Edit | Delete</td>
                        </tr>
                    ))
                }
            </table>

        </div>
    )
}

export default ProductListing