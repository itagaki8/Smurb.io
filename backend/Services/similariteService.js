const Sujet=require('../models/Sujet');

//Importation des methodes du model de detection de similarité des sujets
const {cosineSimilarity,construireVecteurs}=require('../Utils/nlp');

async function detectSimilarite(nouveauSujet) {
    const anciens=await Sujet.find();
     
    if (anciens.length===0){
      return {
        message:"Premier sujet soumis",
        resultats:[]
      };
    }
    const textes=[
        nouveauSujet,
        ...anciens.map(s=>s.intitule)
    ];

    const vecteurs=construireVecteurs(textes);
    const vecteursNouveau=vecteurs[0];
    let resultats=[];

    //examination

   for (let i=1; i< vecteurs.length;i++){
    const score=cosineSimilarity(vecteursNouveau,vecteurs[i]);
    resultats.push({
        sujet:anciens[i-1],
        score
    });
   }

   return resultats.sort((a,b)=>b.score-a.score)
}

module.exports={detectSimilarite}