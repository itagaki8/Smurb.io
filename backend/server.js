const express=require('express');
const cors=require('cors');
const app=require('./app')
const port=5400



app.listen(port,()=>{
    console.log(`The server is listening to ${port}`)
})