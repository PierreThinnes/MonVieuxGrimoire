const multer = require('multer');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};

// Configuration
const storage = multer.diskStorage({
  // Enregistrement des fichiers dans le dossier images
  destination: (req, file, callback) => {
    callback(null, 'images');
  },

  // Nom des images => nom d'origine, remplacement des espaces et des points par des underscores, ajout d'un timestamp
  filename: (req, file, callback) => {
    const name = file.originalname.replace(/[\s.]+/g, '_');
    const extension = 'webp';
    callback(null, name + Date.now() + '.' + extension);
  }
});

// Gestion des téléchargements de fichiers image uniquement
module.exports = multer({storage: storage}).single('image');

// Redimensionnement de l'image
module.exports.resizeImage = async (req, res, next) => {
  // On vérifie si un fichier a été téléchargé
  if (req.file) {
    // Vérifie si le fichier a été modifié
    console.log(req.file);
    const newName = req.file.filename.split(".")[0];
    req.file.filename = newName + ".webp";

    await sharp(req.file.path)
        .resize(300)
        .toFile(path.resolve(req.file.destination, newName + ".webp"));
    fs.unlinkSync(req.file.path);
}
next();
};