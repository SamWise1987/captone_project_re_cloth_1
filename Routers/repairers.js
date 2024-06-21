const express = require('express');
const Repairer = require('../models/Repairer');
const router = express.Router();

// Creare un nuovo riparatore
router.post('/', async (req, res) => {
    try {
        const repairer = new Repairer(req.body);
        await repairer.save();
        res.status(201).send(repairer);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Ottenere tutti i riparatori
router.get('/repairers', async (req, res) => {
    const clothingId = req.query.clothingId;
    const repairers = await Repairer.find({ clothingTypes: clothingId }).populate('clothingTypes');
    // Calcola il rating medio per ogni riparatore
    const repairersWithAverageRating = repairers.map(repairer => {
        const averageRating = repairer.ratings.reduce((a, b) => a + b, 0) / repairer.ratings.length;
        return { ...repairer._doc, averageRating };
    });
    res.send(repairersWithAverageRating);
});

// Ottenere un riparatore per ID
router.get('repairers/:id', async (req, res) => {
    try {
        const repairer = await Repairer.findById(req.params.id).populate('clothingTypes');
        if (!repairer) {
            return res.status(404).send();
        }
        res.send(repairer);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;