const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
//const sequelize = require('./config/db');  // Configuración de la base de datos
const { sequelizePlayers } = require('./config/db.js');

const playRoutes = require('./routes/playersroutes');  // Rutas de api
const userRoutes = require('./routes/usersroutes');  // Rutas de usuarios

dotenv.config();  // Cargar variables de entorno

const app = express();

// URL frontend Angular
app.use(cors({
  origin: 'http://localhost:4200'  
}));

// Middleware para procesar el cuerpo de la petición
app.use(express.json());
app.use(cors());  // Solo si es nesesario usar CORS

// Rutas
app.use('/api', playRoutes);
app.use('/user', userRoutes);

// Conectar con la base de datos y arrancar el servidor
sequelizePlayers.authenticate()  // Verifica solo la conexión, no sincroniza ni modifica la base de datos
.then(() => {
    console.log('Conexión exitosa a la base de datos');
    app.listen(3000, () => {
        console.log('Servidor corriendo en el puerto 3000');
    });
})
.catch((error) => {
    console.error('Error al conectar con la base de datos:', error);
});
