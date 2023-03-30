const mongoose = require('mongoose')

const productSchema = mongoose.SchemaType({
    title : String,
    description : String,
    price : Number,
    category : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
      },
    image: String,
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      }
})

const Product = mongoose.model('Product', productSchema)

module.exports = Product