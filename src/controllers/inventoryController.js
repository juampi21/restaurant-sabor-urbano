const Supply = require('../models/Supply');

exports.getInventory = async (req, res) => {
    try {
        const insumos = await Supply.find();
        res.render('inventory/list', {
            title: 'Control de Inventario',
            insumos
        });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.createSupply = async (req, res) => {
    try {
        await Supply.create(req.body);
        res.redirect('/inventory');
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.deleteSupply = async (req, res) => {
    try {
        await Supply.findByIdAndDelete(req.params.id);
        res.redirect('/inventory');
    } catch (error) {
        res.status(500).send(error.message);
    }
};
