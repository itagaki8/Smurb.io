const Sujet=require('../models/Sujet')

const { attribuerDirecteur } = require('../Services/directeurService');
const { detectSimilarite } = require('../Services/similariteService');

// exports.sendSujets= async(req,res,next)=>{
//     try{
//    const sujet= await new Sujet({
//       intitulé:req.body.intitulé,
//       description:req.body.description
//    })
//    const saveSuj=await sujet.save()
//    try{
//     return res.status(200).json({saveSuj})

//    }catch(err){
//      res.status(500).json({err})
//    }
// }catch(err){
//     res.status(500).json({err})
// }
// }

exports.getEverySub= (req,res,next)=>{
    Sujet.find({})
       .then((sujet)=>{
        res.status(201).json({sujet})
       })
       .catch((err)=>{
        res.status(404).json({err})
       })
}

exports.creatSub = async (req, res, next) => {
  try {

    const { intitule, description } = req.body;

    const texteComplet = `${intitule} ${description}`;

    // 🔹 1. similarité
    const data = await detectSimilarite(texteComplet);
    const similarites = data.resultats || [];

    const similaires = similarites.filter(s => s.score > 0.6);

    // 🔴 blocage
    if(similaires.length > 0 && similaires[0].score > 0.85){
      return res.status(400).json({
        message: "Sujet trop similaire à un sujet existant",
        similaires
      });
    }

    // 🔹 2. directeur
    const { directeur, score } = await attribuerDirecteur(texteComplet);

    // 🔹 3. sauvegarde
    const sujet = await Sujet.create({
      intitule,
      description,
      etudiant: req.etudiant.id,
      directeur: directeur?._id,
      scoreSimilarite: similaires[0]?.score || 0,
      dateSoumission: new Date()
    });

    // 🔹 debug
    console.log("🎯 Sujet :", texteComplet);
    console.log("👉 Directeur choisi :", directeur?.nom);
    console.log("👉 Score :", score);

    res.status(201).json({
      message: "Sujet soumis avec succès",
      sujet,
      similaires,
      directeur: directeur?.nom,
      scoreDirecteur: score
    });

  } catch(err){
    console.error(err);
    res.status(500).json({
      message: 'Erreur lors de la soumission'
    });
  }
};

exports.getAllSubjects=async(req,res,next)=>{
    const sujets=await Sujet.find({})
    try{
        res.status(201).json({sujets:sujets})

    }catch(err){
        res.status(500).json({err})
    }

}
//Creation de la fonction de detection de similarité

// async function detectSimilarite(nouveauSujet) {

//     const ancientSujets=await Sujet.find();

//     const tfidf=new natural.TfIdf();
//     ancientSujets.forEach(s => {
//         tfidf.addDocument(s.intitule+" "+s.description)
//     });
//     console.log("🔎 Analyse de similarité en cours...\n");

//     tfidf.tfidfs(nouveauSujet,(i,score)=>{
//         const sujetBase=ancientSujets[i];
//     })
//         console.log("Comparé avec :", sujetBase.titre);
//         console.log("Score :", score);
// }


