const mongoose = require('mongoose');

const repairSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    clothingItemId: { type: mongoose.Schema.Types.ObjectId, ref: 'ClothingItem', required: true },
    repairerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Repairer', required: true },
    description: String,
    repairDate: { type: Date, default: Date.now },
    condition: String,
    cost: Number,
    imageUrl: String,
    clothingTypes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ClothingItem'}],
    stateOfPayment: { type: String, default: 'non pagato'},
    repairStatus: { type: String, enum: ['pending', 'in progress', 'completed', 'not applicable'], default: 'pending' },
});

module.exports = mongoose.model('Repair', repairSchema);