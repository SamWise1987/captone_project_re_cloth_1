require('dotenv').config();
const express = require('express');
const Repairer = require('../Models/Repairer');
const router = express.Router();
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
//const auth = require('../OAuth/jwt');




// Creare un nuovo riparatore
router.post('/', async (req, res) => {
    try {
        console.log(req.body);
        console.log('Name:', req.body.name);
        console.log('Email:', req.body.email);
        const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
        const repairer = new Repairer({
            username: req.body.username,
            password: hashedPassword,
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            address: req.body.address,
            specialization: req.body.specialization,
            ratings: req.body.ratings,
            clothingTypes: req.body.clothingTypes
        });
        console.log('Repairer Data:', repairer)
        await repairer.save();
        const token = jwt.sign({ _id: repairer._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(201).send({ token, userId: repairer._id, name: repairer.name || repairer.username });
    } catch (error) {
        res.status(400).send(error);
    }
});

// Ottenere tutti i riparatori
router.get('/', async (req, res) => {
   // const clothingId = req.query.clothingId;
    const repairers = await Repairer.find().populate('clothingTypes');
    // Calcolo il rating medio per ogni riparatore
    const repairersWithAverageRating = repairers.map(repairer => {
        const averageRating = repairer.ratings.reduce((a, b) => a + b, 0) / repairer.ratings.length;
        return { ...repairer._doc, averageRating };
    });
    res.send(repairersWithAverageRating);
});

// Ottenere un riparatore per ID
router.get('/:id', async (req, res) => {
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
    const { email, password } = req.body;
    const repairer = await Repairer.findOne({ email });
    if (!repairer) {
        return res.status(400).send('Invalid email or password');
    }
    const validPassword = await bcrypt.compare(password, repairer.password);
    if (!validPassword) {
        return res.status(400).send('Invalid email or password');
    }
    const token = jwt.sign({ _id: repairer._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.send({ token, userId: repairer._id, name: repairer.name || repairer.username });
});

module.exports = router;