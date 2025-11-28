const Task = require('../models/Task');
const Employee = require('../models/Employee');

// Obtiene todas las tareas con filtros opcionales
exports.getAllTasks = async (req, res) => {
    try {
        const filters = {};
        if (req.query.state) {
            if (req.query.state === 'active') {
                filters.state = { $ne: 'finalizada' };
            } else {
                filters.state = req.query.state;
            }
        }
        if (req.query.priority) filters.priority = req.query.priority;
        if (req.query.employeeId) filters.assignedTo = req.query.employeeId;

        // Obtener IDs de empleados con rol 'Administrador/a'
        const adminEmployees = await Employee.find({ role: 'Administrador/a' });
        const adminIds = adminEmployees.map(emp => emp._id.toString());

        // Si no es admin, ocultar tareas asignadas a administradores
        if (req.user.role !== 'admin') {
            filters.assignedTo = { $nin: adminIds };
            // Si el usuario filtró por un empleado específico que resulta ser admin, la query devolverá vacío, lo cual es correcto.
            if (req.query.employeeId && adminIds.includes(req.query.employeeId)) {
                // Conflicto: el usuario quiere ver tareas de un admin, pero no tiene permiso.
                // El $nin ya se encarga de esto, pero si filters.assignedTo ya estaba seteado, hay que tener cuidado.
                // Mejor estrategia: Si filters.assignedTo ya existe, verificamos.
                if (filters.assignedTo && typeof filters.assignedTo === 'string') {
                    // Si el filtro era un ID específico y es admin, forzamos vacío o dejamos que el $nin lo anule (pero $nin y string directo no combinan bien en mongoose simple query object)
                    // Mongoose query: { assignedTo: 'ID' } AND { assignedTo: { $nin: [...] } } -> assignedTo: { $eq: 'ID', $nin: [...] }
                    filters.assignedTo = { $eq: req.query.employeeId, $nin: adminIds };
                }
            }
        }

        let tasks = await Task.find(filters);

        // Si es admin, ordenar para que las tareas de administradores aparezcan primero
        if (req.user.role === 'admin') {
            tasks.sort((a, b) => {
                const aIsAdmin = a.assignedTo && adminIds.includes(a.assignedTo.toString());
                const bIsAdmin = b.assignedTo && adminIds.includes(b.assignedTo.toString());
                if (aIsAdmin && !bIsAdmin) return -1;
                if (!aIsAdmin && bIsAdmin) return 1;
                return 0;
            });
        }

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

// Renderiza el formulario para crear una nueva tarea
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

// Crea una nueva tarea en la base de datos
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

// Renderiza el formulario para editar una tarea existente
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

// Actualiza la información de una tarea
exports.updateTask = async (req, res) => {
    try {
        await Task.findByIdAndUpdate(req.params.id, req.body);
        res.redirect('/tasks');
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Marca una tarea como finalizada o en verificación
exports.completeTask = async (req, res) => {
    try {
        const newState = req.user.role === 'admin' ? 'finalizada' : 'verificacion';
        await Task.findByIdAndUpdate(req.params.id, { state: newState });
        res.redirect(req.header('Referer') || '/tasks');
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Elimina una tarea de la base de datos
exports.deleteTask = async (req, res) => {
    try {
        await Task.findByIdAndDelete(req.params.id);
        res.redirect('/tasks');
    } catch (error) {
        res.status(500).send(error.message);
    }
};
