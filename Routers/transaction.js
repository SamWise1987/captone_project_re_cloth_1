const express = require('express');
const Transaction = require('../models/Transaction');
const router = express.Router();

// Creare una nuova transazione
router.post('/', async (req, res) => {
    try {
        const transaction = new Transaction(req.body);
        await transaction.save();
        res.status(201).send(transaction);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Ottenere tutte le transazioni
router.get('/', async (req, res) => {
    try {
        const transactions = await Transaction.find();
        res.send(transactions);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Ottenere una transazione per ID
router.get('/:id', async (req, res) => {
    try {
        const transaction = await Transaction.findById(req.params.id);
        if (!transaction) {
            return res.status(404).send();
        }
        res.send(transaction);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;