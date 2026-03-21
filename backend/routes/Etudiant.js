
const etudiantCtrl=require('../controllers/Etudiant')
const sujetCtrl=require('../controllers/Sujet')
const express=require('express');
const auth=require('../middleware/auth')
const router=express.Router()





router.post('/signup',etudiantCtrl.signUp);
router.post('/etudiant/auth/login',etudiantCtrl.login);
router.get('/users',etudiantCtrl.getAllUsers)

// Routes pour le teste des interfaces
router.get('/admin',etudiantCtrl.getAdmin)
router.get('/enseign',etudiantCtrl.getEnseignant)
router.get('/etudiant',etudiantCtrl.getEtudiant)
router.get('/logg',etudiantCtrl.getLogin)

router.get('/sujets',sujetCtrl.getEverySub)
router.post('/sujet',sujetCtrl.sendSujets)
router.post('/etudiant/auth/soumission',auth,sujetCtrl.creatSub)
// router.get('/')

module.exports=router;
