const Etudiant=require('../models/Etudiant')
const bcrypt=require('bcrypt')
const { populate } = require('dotenv')
const jwt=require('jsonwebtoken')
const path=require('path')



// SIGNUP - avec session
exports.signUp = (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then((hash) => {
      const etudiant = new Etudiant({
        nom: req.body.nom,
        email: req.body.email,
        password: hash,
        matricule: req.body.matricule,
      });
      
      etudiant.save()
        .then((etudiant) => {
          // Créer la session
          req.session.userId = etudiant._id;
          req.session.userType = 'etudiant';
          
          req.session.save((err) => {
            if (err) {
              console.error("Session error:", err);
              return res.render("pages/login", { 
                error: "Erreur lors de la création du compte" 
              });
            }
            
            // Rediriger vers l'espace étudiant
            return res.redirect('/etudiant');
          });
        })
        .catch(err => {
          console.log(err);
          res.render("pages/login", { 
            error: "Cet email ou matricule existe déjà" 
          });
        });
    })
    .catch((err) => {
      console.log(err);
      res.render("pages/login", { 
        error: "Erreur lors de la création du compte" 
      });
    });
};
//Modification du nom du fichier
// LOGIN - avec session
exports.login = (req, res, next) => {
  // ✅ Utiliser .select('+password') pour inclure le champ password
  Etudiant.findOne({ email: req.body.email }).select('+password')
    .then((etudiant) => {
      console.log("Email recherché:", req.body.email);
      console.log("Étudiant trouvé:", etudiant ? etudiant.nom : "Non trouvé");
      console.log("Password présent:", etudiant ? !!etudiant.password : false);
      
      if (!etudiant) {
        return res.render("pages/login", {
          error: "Identifiant incorrect"
        });
      }

      // Vérifier que req.body.password existe
      if (!req.body.password) {
        return res.render("pages/login", {
          error: "Veuillez entrer un mot de passe"
        });
      }

      bcrypt.compare(req.body.password, etudiant.password)
        .then(valid => {
          if (!valid) {
            return res.render("pages/login", {
              error: "Mot de passe incorrect"
            });
          }

          // Créer la session
          req.session.userId = etudiant._id;
          req.session.userType = 'etudiant';
          
          req.session.save((err) => {
            if (err) {
              console.error("Session error:", err);
              return res.render("pages/login", {
                error: "Erreur technique, veuillez réessayer"
              });
            }
            
            return res.redirect('/etudiant');
          });
        })
        .catch(error => {
          console.error("Bcrypt error:", error);
          res.render("pages/login", { error: "Erreur lors de la connexion" });
        });
    })
    .catch(error => {
      console.error("Database error:", error);
      res.render("pages/login", { error: "Erreur lors de la connexion" });
    });
};

//Acceder à la page etudiant pour le test
// controllers/Etudiant.js
exports.getEtudiant = async (req, res, next) => {
  console.log("Session complète:", req.session);
  console.log("UserId:", req.session.userId);
  
  if (!req.session.userId) {
    console.log("Pas de userId en session, redirection vers login");
    return res.redirect('/login');
  }

  try {
    const etudiant = await Etudiant.findById(req.session.userId)
    .populate({
        path: 'sujet',
        populate: { path: 'directeur' } 
    });

    console.log("Étudiant trouvé:", etudiant ? etudiant.nom : "Non trouvé");

    if (!etudiant) {
      console.log("Étudiant non trouvé en BDD");
      return res.redirect('/login');
    }

    res.render('pages/etudiant', { 
      etudiant,
      hasSubmitted: etudiant.hasSubmitted || false
    });

  } catch (err) {
    console.error("Erreur dans getEtudiant:", err);
    res.redirect('/login');
  }
};
//acceder à la page choice.ejs
 exports.getChoice=async(req,res,next)=>{
    try{
        res.status(201).render('pages/choice')
    }catch(err){
        res.status(404).json({err})
    }

 }



exports.getAllUsers= (req,res,next)=>{

    Etudiant.find({})
       .then((etudiant)=>res.status(201).json({etudiant:etudiant}))
       .catch((err)=>res.status(500).json({err}))
   
    
}


//Acceder à la page login pour le test
exports.getLogin= (req,res,next)=>{
    try{
   res.status(201).render('pages/login')
    }catch(err){
        res.status(500).json({err})
    }  
}

//Logout

exports.logout = (req, res) => {
    // Détruire la session en base de données/mémoire
    req.session.destroy((err) => {
        if (err) {
            console.error("Erreur lors de la déconnexion :", err);
            return res.redirect('/etudiant');
        }
        // Effacer le cookie de session
        res.clearCookie('connect.sid'); // Nom par défaut de express-session
        res.redirect('/login');
    });
};