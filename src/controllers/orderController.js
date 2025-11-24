const Order = require('../models/Order');

exports.getAllOrders = async (req, res) => {
    try {
        const pedidos = await Order.find();
        res.render('orders/list', {
            title: 'Gestión de Pedidos',
            pedidos
        });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.createOrder = async (req, res) => {
    try {
        await Order.create(req.body);
        res.redirect('/orders');
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.deleteOrder = async (req, res) => {
    try {
        await Order.findByIdAndDelete(req.params.id);
        res.redirect('/orders');
    } catch (error) {
        res.status(500).send(error.message);
    }
};
