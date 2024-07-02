const express = require('express');
const Repair = require('../Models/Repair');
const router = express.Router();
const multer = require('multer');
const cloudinary = require('../Cloudinary/cloudinaryConfig');
const { CloudinaryStorage } = require('multer-storage-cloudinary');


// Creare una nuova riparazione
router.post('/', async (req, res) => {
    try {
        const repair = new Repair({
            clothingItemId: req.body.clothingItemId,
            repairerId: req.body.repairerId,
            description: req.body.description,
            clothingTypes: req.body.clothingTypes,
        });
        await repair.save();
        res.status(201).send(repair);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Ottenere tutte le riparazioni
router.get('/', async (req, res) => {
    try {
        const repairs = await Repair.find();
        res.send(repairs);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Ottenere una riparazione per ID
router.get('/:id', async (req, res) => {
    try {
        const repair = await Repair.findById(req.params.id);
        if (!repair) {
            return res.status(404).send();
        }
        res.send(repair);
    } catch (error) {
        res.status(500).send(error);
    }
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'repairs',
        format: async (req, file) => 'png', // supports promises as well
        public_id: (req, file) => file.originalname,
    },
});

const upload = multer({ storage: storage });

router.post('/upload', upload.single('image'), async (req, res) => {
    try {
        const repair = new Repair({
            // ... altri campi ...
            imageUrl: req.file.path,  // salva l'URL dell'immagine
        });
        await repair.save();
        res.status(201).send(repair);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;