const User = require('../models/User');
const jwt = require('jsonwebtoken');

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1d' });
};

exports.getLogin = (req, res) => {
    res.render('auth/login', { title: 'Iniciar Sesión' });
};

exports.getRegister = (req, res) => {
    res.render('auth/register', { title: 'Registrarse' });
};

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

exports.logout = (req, res) => {
    res.clearCookie('token');
    res.redirect('/auth/login');
};
