const express = require('express');
const path = require('path');
const methodOverride = require('method-override');
const morgan = require('morgan');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cookieParser = require('cookie-parser');

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, '../public')));

// View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Routes
const authRoutes = require('./routes/authRoutes');
const employeeRoutes = require('./routes/employeeRoutes');
const taskRoutes = require('./routes/taskRoutes');
const inventoryRoutes = require('./routes/inventoryRoutes');
const orderRoutes = require('./routes/orderRoutes');

// Public Routes
app.use('/auth', authRoutes);

// Protected Routes (Middleware applied in routes or globally here if preferred)
app.get('/', (req, res) => {
    if (!req.cookies.token) {
        return res.redirect('/auth/login');
    }
    res.render('index', { title: 'Sabor Urbano', user: true });
});

app.use('/employees', employeeRoutes);
app.use('/tasks', taskRoutes);
app.use('/inventory', inventoryRoutes);
app.use('/orders', orderRoutes);

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

// Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Algo salió mal!');
});

module.exports = app;
