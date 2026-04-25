// import { ROUTES } from "./config.js";

// document.getElementById('loginForm').addEventListener('submit',async (e)=>{
//   e.preventDefault();

//   const formData=new FormData(e.target);
//   const data=Object.fromEntries(formData)

//   const res= await fetch(ROUTES.login,{
//     method:'POST',
//     headers:{
//         'Content-Type':'application/json',
        
        
//     },

//     body:JSON.stringify(data)
//   })
//   const result=await res.json();

//   if(result.token){
//     const token=result.token
//     localStorage.setItem('token',result.token)
        
//      localStorage.setItem('etudiant', JSON.stringify(result.etudiant))
//         window.location.href='/etudiant';

//         //  console.log(token)

//   }
//    else{ 
//     alert(result.message)

//     console.log("hello");
// }
// })