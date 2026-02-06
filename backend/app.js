const express=require('express');
const cors=require('cors');
const path=require('path');
const app=express();
const mongoose=require('mongoose')
const userRoute=require('./routes/User')

async function dbConnection() {
      await mongoose.connect('mongodb+srv://kasongoterence61_db_user:1qGscEKubiC5noK0@cluster0.afybvbj.mongodb.net/?appName=Cluster0',) 
      try{
         console.log('Connection etablie 🥳')
      }catch(err){
        console.log(err)
      }
}
dbConnection()
// Connection à la DB
// mongoose.connect('mongodb+srv://kasongoterence61_db_user:1qGscEKubiC5noK0@cluster0.afybvbj.mongodb.net/?appName=Cluster0',) 
//       .then(()=>console.log("Connection etablie! 🥳"))
//       .catch(()=>console.log('Erreur de connection 😓'))   


app.set('views',path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,'public')))
app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.use('/user/auth',userRoute)


module.exports=app