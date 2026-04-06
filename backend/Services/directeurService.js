const Directeur=require('../models/Directeur');

const {construireVecteurs,cosineSimilarity}=require('../Utils/nlp');

async function attribuerDirecteur(sujet){
    const directeurs = await Directeur.find()

    let meilleur=null;
    let meilleurScore=0;

    for(const d of directeurs){
        const textes=[
        sujet,
        d.skills.join(" ")
        ]
        const vecteurs=construireVecteurs(textes);
        
        const score=cosineSimilarity(vecteurs[0],vecteurs[1]);
        if(score > meilleurScore){
            meilleurScore=score;
            meilleur=d;
        }
    }

    return{directeur:meilleur,score:meilleurScore}
}

module.exports={attribuerDirecteur}