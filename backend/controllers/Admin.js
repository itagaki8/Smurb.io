const Etudiant=require('../models/Etudiant')
const Directeur=require('../models/Directeur')
exports.getDashboard = async (req, res) => {
    try {
        const etudiants = await Etudiant.find().populate('sujet');
        const directeurs = await Directeur.find();
        const etudiantData = await Etudiant.findById(req.session.userId);
        // On calcule quelques stats rapidement
        const stats = {
            totalEtudiants: etudiants.length,
            sujetsSoumis: etudiants.filter(e => e.hasSubmitted).length,
            totalDirecteurs: directeurs.length
        };

        res.render('pages/admin', { etudiants, directeurs, stats ,etudiant:etudiantData});
    } catch (err) {
        res.status(500).send("Erreur de chargement du dashboard");
    }
};