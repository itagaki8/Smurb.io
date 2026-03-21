import { ROUTES } from "/config.js"
document.getElementById('soumission').addEventListener('submit',async(e)=>{
 e.preventDefault()
const intitule=document.getElementById('intitule').value
const description=document.getElementById('description').value

const token=localStorage.getItem('token')
 const res= await fetch(ROUTES.submission,{
   method:"POST",
   headers:{
    "Content-Type":"application/json",
    "Authorization":"Bearer " + token
   },
   body:JSON.stringify({
    intitule,
    description
   })
 })

 const data=await res.json()
 console.log(data)
 alert("Sujet envoyé avec succès")
})