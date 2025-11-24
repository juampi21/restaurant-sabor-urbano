const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    clientName: { type: String, required: true },
    platform: { type: String, required: true },
    products: { type: String, required: true },
    total: { type: Number, required: true },
    status: {
        type: String,
        enum: ['pendiente', 'completado', 'cancelado'],
        default: 'pendiente'
    },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', orderSchema);
