require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const authRoutes = require('./routes/auth');
console.log(authRoutes)

app.use('/api', authRoutes);

app.use('/api/actividades', require('./routes/actividad'));
app.use('/api/comentarios', require('./routes/comentario'));
app.use('/api/espacios', require('./routes/espacio'));
app.use('/api/listas', require('./routes/lista'));
app.use('/api/tableros', require('./routes/tablero'));
app.use('/api/usuarios', require('./routes/usuario'));
app.use('/api/usuario_espacio', require('./routes/usuarioEspacio'));

// BASE ROUTE
app.get('/', (req, res) => {
    res.send('Servidor en funcionamiento');
});

// START SERVER
app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});