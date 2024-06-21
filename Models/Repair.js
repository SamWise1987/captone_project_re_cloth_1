const mongoose = require('mongoose');

const repairSchema = new mongoose.Schema({
    clothingItemId: { type: mongoose.Schema.Types.ObjectId, ref: 'ClothingItem', required: true },
    repairerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Repairer', required: true },
    description: String,
    repairDate: { type: Date, default: Date.now },
    condition: String,
    cost: Number,
    clothingTypes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ClothingItem'}],
});

module.exports = mongoose.model('Repair', repairSchema);