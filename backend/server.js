const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'sofi',
    password: 'BASEdatos24', 
    database: 'planify'
});

db.connect((err) => {
    if (err) {
        console.error('Error conectando a la base de datos:', err);
        process.exit(1);
    }
    console.log('Conectado a la base de datos MySQL');
});

/* Ruta para la raíz para verificar que el servidor funciona */
app.get('/', (req, res) => {
    res.send('Servidor en funcionamiento');
});


/* Ruta dinámica para obtener datos de cualquier tabla */
app.get('/api/data/:tableName', (req, res) => {
    const tableName = req.params.tableName;

    const allowedTables = ['actividad', 'comentario', 'espacio', 'lista', 'tablero', 'usuario'];
    if (!allowedTables.includes(tableName)) {
        return res.status(400).send('Nombre de tabla no válido');
    }

    const query = `SELECT * FROM ${tableName}`;
    db.query(query, (err, results) => {
        if (err) {
            console.error(`Error al obtener datos de la tabla ${tableName}:`, err);
            return res.status(500).send('Error al obtener los datos');
        }
        res.json(results);
    });
});


/* Insertar datos en cualquier tabla */

// ----- ACTIVIDAD
app.post('/api/data/actividad', (req, res) => {
    const { idActividad, actTitulo, actDescripcion, actFecha, prioridad, estado, idLista, idUsuario } = req.body;
    const query = 'INSERT INTO actividad (idActividad, actTitulo, actDescripcion, actFecha, prioridad, estado, idLista, idUsuario) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
  
    db.query(query, [idActividad, actTitulo, actDescripcion, actFecha, prioridad, estado, idLista, idUsuario], (err, result) => {
        if (err) {
            console.error('Error al insertar datos en actividad:', err);
            return res.status(500).send('Error al insertar los datos');
        }
        res.json({ message: 'Datos insertados correctamente', id: result.insertId });
    });
});
  
// ----- COMENTARIO
app.post('/api/data/comentario', (req, res) => {
    const { idComentario, comDescripcion, idUsuario } = req.body;
    const query = 'INSERT INTO comentario (idComentario, comDescripcion, idUsuario) VALUES (?, ?, ?)';
  
    db.query(query, [idComentario, comDescripcion, idUsuario], (err, result) => {
        if (err) {
            console.error('Error al insertar datos en comentario:', err);
            return res.status(500).send('Error al insertar los datos');
        }
        res.json({ message: 'Datos insertados correctamente', id: result.insertId });
    });
});

// ----- ESPACIO
app.post('/api/data/espacio', (req, res) => {
    const { idEspacio, espTitulo, espColor, espFechaCreacion, idUsuario } = req.body;
    const query = 'INSERT INTO espacio (idEspacio, espTitulo, espColor, espFechaCreacion, idUsuario) VALUES (?, ?, ?, ?, ?)';
  
    db.query(query, [idEspacio, espTitulo, espColor, espFechaCreacion, idUsuario], (err, result) => {
        if (err) {
            console.error('Error al insertar datos en espacio:', err);
            return res.status(500).send('Error al insertar los datos');
        }
        res.json({ message: 'Datos insertados correctamente', id: result.insertId });
    });
});

// ----- LISTA
app.post('/api/data/lista', (req, res) => {
    const { idLista, lisTitulo, lisColor, lisFechaCreacion, idTablero } = req.body;
    const query = 'INSERT INTO lista (idLista, lisTitulo, lisColor, lisFechaCreacion, idTablero) VALUES (?, ?, ?, ?, ?)';
  
    db.query(query, [idLista, lisTitulo, lisColor, lisFechaCreacion, idTablero], (err, result) => {
        if (err) {
            console.error('Error al insertar datos en lista:', err);
            return res.status(500).send('Error al insertar los datos');
        }
        res.json({ message: 'Datos insertados correctamente', id: result.insertId });
    });
});

// ----- TABLERO
app.post('/api/data/tablero', (req, res) => {
    const { idTablero, tabTitulo, tabFechaCreacion, tabColor, idEspacio } = req.body;
    const query = 'INSERT INTO tablero (idTablero, tabTitulo, tabFechaCreacion, tabColor, idEspacio) VALUES (?, ?, ?, ?, ?)';
  
    db.query(query, [idTablero, tabTitulo, tabFechaCreacion, tabColor, idEspacio], (err, result) => {
        if (err) {
            console.error('Error al insertar datos en tablero:', err);
            return res.status(500).send('Error al insertar los datos');
        }
        res.json({ message: 'Datos insertados correctamente', id: result.insertId });
    });
});

// ----- USUARIO
app.post('/api/data/usuario', (req, res) => {
    const { idUsuario, nombre, apellido, nombreUsuario, email, contrasena, imagenUrl } = req.body;
    const query = 'INSERT INTO usuario (idUsuario, nombre, apellido, nombreUsuario, email, contrasena, imagenUrl) VALUES (?, ?, ?, ?, ?, ?, ?)';
  
    db.query(query, [idUsuario, nombre, apellido, nombreUsuario, email, contrasena, imagenUrl], (err, result) => {
        if (err) {
            console.error('Error al insertar datos en usuario:', err);
            return res.status(500).send('Error al insertar los datos');
        }
        res.json({ message: 'Datos insertados correctamente', id: result.insertId });
    });
});


/* Actualizar datos en cualquier tabla */

// ----- ACTIVIDAD
app.put('/api/data/actividad/:id', (req, res) => {
    const idActividad = req.params.id;
    const { actTitulo, actDescripcion, actFecha, prioridad, estado, idLista, idUsuario } = req.body;
    const query = 'UPDATE actividad SET actTitulo = ?, actDescripcion = ?, actFecha = ?, prioridad = ?, estado = ?, idLista = ?, idUsuario = ? WHERE idActividad = ?';
  
    db.query(query, [actTitulo, actDescripcion, actFecha, prioridad, estado, idLista, idUsuario, idActividad], (err, result) => {
        if (err) {
            console.error('Error al actualizar datos en actividad:', err);
            return res.status(500).send('Error al actualizar los datos');
        }
        res.json({ message: 'Datos actualizados correctamente' });
    });
});

// ----- COMENTARIO
app.put('/api/data/comentario/:id', (req, res) => {
    const idComentario = req.params.id;
    const { comDescripcion, idUsuario } = req.body;
    const query = 'UPDATE comentario SET comDescripcion = ?, idUsuario = ? WHERE idComentario = ?';
  
    db.query(query, [comDescripcion, idUsuario, idComentario], (err, result) => {
        if (err) {
            console.error('Error al actualizar datos en comentario:', err);
            return res.status(500).send('Error al actualizar los datos');
        }
        res.json({ message: 'Datos actualizados correctamente' });
    });
});

// ----- ESPACIO
app.put('/api/data/espacio/:id', (req, res) => {
    const idEspacio = req.params.id;
    const { espTitulo, espColor, espFechaCreacion, idUsuario } = req.body;
    const query = 'UPDATE comentario SET espTitulo = ?, espColor = ?, espFechaCreacion = ?, idUsuario = ? WHERE idEspacio = ?';
  
    db.query(query, [espTitulo, espColor, espFechaCreacion, idUsuario, idEspacio], (err, result) => {
        if (err) {
            console.error('Error al actualizar datos en espacio:', err);
            return res.status(500).send('Error al actualizar los datos');
        }
        res.json({ message: 'Datos actualizados correctamente' });
    });
});

// ----- LISTA
app.put('/api/data/lista/:id', (req, res) => {
    const idLista = req.params.id;
    const { lisTitulo, lisColor, lisFechaCreacion, idTablero } = req.body;
    const query = 'UPDATE comentario SET lisTitulo = ?, lisColor = ?, lisFechaCreacion = ?, idTablero = ? WHERE idLista = ?';
  
    db.query(query, [lisTitulo, lisColor, lisFechaCreacion, idTablero, idLista], (err, result) => {
        if (err) {
            console.error('Error al actualizar datos en lista:', err);
            return res.status(500).send('Error al actualizar los datos');
        }
        res.json({ message: 'Datos actualizados correctamente' });
    });
});

// ----- TABLERO
app.put('/api/data/tablero/:id', (req, res) => {
    const idTablero = req.params.id;
    const { tabTitulo, tabFechaCreacion, tabColor, idEspacio } = req.body;
    const query = 'UPDATE comentario SET tabTitulo = ?, tabFechaCreacion = ?, tabColor = ?, idEspacio = ? WHERE idTablero = ?';
  
    db.query(query, [tabTitulo, tabFechaCreacion, tabColor, idEspacio, idTablero], (err, result) => {
        if (err) {
            console.error('Error al actualizar datos en tablero:', err);
            return res.status(500).send('Error al actualizar los datos');
        }
        res.json({ message: 'Datos actualizados correctamente' });
    });
});

// ----- USUARIO
app.put('/api/data/usuario/:id', (req, res) => {
    const idUsuario = req.params.id;
    const { nombre, apellido, nombreUsuario, email, contrasena, imagenUrl } = req.body;
    const query = 'UPDATE comentario SET nombre = ?, apellido = ?, nombreUsuario = ?, email = ?, contrasena = ?, imagenUrl = ? WHERE idUsuario = ?';
  
    db.query(query, [nombre, apellido, nombreUsuario, email, contrasena, imagenUrl, idUsuario], (err, result) => {
        if (err) {
            console.error('Error al actualizar datos en usuario:', err);
            return res.status(500).send('Error al actualizar los datos');
        }
        res.json({ message: 'Datos actualizados correctamente' });
    });
});


  /* Eliminar datos de una tabla */ 

// ----- ACTIVIDAD
app.delete('/api/data/actividad/:id', (req, res) => {
    const idActividad = req.params.id;
    const query = 'DELETE FROM actividad WHERE idActividad = ?';
  
    db.query(query, [idActividad], (err, result) => {
        if (err) {
            console.error('Error al eliminar datos en actividad:', err);
            return res.status(500).send('Error al eliminar los datos');
        }
        res.json({ message: 'Datos eliminados correctamente' });
    });
});

// ----- COMENTARIO
app.delete('/api/data/comentario/:id', (req, res) => {
    const idComentario = req.params.id;
    const query = 'DELETE FROM comentario WHERE idComentario = ?';
  
    db.query(query, [idComentario], (err, result) => {
        if (err) {
            console.error('Error al eliminar datos en comentario:', err);
            return res.status(500).send('Error al eliminar los datos');
        }
        res.json({ message: 'Datos eliminados correctamente' });
    });
});

// ----- ESPACIO
app.delete('/api/data/espacio/:id', (req, res) => {
    const idEspacio = req.params.id;
    const query = 'DELETE FROM espacio WHERE idEspacio = ?';
  
    db.query(query, [idEspacio], (err, result) => {
        if (err) {
            console.error('Error al eliminar datos en espacio:', err);
            return res.status(500).send('Error al eliminar los datos');
        }
        res.json({ message: 'Datos eliminados correctamente' });
    });
});

// ----- LISTA
app.delete('/api/data/lista/:id', (req, res) => {
    const idLista = req.params.id;
    const query = 'DELETE FROM lista WHERE idLista = ?';
  
    db.query(query, [idLista], (err, result) => {
        if (err) {
            console.error('Error al eliminar datos en lista:', err);
            return res.status(500).send('Error al eliminar los datos');
        }
        res.json({ message: 'Datos eliminados correctamente' });
    });
});

// ----- TABLERO
app.delete('/api/data/tablero/:id', (req, res) => {
    const idTablero = req.params.id;
    const query = 'DELETE FROM tablero WHERE idTablero = ?';
  
    db.query(query, [idTablero], (err, result) => {
        if (err) {
            console.error('Error al eliminar datos en tablero:', err);
            return res.status(500).send('Error al eliminar los datos');
        }
        res.json({ message: 'Datos eliminados correctamente' });
    });
});

// ----- ESPACIO
app.delete('/api/data/usuario/:id', (req, res) => {
    const idUsuario = req.params.id;
    const query = 'DELETE FROM usuario WHERE idUsuario = ?';
  
    db.query(query, [idUsuario], (err, result) => {
        if (err) {
            console.error('Error al eliminar datos en usuario:', err);
            return res.status(500).send('Error al eliminar los datos');
        }
        res.json({ message: 'Datos eliminados correctamente' });
    });
});


/* Iniciar el servidor en el puerto especificado */
app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});
