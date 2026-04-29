const express = require('express');
const session = require("express-session");
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo').default;
const etudiantRoute = require('./routes/Etudiant');

require("dotenv").config();

const app = express();
const dataBaseUrl = process.env.DATABASE_URI;

// CORRECTION : Connexion BDD robuste
async function dbConnection() {
    try {
        await mongoose.connect(dataBaseUrl);
        console.log('Connection etablie 🥳');
    } catch (err) {
        console.error('Erreur fatale de connexion BDD :', err);
    }
}
dbConnection();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, "views"));

// CONFIGURATION PROXY (Nécessaire pour Render)
app.set('trust proxy', 1);

// CONFIGURATION SESSION (connect-mongo v6)
app.use(session({
    name: 'sessionId',
    secret: process.env.SESSION_SECRET || 'fallback-secret-smurb',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ 
        mongoUrl: dataBaseUrl, // Utilise la même variable que mongoose
        collectionName: 'sessions',
        ttl: 14 * 24 * 60 * 60 // Durée de vie 14 jours
    }),
    cookie: { 
        secure: process.env.NODE_ENV === 'production', 
        maxAge: 1000 * 60 * 60 * 24 * 7, // 1 semaine
        httpOnly: true,
        sameSite: 'lax'
    }
}));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors()); // Ajouté pour éviter des blocages browser

app.use('/', etudiantRoute);

module.exports = app;