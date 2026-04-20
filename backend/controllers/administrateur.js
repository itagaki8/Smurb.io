
//Acceder à la page administrateur pour le test
exports.getAdmin=async (req,res,next)=>{
    try{
  await res.status(201).render('pages/administrateur')
    }catch(err){
        res.status(500).json({err})
    }  
}