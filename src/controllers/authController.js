const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Genera un token JWT para el usuario
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1d' });
};

// Renderiza la vista de inicio de sesión
exports.getLogin = (req, res) => {
    res.render('auth/login', { title: 'Iniciar Sesión' });
};

// Renderiza la vista de registro
exports.getRegister = (req, res) => {
    res.render('auth/register', { title: 'Registrarse' });
};

// Maneja el registro de un nuevo usuario
exports.register = async (req, res) => {
    try {
        const { username, password, role } = req.body;
        const user = await User.create({ username, password, role });
        const token = generateToken(user._id);
        res.cookie('token', token, { httpOnly: true });
        res.redirect('/');
    } catch (error) {
        res.render('auth/register', { title: 'Registrarse', error: error.message });
    }
};

// Maneja el inicio de sesión del usuario
exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });

        if (!user || !(await user.comparePassword(password))) {
            throw new Error('Credenciales inválidas');
        }

        const token = generateToken(user._id);
        res.cookie('token', token, { httpOnly: true });
        res.redirect('/');
    } catch (error) {
        res.render('auth/login', { title: 'Iniciar Sesión', error: error.message });
    }
};

// Cierra la sesión del usuario eliminando la cookie
exports.logout = (req, res) => {
    res.clearCookie('token');
    res.redirect('/auth/login');
};
