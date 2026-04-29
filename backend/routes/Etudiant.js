
const etudiantCtrl=require('../controllers/Etudiant')
const sujetCtrl=require('../controllers/Sujet')
const DirecteurCtrl=require("../controllers/Directeur")
const adminCtrl=require('../controllers/Admin')
const express=require('express');
const indexCtrl=require('../controllers/Index')
const auth=require('../middleware/auth')
const router=express.Router()



router.post('/admin/signup',adminCtrl.createAdmin)

router.post('/admin/signup/etudiant',etudiantCtrl.signUp);
router.post('/login',etudiantCtrl.login);
router.get('/users',etudiantCtrl.getAllUsers)

// Routes pour le teste des interfaces
// router.get('/admin',etudiantCtrl.getAdmin)

router.get('/etudiant',etudiantCtrl.getEtudiant)
router.get('/login',etudiantCtrl.getLogin)
router.get('/',indexCtrl.getIndex)
router.get('/logindir',DirecteurCtrl.getLogindirecteur)
router.get('/admin',adminCtrl.getDashboard)
router.get('/directeur',DirecteurCtrl.getDirecteurDashboard)
router.get('/admin/login',adminCtrl.getLoginAdmin)


router.post('/login-directeur',DirecteurCtrl.loginDirecteur)
router.post('/login-admin',adminCtrl.loginAdmin)
router.post('/etudiant/soumission',sujetCtrl.creatSub)
router.post('/admin/signup/directeur',DirecteurCtrl.CreatDirecteur)
router.get('/logout',etudiantCtrl.logout)

module.exports=router;
