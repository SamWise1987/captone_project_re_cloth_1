const mongoose = require('mongoose');

const upcyclingSchema = new mongoose.Schema({
    clothingItemId: { type: mongoose.Schema.Types.ObjectId, ref: 'ClothingItem', required: true },
    design: String,
    description: String,
    creationDate: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Upcycling', upcyclingSchema);