const Employee = require('../models/Employee');
const fs = require('fs').promises;
const path = require('path');

const getRolesAndAreas = async () => {
    const rolesData = await fs.readFile(path.join(__dirname, '../data/roles.json'), 'utf-8');
    const areasData = await fs.readFile(path.join(__dirname, '../data/areas.json'), 'utf-8');
    return {
        roles: JSON.parse(rolesData),
        areas: JSON.parse(areasData)
    };
};

exports.getAllEmployees = async (req, res) => {
    try {
        const employees = await Employee.find();
        res.render('employees/list', { employees, title: 'Lista de Empleados' });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.getCreateForm = async (req, res) => {
    const { roles, areas } = await getRolesAndAreas();
    res.render('employees/form', { title: 'Nuevo Empleado', roles, areas });
};

exports.createEmployee = async (req, res) => {
    try {
        await Employee.create(req.body);
        res.redirect('/employees');
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.getEditForm = async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.id);
        const { roles, areas } = await getRolesAndAreas();
        res.render('employees/form', { title: 'Editar Empleado', employee, roles, areas });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.updateEmployee = async (req, res) => {
    try {
        await Employee.findByIdAndUpdate(req.params.id, req.body);
        res.redirect('/employees');
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.deleteEmployee = async (req, res) => {
    try {
        await Employee.findByIdAndDelete(req.params.id);
        res.redirect('/employees');
    } catch (error) {
        res.status(500).send(error.message);
    }
};
