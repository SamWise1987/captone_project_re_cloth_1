const express = require('express');
const Upcycling = require('../models/Upcycling');
const router = express.Router();

// Creare un nuovo upcycling
router.post('/', async (req, res) => {
    try {
        const upcycling = new Upcycling(req.body);
        await upcycling.save();
        res.status(201).send(upcycling);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Ottenere tutti gli upcycling
router.get('/', async (req, res) => {
    try {
        const upcyclings = await Upcycling.find();
        res.send(upcyclings);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Ottenere un upcycling per ID
router.get('/:id', async (req, res) => {
    try {
        const upcycling = await Upcycling.findById(req.params.id);
        if (!upcycling) {
            return res.status(404).send();
        }
        res.send(upcycling);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;