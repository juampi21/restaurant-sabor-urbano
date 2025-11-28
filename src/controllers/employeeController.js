const Employee = require('../models/Employee');
const fs = require('fs').promises;
const path = require('path');

// Obtiene roles y áreas desde archivos JSON
const getRolesAndAreas = async () => {
    const rolesData = await fs.readFile(path.join(__dirname, '../data/roles.json'), 'utf-8');
    const areasData = await fs.readFile(path.join(__dirname, '../data/areas.json'), 'utf-8');
    return {
        roles: JSON.parse(rolesData),
        areas: JSON.parse(areasData)
    };
};

// Obtiene todos los empleados y renderiza la lista
exports.getAllEmployees = async (req, res) => {
    try {
        const employees = await Employee.find();
        res.render('employees/list', { employees, title: 'Lista de Empleados' });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Renderiza el formulario para crear un nuevo empleado
exports.getCreateForm = async (req, res) => {
    const { roles, areas } = await getRolesAndAreas();
    res.render('employees/form', { title: 'Nuevo Empleado', roles, areas });
};

// Crea un nuevo empleado en la base de datos
exports.createEmployee = async (req, res) => {
    try {
        await Employee.create(req.body);
        res.redirect('/employees');
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Renderiza el formulario para editar un empleado existente
exports.getEditForm = async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.id);
        const { roles, areas } = await getRolesAndAreas();
        res.render('employees/form', { title: 'Editar Empleado', employee, roles, areas });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Actualiza la información de un empleado
exports.updateEmployee = async (req, res) => {
    try {
        await Employee.findByIdAndUpdate(req.params.id, req.body);
        res.redirect('/employees');
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Elimina un empleado de la base de datos
exports.deleteEmployee = async (req, res) => {
    try {
        await Employee.findByIdAndDelete(req.params.id);
        res.redirect('/employees');
    } catch (error) {
        res.status(500).send(error.message);
    }
};
