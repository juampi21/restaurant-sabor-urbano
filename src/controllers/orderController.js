const Order = require('../models/Order');

// Obtiene todos los pedidos y renderiza la lista
exports.getAllOrders = async (req, res) => {
    try {
        const filters = {};
        if (req.query.status) filters.status = req.query.status;

        const pedidos = await Order.find(filters);
        res.render('orders/list', {
            title: 'Gestión de Pedidos',
            pedidos,
            filters // Pasar filtros a la vista
        });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Crea un nuevo pedido en la base de datos
exports.createOrder = async (req, res) => {
    try {
        await Order.create(req.body);
        res.redirect('/orders');
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Marca un pedido como completado
exports.completeOrder = async (req, res) => {
    try {
        await Order.findByIdAndUpdate(req.params.id, { status: 'completado' });
        res.redirect(req.header('Referer') || '/orders');
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Elimina un pedido de la base de datos
exports.deleteOrder = async (req, res) => {
    try {
        await Order.findByIdAndDelete(req.params.id);
        res.redirect('/orders');
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Renderiza el formulario de edición
exports.getEditForm = async (req, res) => {
    try {
        const pedido = await Order.findById(req.params.id);
        res.render('orders/edit', { title: 'Editar Pedido', pedido });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Actualiza un pedido
exports.updateOrder = async (req, res) => {
    try {
        await Order.findByIdAndUpdate(req.params.id, req.body);
        res.redirect('/orders');
    } catch (error) {
        res.status(500).send(error.message);
    }
};
