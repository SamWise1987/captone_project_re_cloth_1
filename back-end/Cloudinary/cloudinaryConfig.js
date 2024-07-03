const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});

// Configuro multer qui come "globale" oppure per ogni rotta in cui lo devo utilizzare?
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'clothing-reparation-folder',
        format: async (req, res) => 'jpeg',
        public_id: (req, file) => `${Date.now()}-${file.originalname}`,
        },
    });

const upload = multer({ storage: storage });
