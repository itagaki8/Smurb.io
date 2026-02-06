const User=require('../models/User')
const bcrypt=require('bcrypt')

exports.signUp=(req,res,next)=>{
  bcrypt.hash(req.body.password,10)
        .then((hash)=>{
            const user=new User({
                nom:req.body.nom,
                email:req.body.email,
                password:hash,
                matricule:req.body.matricule,
                role:req.body.role
            })
            user.save()
                .then(()=>{ 
                    return res.status(201).json({message:"utiliasteur crée!"})})
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
    User.findOne({email:req.body.email})
    .then((user)=>{
        if (user===null){
            return res.status(401).json({message:'Identifiant ou mot de passe incorrecte!'})
        }else{
            bcrypt.compare(req.body.password, user.password)
               .then(valid =>{
                if(!valid){
                    return res.status(401).json({message:'Identifiant ou mot de passe incorrecte!'})
                }else{
                    res.status(200).json({
                        userId:user._id,
                        token:'TOKEN'
                    })
                }

               })
               .catch(error=>res.status(500).json({error}))
        }
           
    })
    .catch((err)=>res.status(500).json({err}))

}

exports.accessAdmin= async()=>{
    
}