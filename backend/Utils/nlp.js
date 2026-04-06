const natural = require("natural");
const sw = require("stopword");

const tokenizer = new natural.WordTokenizer();
const TfIdf = natural.TfIdf;
const stemmer = natural.PorterStemmer;

// 🔹 nettoyage avancé
function nettoyerTexte(texte){

  // 1. minuscule
  let tokens = tokenizer.tokenize(texte.toLowerCase());

  // 2. supprimer mots inutiles
  tokens = sw.removeStopwords(tokens);

  // 3. stemming (racine des mots)
  tokens = tokens.map(token => stemmer.stem(token));

  return tokens.join(" ");
}

// 🔹 cosine similarity
function cosineSimilarity(vecA, vecB){

  let dotProduct = 0;
  let normA = 0;
  let normB = 0;

  const allKeys = new Set([...Object.keys(vecA), ...Object.keys(vecB)]);

  allKeys.forEach(key => {
    const a = vecA[key] || 0;
    const b = vecB[key] || 0;

    dotProduct += a * b;
    normA += a * a;
    normB += b * b;
  });

  return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
}

// 🔹 construire vecteurs TF-IDF
function construireVecteurs(textes){

  const tfidf = new TfIdf();

  textes.forEach(t => tfidf.addDocument(nettoyerTexte(t)));

  const vecteurs = [];

  for(let i = 0; i < textes.length; i++){

    const termes = tfidf.listTerms(i);
    let vecteur = {};

    termes.forEach(t => {
      vecteur[t.term] = t.tfidf;
    });

    vecteurs.push(vecteur);
  }

  return vecteurs;
}

module.exports = {
  nettoyerTexte,
  cosineSimilarity,
  construireVecteurs
};