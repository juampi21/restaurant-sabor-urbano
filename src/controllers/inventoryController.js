const Supply = require('../models/Supply');

// Obtiene el inventario y renderiza la lista de insumos
exports.getInventory = async (req, res) => {
    try {
        const filters = {};
        if (req.query.lowStock) {
            filters.quantity = { $lt: 10 };
        }

        const insumos = await Supply.find(filters);
        res.render('inventory/list', {
            title: 'Control de Inventario',
            insumos,
            filters: req.query // Pasar filtros a la vista
        });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Crea un nuevo insumo en el inventario
exports.createSupply = async (req, res) => {
    try {
        await Supply.create(req.body);
        res.redirect('/inventory');
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Renderiza el formulario para editar un insumo
exports.getEditForm = async (req, res) => {
    try {
        const supply = await Supply.findById(req.params.id);
        res.render('inventory/form', {
            title: 'Editar Insumo',
            supply
        });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Actualiza un insumo en la base de datos
exports.updateSupply = async (req, res) => {
    try {
        await Supply.findByIdAndUpdate(req.params.id, req.body);
        res.redirect('/inventory');
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Elimina un insumo del inventario
exports.deleteSupply = async (req, res) => {
    try {
        await Supply.findByIdAndDelete(req.params.id);
        res.redirect('/inventory');
    } catch (error) {
        res.status(500).send(error.message);
    }
};
