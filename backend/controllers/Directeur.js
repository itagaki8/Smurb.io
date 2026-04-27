const Directeur=require('../models/Directeur')

exports.CreatDirecteur = async (req, res, next) => {
  try {
    const directeur = new Directeur({
      nom: req.body.nom,
      prenom: req.body.prenom,   
      telephone:req.body.telephone,
      email:req.body.email,
      password:req.body.password,
      skills: req.body.skills
    });

    const diresave = await directeur.save();
    return res.status(201).redirect('/admin'); 
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

//Acceder à la page enseigant pour le test
exports.getEnseignant=async (req,res,next)=>{
    try{
  await res.status(201).render('pages/Enseignant')
    }catch(err){
        res.status(500).json({err})
    }  
}

exports.getEveryDirecteur=async (req,res,next)=>{
  try{
    const directeurs=await Directeur.find()
    res.status(201).json(directeurs)

  }catch(err){
    res.status(500).json(err)
  }
}