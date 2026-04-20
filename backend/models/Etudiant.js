const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const etudiantSchema = mongoose.Schema({
    nom: { 
        type: String, 
        required: [true, "Le nom est obligatoire"],
        trim: true 
    },
    email: { 
        type: String, 
        required: [true, "L'email est obligatoire"], 
        unique: true,
        lowercase: true,
        trim: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Veuillez remplir un email valide']
    },
    password: { 
        type: String, 
        required: [true, "Le mot de passe est obligatoire"] ,
        select: false
    },
    matricule: { 
        type: String, // String est souvent préférable pour les matricules (ex: 19-MT-01)
        required: [true, "Le matricule est obligatoire"],
        unique: true 
    },
    
    // --- CONNEXION AVEC LE SYSTÈME SMURB.IO ---
    
    // Indique si l'étudiant a soumis un sujet
    hasSubmitted: { 
        type: Boolean, 
        default: false 
    },

    // Référence vers le sujet (si tu as un modèle Sujet)
    // Cela permet de faire : .populate('sujet')
    sujet: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Sujet' 
    },

    // Historique ou date d'inscription automatique
}, { timestamps: true });

etudiantSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Etudiant', etudiantSchema);