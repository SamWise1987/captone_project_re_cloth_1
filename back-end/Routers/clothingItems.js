const express = require('express');
const ClothingItem = require('../Models/ClothingItem');
const router = express.Router();
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../Cloudinary/cloudinaryConfig');
const User = require('../Models/User')

// Configuro multer
// Configuro multer
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'clothing-reparation-folder',
        format: async (req, file) => 'jpeg',
        public_id: (req, file) => `${Date.now()}-${file.originalname}`,
    },
});

const upload = multer({ storage: storage });

// Creare un nuovo capo di abbigliamento
router.post('/', upload.array('photos', 10), async (req, res) => {
    try {
        console.log('Request Body:', req.body);
        console.log('Uploaded Files:', req.files); // Log dei file caricati

        const photos = req.files ? req.files.map(file => file.path) : [];
        const clothingItem = new ClothingItem({
            userId: req.body.userId,
            name: req.body.name,
            type: req.body.type,
            description: req.body.description,
            material: req.body.material,
            condition: req.body.condition,
            photos: photos,
        });

        await clothingItem.save();
        console.log('Saved Clothing Item:', clothingItem);
        res.status(201).send(clothingItem);
    } catch (error) {
        console.error('Error:', error); // Log dell'errore per debugging
        res.status(500).send({ message: 'Something went wrong!', error: error.message });
    }
});

// Ottenere tutti i capi di abbigliamento
router.get('/', async (req, res) => {
    try {
        const clothingItems = await ClothingItem.find().populate('userId', 'name email');
        console.log('Clothing Items:', clothingItems);
        res.send(clothingItems);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send(error);
    }
});

// Ottenere un capo di abbigliamento per ID
router.get('/:id', async (req, res) => {
    try {
        const clothingItem = await ClothingItem.findById(req.params.id).populate('userId', 'name email');
        if (!clothingItem) {
            return res.status(404).send('Clothing item not found');
        }
        res.send(clothingItem);
    } catch (error) {
        res.status(500).send('Server error');
    }
});

router.put('/:id/repairStatus', async (req, res) => {
    try {
        const { repairStatus } = req.body;
        const clothingItem = await ClothingItem.findByIdAndUpdate(
            req.params.id,
            { repairStatus },
            { new: true }
        ).populate('userId', 'name email');
        if (!clothingItem) {
            return res.status(404).send('Clothing item not found');
        }
        res.json(clothingItem);
    } catch (error) {
        res.status(500).send('Server error');
    }
});

module.exports = router;