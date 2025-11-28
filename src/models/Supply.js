const mongoose = require('mongoose');

// Esquema de Mongoose para Insumos
const supplySchema = new mongoose.Schema({
    name: { type: String, required: true },
    quantity: { type: Number, required: true },
    unit: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Supply', supplySchema);
