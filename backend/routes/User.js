const userMod=require('../models/User');
const useCtrl=require('../controllers/User')
const express=require('express');
const router=express.Router()
const path=require('path')

router.use(express.static(path.join(__dirname,'public')))


router.post('/signup',useCtrl.signUp);
router.post('/login',useCtrl.login);


router.get('/',(req,res,next)=>{
    res.sendFile(path.join(__dirname,'..','public','login.html'))
        
})

module.exports=router;
