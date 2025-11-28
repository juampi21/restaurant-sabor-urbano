const mongoose = require('mongoose');

// Esquema de Mongoose para Empleados
const employeeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    role: { type: String, required: true },
    area: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Employee', employeeSchema);
