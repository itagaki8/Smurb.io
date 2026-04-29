const Directeur = require('../models/Directeur');
const { construireVecteurs, cosineSimilarity } = require('../Utils/nlp');

async function attribuerDirecteur(sujetIntitule, sujetDescription) {
    const directeurs = await Directeur.find();
    if (directeurs.length === 0) return { directeur: null, score: 0 };

    // COMBINAISON : On donne plus de poids à l'intitulé qu'à la description
    // On répète l'intitulé deux fois pour augmenter sa force vectorielle
    const sujetTexteComplet = `${sujetIntitule} ${sujetIntitule} ${sujetDescription}`;

    const textes = [
        sujetTexteComplet,
        ...directeurs.map(d => (Array.isArray(d.skills) ? d.skills.join(" ") : d.skills || ""))
    ];

    const vecteurs = construireVecteurs(textes);
    const vecteurSujet = vecteurs[0];

    let meilleur = null;
    let meilleurScore = -1; // On commence à -1 pour capturer même les scores de 0

    for (let i = 0; i < directeurs.length; i++) {
        let score = cosineSimilarity(vecteurSujet, vecteurs[i + 1]);

        // --- OPTIMISATION COHÉRENCE ---
        // Si un skill du directeur est EXACTEMENT présent dans le titre, on booste le score
        const skillsD = Array.isArray(directeurs[i].skills) ? directeurs[i].skills : [];
        skillsD.forEach(skill => {
            if (sujetIntitule.toLowerCase().includes(skill.toLowerCase())) {
                score += 0.2; // Bonus de cohérence thématique
            }
        });

        if (score > meilleurScore) {
            meilleurScore = score;
            meilleur = directeurs[i];
        }
    }

    return { directeur: meilleur, score: meilleurScore };
}

module.exports = { attribuerDirecteur };