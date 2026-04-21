
const etudiantCtrl=require('../controllers/Etudiant')
const sujetCtrl=require('../controllers/sujet')
const DirecteurCtrl=require("../controllers/Directeur")
const express=require('express');
const indexCtrl=require('../controllers/Index')
const auth=require('../middleware/auth')
const router=express.Router()





router.post('/signup',etudiantCtrl.signUp);
router.post('/login',etudiantCtrl.login);
router.get('/users',etudiantCtrl.getAllUsers)

// Routes pour le teste des interfaces
// router.get('/admin',etudiantCtrl.getAdmin)
router.get('/enseign',DirecteurCtrl.getEnseignant)
router.get('/etudiant',etudiantCtrl.getEtudiant)
router.get('/login',etudiantCtrl.getLogin)
router.get('/',indexCtrl.getIndex)

router.post('/etudiant/soumission',sujetCtrl.creatSub)
router.post('/directeur',DirecteurCtrl.CreatDirecteur)
router.get('/logout',etudiantCtrl.logout)
router.get('/loggi',(req,res)=>{
    res.json(req.session)
})
// routes/Etudiant.js - Ajoutez cette route de test
router.get('/check-session', (req, res) => {
  res.json({
    sessionId: req.session.id,
    userId: req.session.userId,
    session: req.session
  });
});
module.exports=router;
