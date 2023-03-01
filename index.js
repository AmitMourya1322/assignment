const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose')
dotenv.config()
const app = express();
mongoose
.connect(process.env.MONGO_URI)
.then(()=>console.log("DB Connected"))
.catch((err)=>console.log("db error => ",err))
const port = process.env.PORT || 8000;

const User = require('./controller/userController')


app.use(express.json())
app.use('/',User)

app.listen(port,()=>{
    console.log('server is running')
})