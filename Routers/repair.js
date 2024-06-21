const express = require('express');
const Repair = require('../models/Repair');
const router = express.Router();

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

module.exports = router;