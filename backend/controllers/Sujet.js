const Sujet=require('../models/Sujet')

exports.sendSujets= async(req,res,next)=>{
    try{
   const sujet= await new Sujet({
      intitulé:req.body.intitulé,
      description:req.body.description
   })
   const saveSuj=await sujet.save()
   try{
    return res.status(200).json({saveSuj})

   }catch(err){
     res.status(500).json({err})
   }
}catch(err){
    res.status(500).json({err})
}
}

exports.getEverySub= (req,res,next)=>{
    Sujet.find({})
       .then((sujet)=>{
        res.status(201).json({sujet})
       })
       .catch((err)=>{
        res.status(404).json({err})
       })
}

exports.creatSub= async (req,res,next)=>{
    try{
        const {intitule,description}=req.body;
        
        const sujet=await Sujet.create({
            intitule,
            description,
            etudiant:req.etudiant.id,
            dateSoumission:new Date()
        })
        res.status(201).json(sujet);
    }catch(err){
        res.status(500).json({message:'Erreur lors de la soumission'})
        console.log(err)
    }

}

// Recuperer le sujet d'un etudiant

exports.getSujetEtudiant = async(req,res)=>{

const sujets = await Sujet.find({
etudiant:req.params.id
}).populate("directeur")

res.json(sujets)

}