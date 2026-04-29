const Directeur = require('../models/Directeur');
const bcrypt = require('bcrypt');
const Sujet = require('../models/Sujet');

// --- LOGIN DIRECTEUR ---
exports.loginDirecteur = async (req, res) => {
    try {
        const { email, password } = req.body;

        // 1. Rechercher le directeur par email
        const directeur = await Directeur.findOne({ email });
        if (!directeur) {
            return res.render('pages/loginDirecteur', { error: "Identifiants invalides (Email)." });
        }

        // 2. Comparer le mot de passe hashé
        const isMatch = await bcrypt.compare(password, directeur.password);
        if (!isMatch) {
            return res.render('pages/loginDirecteur', { error: "Mot de passe incorrect." });
        }

        // 3. Initialiser la session
        req.session.userId = directeur._id;
        req.session.userType = 'directeur';

        // 4. Sauvegarder et rediriger
        req.session.save((err) => {
            if (err) {
                console.error("Session error:", err);
                return res.render("pages/loginDirecteur", { error: "Erreur technique de session" });
            }
            return res.redirect('/directeur');
        });

    } catch (err) {
        console.error("Login Error:", err);
        res.status(500).render("pages/loginDirecteur", { error: "Une erreur est survenue lors de la connexion" });
    }
};


// --- CRÉATION DIRECTEUR (Modifié pour inclure le hashage correct) ---
exports.CreatDirecteur = async (req, res, next) => {
    try {
        const skillsArray = typeof req.body.skills === 'string' 
            ? req.body.skills.split(',').map(s => s.trim()) 
            : req.body.skills;

        const hash = await bcrypt.hash(req.body.password, 10);
        
        const directeur = new Directeur({
            nom: req.body.nom,
            prenom: req.body.prenom,   
            telephone: req.body.telephone,
            email: req.body.email,
            password: hash, 
            skills: skillsArray
        });

        const savedDirecteur = await directeur.save();
        
        req.session.userId = savedDirecteur._id;
        req.session.userType = 'directeur';

        req.session.save((err) => {
            if (err) return res.render("pages/loginDirecteur", { error: "Erreur de session" });
            return res.redirect('/directeur');
        });

    } catch (err) {
        console.log(err);
        res.render('pages/loginDirecteur', { error: 'Cet email ou téléphone existe déjà ou erreur de hashage' });
    }
};

// --- DASHBOARD ---
exports.getDirecteurDashboard = async (req, res) => {
    try {
        const directeurId = req.session.userId;
        if (!directeurId) return res.redirect('/logindir');

        const directeur = await Directeur.findById(directeurId);
        const sujetsEncadres = await Sujet.find({ directeur: directeurId })
                                          .populate('etudiant')
                                          .sort({ dateSoumission: -1 });

        res.render('pages/Directeur', {
            directeur,
            sujets: sujetsEncadres
        });
    } catch (err) {
        console.error(err);
        res.status(500).send("Erreur lors du chargement du dashboard");
    }
};

exports.getLogindirecteur=(req,res,next)=>{

  res.render('pages/loginDirecteur',{ error: null })
}