const mongoose = require('mongoose');

const clothingItemSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    type: String,
    description: String,
    material: String,
    condition: String,
    photo: String,
    registrationDate: { type: Date, default: Date.now },
    repairStatus: {
        type: String,
        enum: ['pending', 'in progress', 'completed', 'not applicable'],
        default: 'pending'
    }
});

module.exports = mongoose.model('ClothingItem', clothingItemSchema);