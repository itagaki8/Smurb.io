const Sujet=require('../models/Sujet')
const Etudiant=require('../models/Etudiant')

const { attribuerDirecteur } = require('../Services/directeurService');
const { detectSimilarite } = require('../Services/similariteService');



exports.creatSub = async (req, res, next) => {
    try {
        const userId = req.session.userId;
        // On utilise 'intitule' pour correspondre à ton modèle
        const { intitule, description } = req.body; 

        if (!userId) return res.redirect('/login');

        const texteComplet = `${intitule} ${description}`;

        // 1. Analyse de similarité
        const data = await detectSimilarite(texteComplet);
        const similarites = data.resultats || [];
        const similaires = similarites.filter(s => s.score > 0.6);

        // 2. Blocage si plagiat détecté (> 85%)
        if (similaires.length > 0 && similaires[0].score > 0.85) {
            const etudiant = await Etudiant.findById(userId);
            return res.render('pages/etudiantt', {
                etudiant,
                hasSubmitted: false,
                error: "Sujet trop similaire à un projet existant."
            });
        }

        // 3. Attribution du directeur
        const { directeur, score } = await attribuerDirecteur(texteComplet);

        // 4. Création du sujet avec tes champs exacts
        const sujet = await Sujet.create({
            intitule: intitule, // Utilisation de ton champ 'intitule'
            description: description,
            etudiant: userId,
            directeur: directeur?._id,
            scoreSimilarite: similaires[0]?.score || 0,
            dateSoumission: new Date()
        });

        // 5. Mise à jour de l'étudiant pour basculer l'affichage
        await Etudiant.findByIdAndUpdate(userId, {
            hasSubmitted: true,
            sujet: sujet._id
        });

        console.log(`🎯 Attribution Smurb.io : ${intitule} -> ${directeur?.nom}`);

        // Redirection vers l'espace étudiant (qui affichera maintenant le directeur)
        res.redirect('/etudiant');

    } catch (err) {
        console.error("Erreur soumission:", err);
        res.status(500).redirect('/etudiant');
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


