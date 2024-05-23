const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');
const { checkMail, checkPassword } = require("../middleware/validator");
const rateLimit = require('express-rate-limit');

// Rate limiter

const limiter = rateLimit({
    windowMs: 3 * 60 * 1000, // 1 minute
    max: 10, // limit each IP to 10 requests per windowMs
    message: "Trop de requêtes effectuées, veuillez réessayer plus tard.",
    standardHeaders: true,
    legacyHeaders: false,
  });



// Logique des routes user
router.post('/signup',
            limiter,
            [checkMail, checkPassword],
            userCtrl.signup);
router.post('/login',
            limiter,
            [checkMail, checkPassword],
            userCtrl.login);

module.exports = router;