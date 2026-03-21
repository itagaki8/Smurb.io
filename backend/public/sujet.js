
const sujetTab = document.getElementById('sujets');
fetch('http://localhost:5400/user/auth/sujets')
  .then(result => result.json())   // <- on retourne le json
  .then(data => {
    data.sujet.forEach(sujet => {
      const row=document.createElement('tr');
      row.innerHTML=`
      <td>${sujet.intitulé}</td>
      <td>${sujet.description}</td>
      `
      console.log(row)

      sujetTab.appendChild(row)
    });
   })
  .catch(err => {
    console.log(err);
  });