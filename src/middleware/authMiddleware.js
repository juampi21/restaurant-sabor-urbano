const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Middleware para proteger rutas verificando el token JWT
exports.protect = async (req, res, next) => {
    let token;
    if (req.cookies.token) {
        token = req.cookies.token;
    }

    if (!token) {
        return res.redirect('/auth/login');
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id);
        res.locals.user = req.user; // Hacer disponible el usuario en las vistas
        next();
    } catch (error) {
        res.clearCookie('token');
        res.redirect('/auth/login');
    }
};

// Middleware para autorizar acceso basado en roles
exports.authorize = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).render('error', { message: 'No tienes permiso para realizar esta acción' });
        }
        next();
    };
};
