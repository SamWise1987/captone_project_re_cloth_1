const express = require('express');
const ClothingItem = require('../models/ClothingItem');
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

module.exports = router;