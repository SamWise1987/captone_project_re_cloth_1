const express = require('express');
const ClothingItem = require('../models/ClothingItem');
const router = express.Router();


router.get('/clothing', async (req, res) => {
    const clothing = await Clothing.find();
    res.send(clothing);
});