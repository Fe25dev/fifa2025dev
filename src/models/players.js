const { DataTypes } = require('sequelize');
//const sequelize = require('../config/db.js');
const { sequelizePlayers } = require('../config/db.js');

const players = sequelizePlayers.define('players', {
    fifa_version:{
        type: DataTypes.STRING,
        allowNull:false,
    },
    fifa_update:{
        type: DataTypes.STRING,
        allowNull:false,
    },
    long_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    player_face_url: {
        type:DataTypes.STRING,
        allowNull: false,
    },
    player_positions: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    club_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    nationality_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    overall: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    potential: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    value_eur: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    wage_eur: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    age: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    height_cm: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    weight_kg: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    preferred_foot: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    weak_foot: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    skill_moves: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    international_reputation: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    work_rate: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    body_type: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    pace: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    shooting: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    passing: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    dribbling: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    player_traits: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    },
    {
    tableName: 'players',  // Nombre de la tabla
    timestamps: false,      // Deshabilitar las columnas createdAt y updatedAt para que sequelize no las solicite ,evita agregarlas en BD
});

module.exports = players;
