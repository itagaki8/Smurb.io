const mongoose=require('mongoose');
const uniqueValidator=require('mongoose-unique-validator');

const etudinantSchema=mongoose.Schema({
    nom:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    matricule:{type:Number,required:true},
 
});

etudinantSchema.plugin(uniqueValidator)

module.exports=mongoose.model('Etudiant',etudinantSchema)