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
    skills:[
        {
        type:String,
        required:true
    }
]
})
module.exports=mongoose.model("Directeur",directscema)
