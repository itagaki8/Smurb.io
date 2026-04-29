const Etudiant = require('../models/Etudiant');
const Directeur = require('../models/Directeur');
const Admin = require('../models/Admin');
const bcrypt = require('bcrypt');

exports.createAdmin = (req, res) => {
    bcrypt.hash(req.body.password, 10)
        .then((hash) => {
            const admin = new Admin({
                nom: req.body.nom,
                email: req.body.email, // Correction: req.body.email au lieu de req.email
                password: hash         // Correction: Ajout du password hashé
            });
            
            return admin.save();
        })
        .then((admin) => {
            req.session.userId = admin._id;
            req.session.userType = 'admin';

            req.session.save((err) => {
                if (err) {
                    return res.render('pages/logadmin', { error: "Erreur de session" });
                }
                return res.redirect('/admin');
            });
        })
        .catch((err) => {
            console.log(err);
            res.render('pages/logadmin', { error: 'Cet email existe déjà ou erreur de création' });
        });
};

exports.loginAdmin = (req, res) => {
    // Correction: findOne au lieu de find pour avoir un objet unique
    Admin.findOne({ email: req.body.email }).select('+password')
        .then((admin) => {
            if (!admin) {
                return res.render('pages/logadmin', { error: "Identifiant incorrect" });
            }

            if (!req.body.password) {
                return res.render("pages/logadmin", { error: "Veuillez entrer votre mot de passe" });
            }

            bcrypt.compare(req.body.password, admin.password)
                .then(valid => {
                    if (!valid) {
                        return res.render('pages/logadmin', { error: 'Mot de passe incorrect' });
                    }

                    // Correction: req.session au lieu de re.session
                    req.session.userId = admin._id;
                    req.session.userType = 'admin';

                    req.session.save((err) => {
                        if (err) {
                            return res.render('pages/logadmin', { error: "Erreur technique" });
                        }
                        return res.redirect('/admin');
                    });
                })
                .catch(error => {
                    res.render('pages/logadmin', { error: "Erreur lors de la connexion" });
                });
        })
        .catch(error => {
            res.render('pages/logadmin', { error: "Erreur base de données" });
        });
};

exports.getDashboard = async (req, res) => {
    try {
        const etudiants = await Etudiant.find().populate('sujet');
        const directeurs = await Directeur.find();
        
        // Correction: On cherche l'ADMIN en session, pas un étudiant
        const adminData = await Admin.findById(req.session.userId);

        const stats = {
            totalEtudiants: etudiants.length,
            sujetsSoumis: etudiants.filter(e => e.hasSubmitted).length,
            totalDirecteurs: directeurs.length
        };

        res.render('pages/admin', { 
            etudiants, 
            directeurs, 
            stats, 
            admin: adminData, // On passe l'admin pour la navbar
            userType: 'admin' 
        });
    } catch (err) {
        res.status(500).send("Erreur de chargement du dashboard");
    }
};

exports.getLoginAdmin = (req, res) => {
    try {
        res.render('pages/logadmin', { error: null });
    } catch (err) {
        console.error(err);
    }

}