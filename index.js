const express = require("express")
const cors  =require("cors")
const  setUpDB  = require('./config/database')
const router= require('./config/routes')
const port = 3005

const app = express()

app.use(express.json())
app.use(cors())
app.use('/', router)
setUpDB()

app.listen(port, () => {
    console.log("Listening to port", port)
})