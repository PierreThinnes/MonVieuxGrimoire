const express = require('express');
const router = express.Router();
const limiter = require("../middleware/validator");
const userCtrl = require('../controllers/user');
const { checkMail, checkPassword } = require("../middleware/validator");
// Logique des routes user
router.post('/signup',
            limiter,
            [validator.checkMail, validator.checkPassword],
            userCtrl.signup);
router.post('/login',
            limiter,
            [checkMail, checkPassword],
            userCtrl.login);

module.exports = router;