const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    repairerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Repairer', required: true },
    clothingItemId: { type: mongoose.Schema.Types.ObjectId, ref: 'ClothingItem', required: true },
    transactionDate: { type: Date, default: Date.now },
    amount: Number,
});

module.exports = mongoose.model('Transaction', transactionSchema);