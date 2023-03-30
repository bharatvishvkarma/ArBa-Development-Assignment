const express = require('express')
const category = express.Router()
const {createCategory,getAllCategories} = require('../controller/category')

category.post('/add', createCategory)
category.get('/get', getAllCategories)

module.exports = category

