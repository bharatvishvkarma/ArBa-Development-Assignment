const Category = require('../database/category.js')

async function createCategory(req,res){
    try{
        const data = req.body

        await Category.create(data)

        return res.send({
            message:"category created successfully",
            data: data
        })

    }
    catch(err){
        res.status(500).send({
            message:err.message
        })
    }
}

async function getAllCategories(req,res){
    try{
        let category = await Category.find()
        return res.send({
            message: "category get successfully",
            category: category
        })
    }
    catch(err){
        res.status(500).send({
            message: err.message
        })
    }
}

module.exports = {createCategory,getAllCategories}