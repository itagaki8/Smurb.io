const express=require('express');
const cors=require('cors');
const path=require('path');
const app=express();
const mongoose=require('mongoose')
const userRoute=require('./routes/Etudiant')
require("dotenv").config()
const dataBaseUrl=process.env.DATABASE_URI

async function dbConnection() {
      await mongoose.connect(dataBaseUrl) 
      try{
         console.log('Connection etablie 🥳')
      }catch(err){
        console.log(err)
      }
}
dbConnection()


app.set('views',path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,'public')))
app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.use('/',userRoute)
// app.use('/etudiant/auth',userRoute)

module.exports=app