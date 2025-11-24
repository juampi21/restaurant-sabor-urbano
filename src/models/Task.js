const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    description: { type: String, required: true },
    priority: {
        type: String,
        enum: ['alta', 'media', 'baja'],
        default: 'media'
    },
    state: {
        type: String,
        enum: ['pendiente', 'en proceso', 'finalizada'],
        default: 'pendiente'
    },
    assignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee'
    },
    observations: { type: String },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Task', taskSchema);
