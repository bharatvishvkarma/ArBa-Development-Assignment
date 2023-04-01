import styles from './category.module.css'

function CategoryListing({ category,user }) {
    // const {title,price,image}= product
    console.log(category)

    return (
        <div>
            <table>
                <thead>
                    <td>Name</td>
                    <td>Slug</td>
                    <td>Owner</td>
                    <td>Action</td>
                </thead>
                
                {
                    category.filter((item)=>{
                        console.log(user._id,item._id)
                        return user._id === item.owner
                    })
                    .map((item, index) => (
                        <tr>
                            <td>{item.name}</td>
                            <td>{item.slug}</td>
                            <td>{item.owner}</td>
                            <td>Edit | Delete</td>
                        </tr>
                    ))
                }
            </table>

        </div>
    )
}

export default CategoryListing