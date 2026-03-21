import natural from 'natural';
import nlp from 'compromise';
import sw, { fr as STOPWORDS_FR } from 'stopword';
import cosineSimilarity from 'compute-cosine-similarity';

const tokenizer = new natural.TreebankWordTokenizer();

function preprocessFR(text) {
  // Normalisation légère
  const normalized = nlp(text).normalize({ lowercase: true }).text();
  // Tokenisation
  let tokens = tokenizer.tokenize(normalized);
  // Stopwords FR
  tokens = sw.removeStopwords(tokens, STOPWORDS_FR);
  // Garde que lettres (avec accents) et longueur > 1
  tokens = tokens.filter(t => t.length > 1 && /[a-zàâäéèêëîïôöùûüç]+/i.test(t));
  return tokens;
}

function buildTfidfVectors(docs) {
  const tfidf = new natural.TfIdf();
  const processed = docs.map(d => preprocessFR(d));
  processed.forEach(tokens => tfidf.addDocument(tokens.join(' ')));

  // Construire un vocabulaire global ordonné
  const vocabSet = new Set();
  for (let i = 0; i < docs.length; i++) {
    tfidf.listTerms(i).forEach(({ term }) => vocabSet.add(term));
  }
  const vocab = Array.from(vocabSet); // ordre fixe

  // Transformer chaque document en vecteur dense sur ce vocabulaire
  const vectors = docs.map((_, i) => {
    const weightsByTerm = new Map();
    tfidf.listTerms(i).forEach(({ term, tfidf: w }) => {
      weightsByTerm.set(term, w);
    });
    return vocab.map(term => weightsByTerm.get(term) ?? 0);
  });

  return { vectors, vocab, tfidf };
}

function cosine(docA, docB) {
  const { vectors } = buildTfidfVectors([docA, docB]);
  return cosineSimilarity(vectors[0], vectors[1]) || 0; // 0 si NaN
}

// === Démo ===
const A = "Le machine learning est utile pour l'analyse prédictive.";
const B = "Le deep learning est une branche du machine learning.";
const C = "J’adore la cuisine italienne et les pizzas.";

console.log('sim(A,B)=', cosine(A, B)); // proche de 1
console.log('sim(A,C)=', cosine(A, C)); // proche de 0