const Directeur=require('../models/Directeur')

exports.CreatDirecteur = async (req, res, next) => {
  try {
    const directeur = new Directeur({
      nom: req.body.nom,
      prenom: req.body.prenom,   
      skills: req.body.skills
    });

    const diresave = await directeur.save();
    return res.status(201).json({ diresave }); 
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};