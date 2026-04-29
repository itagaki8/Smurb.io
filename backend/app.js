const express=require('express');
const session=require("express-session")
const cors=require('cors');
const path=require('path');
const app=express();
const mongoose=require('mongoose')
const etudiantRoute=require('./routes/Etudiant')
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
app.set('view engine','ejs')
app.set('views',path.join(__dirname,"views"));
// app.js
app.use(session({
  name: 'sessionId',
  secret: process.env.SESSION_SECRET || 'un-secret-temporaire-pour-test',
  resave: false,
  saveUninitialized: true,  // ← CHANGE à TRUE pour tester
  cookie: { 
    secure: false,  // false en développement HTTP
    maxAge: 1000 * 60 * 60 * 24 * 7,
    httpOnly: true
  }
}));
app.use(express.static(path.join(__dirname,'public')))
app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.use('/',etudiantRoute)


module.exports=app