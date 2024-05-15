const express = require("express");
const mongoose = require("mongoose")

//const bookRoutes = require("./routes/book");
const userRoutes = require("./routes/user");

const path = require('path');

require("dotenv").config()


const connexionMongoose = () => {
    mongoose.connect(process.env.DBLINK, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("Connexion à MongoDB réussie !");
    })
    .catch((err) => {
        console.error("Connexion à MongoDB échouée !", err);
    });
};
connexionMongoose();

//Création de l'application
const app = express();

//Middleware permettant à Express d'extraire le corps Json des reaquetes POST
app.use(express.json());

// Middleware gérant les erreurs de CORS
app.use((req, res, next) => {
    // Accès à notre API depuis n'importe quelle origine
    res.setHeader('Access-Control-Allow-Origin', '*');
    // Autorisation d'ajouter les headers mentionnés aux requêtes envoyées vers notre API
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    // Autorisation d'envoyer des requêtes avec les méthodes mentionnées
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

// mise avant pour indiquer à Express qu'il faut gérer la ressource images de manière statique
app.use("/images", express.static(path.join(__dirname, "images"))); 

// Enregistrement des routeurs
//app.use("/api/books", bookRoutes);
app.use("/api/auth", userRoutes);


module.exports = app