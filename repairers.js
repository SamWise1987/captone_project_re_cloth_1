require('dotenv').config();
const express = require('express');
const Repairer = require('../Models/Repairer');
const router = express.Router();
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');

// Creare un nuovo riparatore
router.post('/', async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
        const repairer = new Repairer({
            username: req.body.username,
            password: hashedPassword,
        });
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

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const repairer = await Repairer.findOne({ username });
    if (!repairer) {
        return res.status(400).send('Invalid username or password');
    }
    const validPassword = await bcrypt.compare(password, repairer.password);
    if (!validPassword) {
        return res.status(400).send('Invalid username or password');
    }
    const token = jwt.sign({ _id: repairer._id }, process.env.JWT_SECRET);
    res.header('auth-token', token).send(token);
});

module.exports = router;