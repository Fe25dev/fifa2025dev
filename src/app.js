const express = require('express');
//const sequelize = require('./config/db');
const { sequelizePlayers } = require('./config/db.js');
const User = require('./models/players'); // Importa tus modelos

const app = express();

// Sincronizar modelos con la base de datos
sequelize.sync({ force: false , alter:false }) // `force: true` borra las tablas existentes antes de crear nuevas
.then(() => {
    console.log('Base de datos sincronizada');
})
.catch(err => {
    console.error('Error sincronizando la base de datos:', err);
});

app.listen(3000, () => {
    console.log('Servidor corriendo en el puerto 3000');
});
