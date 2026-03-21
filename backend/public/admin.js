

  const form = document.querySelector('form');

  form.addEventListener('submit', function(e) {
    e.preventDefault();

    const nom = form.querySelector('input[type="text"]').value;
    const email = form.querySelector('input[type="email"]').value;
    const role = form.querySelector('select').value;

    alert(`Utilisateur créé :
Nom : ${nom}
Email : ${email}
Rôle : ${role}`);

    form.reset();
  });

