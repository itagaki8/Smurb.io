
import natural from 'natural';
import npl from 'compromise';
import nlp from 'compromise';
import sw from 'stopword'

// import sw, {fr as STOPWORDS_FR} from "stopword"
// import cosineSimilarity from "com"
// Tokenizers
// const WordTokenizer = new natural.WordTokenizer();
// const TreebankTokenizer = new natural.TreebankWordTokenizer(); // mieux pour ponctuation
// const SentenceTokenizer = new natural.SentenceTokenizer();

// const { NGrams }=natural;
// const TfIdf=natural.TfIdf;

// const text = "Bonjour ! Ceci est un test. On veut tokeniser les phrases et les mots.";
// const sentences = SentenceTokenizer.tokenize(text);

// const words = TreebankTokenizer.tokenize(text);

// // const tokens = ["machine", "learning", "est", "génial","à","apprendre"];

// // const trigrams=NGrams.ngrams(tokens,3)
// // console.log(trigrams)

// //Tf-IDF 

// const tfidf=new TfIdf();
// tfidf.addDocument("Le machine learning est utile")
// tfidf.addDocument('Le deep learning est une branche du machine learning')

// tfidf.tfidfs('deep',(i,measure)=>{
//     console.log(`Doc #${i}:${measure}`)
// })


// tfidf.listTerms(1) // doc index 1
//   .slice(0, 5)
//   .forEach(item => console.log(item.term, item.tfidf))

  
// const tokens = ["ceci", "est", "un", "exemple", "de", "texte", "court"];
// const filtered = sw.removeStopwords(tokens, STOPWORDS_FR);
// console.log(filtered)

const treetext=new natural.TreebankWordTokenizer()

const text="I'm fallen in love ,and this time i hope it's for real."
const test=treetext.tokenize(text)
// console.log(test)

const obama="Barack Obama visited paris in 2015"

const doc=nlp(obama)
const sentences=doc.places().out('array');
console.log(sentences)

const stopwords = ["le","la","les","sur","dans","un","une","des"];

const phrase="le chat est sur le canape"
     .toLowerCase()
     .split(" ")
     .filter(w=>!stopwords.includes(w));

console.log(phrase)