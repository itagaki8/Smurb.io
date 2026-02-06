document.getElementById('loginForm').addEventListener('submit',async (e)=>{
  e.preventDefault();

  const formData=new FormData(e.target);
  const data=Object.fromEntries(formData)

  const res= await fetch('/http://localhost:5400/user/auth/login',{
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body:JSON.stringify(data)
  })
  const result=await res.json();

  if(res.ok){
    if(result.role==='admin'){
        window.location.href('Administrateur.html')
    }else if(result.role==="Enseignant"){
        window.location.href('Enseignant.html')
    }else if(result.role==='Etudiant'){
        window.location.href('Etudiant.html')
    } else{
        alert("Role non reconnu.")
    }
  }alert(result.message)
  console.log(result.categorie);
})