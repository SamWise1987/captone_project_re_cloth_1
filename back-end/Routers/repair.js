const express = require('express');
const Repair = require('../Models/Repair');
const router = express.Router();
const multer = require('multer');
const cloudinary = require('../Cloudinary/cloudinaryConfig');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const mongoose = require('mongoose');


// Creare una nuova riparazione
router.post('/', async (req, res) => {
    try {
        console.log('Request Body:', req.body); // Log del corpo della richiesta

        // Converti le stringhe in ObjectId
        const userId = new mongoose.Types.ObjectId(req.body.userId);
        const clothingItemId = new mongoose.Types.ObjectId(req.body.clothingItemId);
        const repairerId = new mongoose.Types.ObjectId(req.body.repairerId);

        console.log('UserId:', userId);
        console.log('ClothingItemId:', clothingItemId);
        console.log('RepairerId:', repairerId);

        const repair = new Repair({
            userId: userId,
            clothingItemId: clothingItemId,
            repairerId: repairerId,
            description: req.body.description,
            clothingTypes: req.body.clothingTypes.map(id => new mongoose.Types.ObjectId(id)),
        });

        await repair.save();
        console.log('Saved Repair:', repair);
        res.status(201).send(repair);
    } catch (error) {
        console.error('Error:', error); // Log dell'errore per debugging
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
            return res.status(404).send('Riparazione non trovata');
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
        format: async (req, file) => 'png',
        public_id: (req, file) => file.originalname,
    },
});

const upload = multer({ storage: storage });

router.post('/upload', upload.single('image'), async (req, res) => {
    try {
        const repair = new Repair({
            userId: req.body.userId,
            clothingItemId: req.body.clothingItemId,
            repairerId: req.body.repairerId,
            description: req.body.description,
            imageUrl: req.file.path,  // salva l'URL dell'immagine
        });
        await repair.save();
        res.status(201).send(repair);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const update = req.body;

        const uptadedRepair = await Repair.findByIdAndUpdate(id, update, { new: true });
        if (!updatedRepair) {
            return res.status(404).send('Riparazione non trovata');
        }
        res.send(updatedRepair);


    }catch(e){
        console.error(e);
        res.status(500).send(e);
    }
});


router.put('/:id/repairStatus', async (req, res) => {
    try {
        const { repairStatus } = req.body;
        const repair = await Repair.findByIdAndUpdate(
            req.params.id,
            { repairStatus },
            { new: true }
        ).populate('userId', 'name email');
        if (!repair) {
            return res.status(404).send('Repair not found');
        }
        res.send(repair);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send(error);
    }
});

module.exports = router;