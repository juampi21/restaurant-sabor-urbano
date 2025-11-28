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

// Middlewares de configuración
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, '../public')));

// Configuración del motor de vistas
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Importación de rutas
const authRoutes = require('./routes/authRoutes');
const employeeRoutes = require('./routes/employeeRoutes');
const taskRoutes = require('./routes/taskRoutes');
const inventoryRoutes = require('./routes/inventoryRoutes');
const orderRoutes = require('./routes/orderRoutes');
const dashboardController = require('./controllers/dashboardController');

// Rutas públicas
app.use('/auth', authRoutes);

const { protect } = require('./middleware/authMiddleware');

// Rutas protegidas
app.get('/', protect, dashboardController.getDashboard);

app.use('/employees', employeeRoutes);
app.use('/tasks', taskRoutes);
app.use('/inventory', inventoryRoutes);
app.use('/orders', orderRoutes);

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

// Middleware de manejo de errores
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Algo salió mal!');
});

module.exports = app;
