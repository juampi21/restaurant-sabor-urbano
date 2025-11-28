const Order = require('../models/Order');
const Supply = require('../models/Supply');
const Task = require('../models/Task');
const Employee = require('../models/Employee');

exports.getDashboard = async (req, res) => {
    try {
        // Contar pedidos pendientes
        const pendingOrdersCount = await Order.countDocuments({ status: 'pendiente' });

        // Contar insumos con bajo stock (menos de 10 unidades)
        const lowStockCount = await Supply.countDocuments({ quantity: { $lt: 10 } });

        // Contar tareas estrictamente pendientes
        const pendingTasksQuery = { state: 'pendiente' };

        // Si no es admin, excluir tareas de administradores
        if (req.user.role !== 'admin') {
            const adminEmployees = await Employee.find({ role: 'Administrador/a' });
            const adminIds = adminEmployees.map(emp => emp._id);
            pendingTasksQuery.assignedTo = { $nin: adminIds };
        }

        const pendingTasksCount = await Task.countDocuments(pendingTasksQuery);

        // Contar tareas en verificación
        const verificationTasksCount = await Task.countDocuments({ state: 'verificacion' });

        res.render('index', {
            title: 'Sabor Urbano - Dashboard',
            user: req.user,
            pendingOrdersCount,
            lowStockCount,
            pendingTasksCount,
            verificationTasksCount
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al cargar el dashboard');
    }
};
