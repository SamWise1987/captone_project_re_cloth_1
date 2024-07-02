const mongoose = require('mongoose');

const repairerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: String,
    address: String,
    specialization: String,
    ratings: {type: [Number], default: []},
    clothingTypes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ClothingItem'}],
    registrationDate: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Repairer', repairerSchema);