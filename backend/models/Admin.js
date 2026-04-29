const mongoose=require('mongoose')

const adminSchema=mongoose.Schema({
    nom:{
        type:String,
        required:true,
    },
   email:{ 
        type: String, 
        required: [true, "L'email est obligatoire"], 
        unique: true,
        lowercase: true,
        trim: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Veuillez remplir un email valide']
    },
       password: { 
        type: String, 
        required: [true, "Le mot de passe est obligatoire"] ,
        select: false
    },
  
})

module.exports=mongoose.model('Admin',adminSchema)