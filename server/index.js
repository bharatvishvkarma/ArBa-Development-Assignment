const express = require('express')
const cors = require('cors')
const connectDatabase = require('./database/database')
const user = require('./routes/user')
const uploadFile = require('./routes/fileUpload.js')
const category = require('./routes/category.js')


const app = express()
app.use(cors())
app.use(express.json())


app.use('/user/',user)
app.use('/file/',uploadFile)
app.use('/category/',category)
const port = 7777
connectDatabase()
.then(()=>{
    app.listen(port,()=>{
        console.log('listening on port ' + port)
    })
})

 
