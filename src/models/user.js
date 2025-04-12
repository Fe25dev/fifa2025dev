const { DataTypes } = require('sequelize');
const { sequelizeUsers } = require('../config/db.js');

const users = sequelizeUsers.define('users', {
    user_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    user_lastname: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    user_nationality: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    user_email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    user_adress: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    user_dni: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    user_password: {
        type: DataTypes.STRING,
        allowNull: false,
    }
},
{
    tableName: 'users',  // Nombre de la tabla
    timestamps: false,      // Deshabilitar las columnas createdAt y updatedAt para que sequelize no las solicite ,evita agregarlas en //BD
});

module.exports = users;
