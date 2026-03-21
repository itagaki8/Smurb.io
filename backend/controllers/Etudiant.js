const Etudiant=require('../models/Etudiant')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const path=require('path')

exports.signUp=(req,res,next)=>{
  bcrypt.hash(req.body.password,10)
        .then((hash)=>{
            const etudiant=new Etudiant({
                nom:req.body.nom,
                email:req.body.email,
                password:hash,
                matricule:req.body.matricule,
            })
            etudiant.save()
                .then((etudiant)=>{ 
                    const token=jwt.sign({nom:etudiant.nom},'yoyo',{ expiresIn: "1h" })
                    
                    return res.status(201).json({token})})
                .catch(err=>{
                    res.status(500).json({err})
                    console.log(err)
        })
        })
        .catch((err)=>{
            res.status(500).json({err})
            console.log(err)
})
}

exports.login=(req,res,next)=>{
    console.log(req.body)
    Etudiant.findOne({email:req.body.email})
    .then((etudiant)=>{
        if (etudiant===null){
            return res.status(401).json({message:'Identifiant ou mot de passe incorrecte!'})
        }else{
            bcrypt.compare(req.body.password, etudiant.password)
               .then(valid =>{  
                if(!valid){
                    return res.status(401).json({message:'Identifiant ou mot de passe incorrecte!'})
                }else{
                    const token=jwt.sign({id:etudiant._id},'yoyo',{ expiresIn: "1h" })
                    res.status(200).json({token,etudiant});
                    // console.log(etudiant.role)
                }

               })
               .catch(error=>res.status(500).json({error}))
        }
           
    })
    .catch((err)=>res.status(500).json({err}))

}

exports.getAllUsers= (req,res,next)=>{

    Etudiant.find({})
       .then((etudiant)=>res.status(201).json({etudiant:etudiant}))
       .catch((err)=>res.status(500).json({err}))
   
    
}
//Acceder à la page etudiant pour le test
exports.getEtudiant=async (req,res,next)=>{
    try{
  await res.status(201).sendFile(path.join(__dirname,'..','public','Etudiant.html'))
    }catch(err){
        res.status(500).json({err})
    }  
}

//Acceder à la page administrateur pour le test
exports.getAdmin=async (req,res,next)=>{
    try{
  await res.status(201).sendFile(path.join(__dirname,'..','public','administrateur.html'))
    }catch(err){
        res.status(500).json({err})
    }  
}

//Acceder à la page enseigant pour le test
exports.getEnseignant=async (req,res,next)=>{
    try{
  await res.status(201).sendFile(path.join(__dirname,'..','public','enseignant.html'))
    }catch(err){
        res.status(500).json({err})
    }  
}

//Acceder à la page login pour le test
exports.getLogin=async (req,res,next)=>{
    try{
  await res.status(201).sendFile(path.join(__dirname,'..','public','Login.html'))
    }catch(err){
        res.status(500).json({err})
    }  
}

