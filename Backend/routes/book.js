const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const upload = require("../middleware/upload");
const sharp = require("../middleware/sharp");

const booksCtrl = require("../controllers/books");

// Logique des routes books
router.get("/", booksCtrl.getAllBooks);
router.get("/bestrating", booksCtrl.getBestRating);
router.get("/:id", booksCtrl.getOneBook);

router.post("/", auth, upload, sharp, booksCtrl.createBook);
router.post("/:id/rating", auth, booksCtrl.createRating);
router.put("/:id", auth, upload, sharp, booksCtrl.modifyBook);
router.delete("/:id", auth, booksCtrl.deleteBook);

module.exports = router;
