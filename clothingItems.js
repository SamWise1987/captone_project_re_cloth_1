const express = require('express');
const ClothingItem = require('../Models/ClothingItem');
const router = express.Router();

// Creare un nuovo capo di abbigliamento
router.post('/', async (req, res) => {
    try {
        const clothingItem = new ClothingItem(req.body);
        await clothingItem.save();
        res.status(201).send(clothingItem);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Ottenere tutti i capi di abbigliamento
router.get('/', async (req, res) => {
    try {
        const clothingItems = await ClothingItem.find();
        res.send(clothingItems);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Ottenere un capo di abbigliamento per ID
router.get('/:id', async (req, res) => {
    try {
        const clothingItem = await ClothingItem.findById(req.params.id);
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
        );
        if (!clothingItem) {
            return res.status(404).send('Clothing item not found');
        }
        res.json(clothingItem);
    } catch (error) {
        res.status(500).send('Server error');
    }
});

module.exports = router;

module.exports = router;