const express=require('express');
const cors=require('cors');
const app=require('./app')
require('dotenv').config()
const port=process.env.PORT || 6000



app.listen(port,()=>{
    console.log(`The server is listening to ${port}`)
})