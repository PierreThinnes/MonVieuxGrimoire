const bcrypt = require('bcrypt');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

// POST => Création de compte
exports.signup = (req, res, next) => {
    // Appel de la fonction de hachage de bcrypt dans le MDP (qui est "salé" 10 fois)
    bcrypt.hash(req.body.password, 10)
    // Utilisation du hash pour créer un utilisateur
      .then(hash => {
        // Création d'une instance du modèle User
        const user = new User({
          email: req.body.email,
          password: hash
        });
        // Enregistrement dans la base de données
        user.save()
          .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
          .catch(error => res.status(400).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
};


// POST => Connexion
exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email })
        .then(user => {
            if (user === null) {
                res.status(401).json({ message: 'Paire identifiant / mot de passe incorecte' });
            } else {
                bcrypt.compare(req.body.password, user.password)
                    .then(valid => {
                        if (!valid) {
                            res.status(401).json({ message: 'Paire identifiant / mot de passe incorecte' })
                        } else {
                            res.status(200).json({
                                userId: user._id,
                                token: jwt.sign(
                                    { userId: user._id },
                                    process.env.tk,
                                    { expiresIn: '24h' }
                                )
                            });
                        }
                    })
                    .catch(error => {
                        res.status(500).json({ error });
                    })
            }
        })
        .catch(error => res.status(500).json({ error }))
};