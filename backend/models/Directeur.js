const mongoose=require('mongoose')


const directscema=mongoose.Schema({
    nom:{
        type:String,
        required:true
    },
    prenom:{
        type:String,
        required:true
    },
    telephone:{
        type:String,
        unique:true,
        validate:{
            validator:function(v){
                return /^\+?[1-9]\d{1,14}$/.test(v);
            },
            message:props=>`${props.value} n'est pas un numéro de téléphone valide`
        }
    },
    password:{
        type:String,
        required:true
    }
    ,
      email: { 
        type: String, 
        required: [true, "L'email est obligatoire"], 
        unique: true,
        lowercase: true,
        trim: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Veuillez remplir un email valide']
    },
    skills:[
        {
        type:String,
        required:true
    }
]
})
module.exports=mongoose.model("Directeur",directscema)
