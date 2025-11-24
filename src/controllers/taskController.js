const Task = require('../models/Task');
const Employee = require('../models/Employee');

exports.getAllTasks = async (req, res) => {
    try {
        const filters = {};
        if (req.query.state) filters.state = req.query.state;
        if (req.query.priority) filters.priority = req.query.priority;
        if (req.query.employeeId) filters.assignedTo = req.query.employeeId;

        const tasks = await Task.find(filters);
        const employees = await Employee.find();
        res.render('tasks/list', {
            tasks,
            employees,
            filters: req.query,
            title: 'Lista de Tareas'
        });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.getCreateForm = async (req, res) => {
    try {
        const employees = await Employee.find();
        res.render('tasks/form', {
            title: 'Nueva Tarea',
            employees
        });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.createTask = async (req, res) => {
    try {
        const newTask = new Task({
            ...req.body,
            assignedTo: req.body.assignedTo || null
        });
        await newTask.save();
        res.redirect('/tasks');
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.getEditForm = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        const employees = await Employee.find();
        res.render('tasks/form', {
            title: 'Editar Tarea',
            task,
            employees
        });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.updateTask = async (req, res) => {
    try {
        await Task.findByIdAndUpdate(req.params.id, req.body);
        res.redirect('/tasks');
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.deleteTask = async (req, res) => {
    try {
        await Task.findByIdAndDelete(req.params.id);
        res.redirect('/tasks');
    } catch (error) {
        res.status(500).send(error.message);
    }
};
