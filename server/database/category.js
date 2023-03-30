const mongoose = require('mongoose')

const categorySchema = mongoose.SchemaType({
    name : String,
    slug : String,
    image: String,
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      }
})

const Category = mongoose.model('Category', categorySchema)

mudule.exports = Category