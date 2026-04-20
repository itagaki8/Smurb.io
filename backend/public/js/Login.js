document.getElementById('loginForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const formData = new FormData(e.target);
  const data = Object.fromEntries(formData);

  try {
    const res = await fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
      credentials: 'include' // ✅ Important pour maintenir les cookies de session
    });

    const result = await res.json();

    if (result.success) {
      // ✅ Redirection vers la page étudiant
      window.location.href = result.redirect;
    } else if (result.error) {
      alert('Erreur: ' + result.error);
      window.location.reload();
    } else {
      alert('Erreur: Identifiants incorrects');
      window.location.reload();
    }
  } catch (error) {
    console.error('Erreur réseau:', error);
    alert('Erreur de connexion');
  }
});