const mongoose=require('mongoose');
const Etudiant = require('./Etudiant');

const sujetModel=mongoose.Schema({
    intitule:{type:String,required:true},
    description:{type:String,required:true},
    etudiant:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Etudiant',
        required:true
    },
    directeur:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Directeur',
        default:null
    }
})
module.exports=mongoose.model('Sujet',sujetModel)
