const express = require('express')
const cors = require('cors')
const connectDatabase = require('./database/database')
const allRoutes = require('./routes/router')


const app = express()
app.use(cors())
app.use(express.json())


app.use('/',allRoutes)
const port = 7777
connectDatabase()
.then(()=>{
    app.listen(port,()=>{
        console.log('listening on port ' + port)
    })
})

 
