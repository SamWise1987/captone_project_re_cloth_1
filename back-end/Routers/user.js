require('dotenv').config();
const express = require('express');
const User = require('../Models/User');
const ClothingItem = require('../Models/ClothingItem');
const router = express.Router();
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const auth = require('../OAuth/jwt');


// Creare un nuovo utente
router.post('/', async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
        const user = new User({
            username: req.body.username,
            password: hashedPassword,
            name: req.body.name,
            email: req.body.email,
            address: req.body.address,
            phone: req.body.phone
        });
        await user.save();
        res.status(201).send(user);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Ottenere tutti gli utenti
router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.send(users);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Ottenere un utente per ID
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).send();
        }
        res.send(user);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Login
// Login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(400).send('Invalid email or password');
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
        return res.status(400).send('Invalid email or password');
    }
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    res.send({ token, userId: user._id, name: user.name || user.username });
});

// Rotte protette
router.get('/protected-route', auth, (req, res) => {
    res.send('This is a protected route');
});

// Ottenere gli articoli di abbigliamento per utente
router.get('/clothingitems/user', auth, async (req, res) => {
    try {
        const userId = req.user._id; // Assicurati che l'ID utente sia disponibile nel req.user
        const clothingItems = await ClothingItem.find({ userId }).populate('userId', 'name email');
        res.send(clothingItems);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send(error);
    }
});

module.exports = router;