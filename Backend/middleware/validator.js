const { check, validationResult } = require('express-validator');




// Middleware for email validation
exports.checkMail = async (req, res, next) => {
  try {
    await check('email')
      .trim()
      .not().isEmpty().withMessage('Saisir une adresse mail')
      .matches(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i).withMessage('Adresse email non valide')
      .normalizeEmail() // Normalise l'email en supprimant les points et en mettant tout en minuscule
      .isEmail().withMessage('Adresse email non conforme')
      .run(req);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    next();
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur lors de la validation de l\'email' });
  }
};

// Middleware for password validation
exports.checkPassword = async (req, res, next) => {
  try {
    await check('password')
      .not().isEmpty().withMessage('Saisir un mot de passe')
      .isStrongPassword({
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 0
      }).withMessage('Le mot de passe doit comporter au moins 8 caractères, incluant au moins une lettre majuscule, une lettre minuscule et un chiffre')
      .run(req);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    next();
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur lors de la validation du mot de passe' });
  }
};