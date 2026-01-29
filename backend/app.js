const express=require('express');
const cors=require('cors');
const path=require('path');
const app=express();


app.set('views',path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,'public')))

app.use(express.json())
app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'public','index2.html'))
})

module.exports=app