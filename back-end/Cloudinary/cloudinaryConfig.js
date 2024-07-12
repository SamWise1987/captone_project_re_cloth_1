const cloudinary = require('cloudinary').v2;
//const { CloudinaryStorage } = require('multer-storage-cloudinary');
//const multer = require('multer');
const dotenv = require('dotenv');

dotenv.config();

console.log(process.env.CLOUD_NAME);
console.log('CLOUD_NAME:', process.env.CLOUD_NAME); // Aggiungi questo
console.log('API_KEY:', process.env.API_KEYS); // Aggiungi questo
console.log('API_SECRET:', process.env.API_SECRET); // Aggiungi questo

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEYS,
    api_secret: process.env.API_SECRET
});

module.exports = cloudinary;

// Configuro multer qui come "globale" oppure per ogni rotta in cui lo devo utilizzare?
