const { Op } = require('sequelize');
const Play = require('../models/players');
//const { Parser } = require('json2csv'); // Para CSV
const { AsyncParser } = require('@json2csv/node');
const XLSX = require('xlsx'); // Para XLSX

// Crear un nuevo jugador
const createPlay = async (req, res) => {
    try{
        const newPlayer = await Play.create(req.body);
        res.status(201).json(newPlayer);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al crear el usuario' });
    }
};

// Obtener jugadores con filtros y paginación (version a mejorar) RUTA: http://localhost:3000/api/players?page=1&limit=10&name=Lionel&club=FC%20Barcelona&nacion=Argentina
const getPlayers = async (req, res) => {
    const { page = 1, limit = 3, name = '', club = '', nacion = 'Argentina' ,format = '' } = req.query;

    // Validar y convertir los parámetros de paginación
    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);
    if (isNaN(pageNumber) || pageNumber < 1) {
        return res.status(400).json({ message: 'El número de página debe ser un número positivo.' });
    }
    if (isNaN(limitNumber) || limitNumber < 1) {
        return res.status(400).json({ message: 'El límite debe ser un número positivo.' });
    }
    // Construir condiciones dinámicamente
    const whereConditions = {};
    if (name) {
        whereConditions.long_name = {
            [Op.like]: `%${name}%` // Filtro por nombre
        };
    }
    if (club) {
        whereConditions.club_name = {
            [Op.like]: `%${club}%` // Filtro por club
        };
    }
    if (nacion) {
        whereConditions.nationality_name = {
            [Op.like]: `%${nacion}%` // Filtro por país
        };
    }
    try {
        const players = await Play.findAll({
            where: whereConditions,
            offset: (pageNumber - 1) * limitNumber,
            limit: limitNumber,
        });
        // Contar el total de jugadores que coinciden con los filtros
        const totalPlayers = await Play.count({ where: whereConditions });

        // Si se solicita un formato de descarga
        if (format === 'csv' || format === 'xlsx') {
            // Convertir los datos a un formato adecuado
            const playerData = players.map(player => ({
                name: player.long_name,
                club: player.club_name,
                nationality: player.nationality_name,
                // Agregar mas  campos 
            }));

            if (format === 'csv') {
                const asyncParser = new AsyncParser();
                const csv = await asyncParser.parse(playerData).promise(); // de forma asíncrona
                res.header('Content-Type', 'text/csv');
                res.attachment('players.csv');

            } else if (format === 'xlsx') {
                const worksheet = XLSX.utils.json_to_sheet(playerData);
                const workbook = XLSX.utils.book_new();
                XLSX.utils.book_append_sheet(workbook, worksheet, 'Players');
                const buffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' });
                res.header('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
                res.attachment('players.xlsx');
                return res.send(buffer);
            }
        }
        res.json({
            total: totalPlayers,
            page: pageNumber,
            limit: limitNumber,
            players,
        });
    } catch (error) {
        console.error(error); // Log del error para depuración
        res.status(500).json({ message: 'Error al obtener los jugadores', error: error.message });
    }
};

// Obtener un jugador por ID
const getPlayById = async (req, res) => {
    try {
        const player = await Play.findByPk(req.params.id);  // Buscar por ID

        if (!player) {
            return res.status(404).json({ message: 'Jugador no encontrado' });
        }

        res.status(200).json(player);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener el jugador' });
    }
};

const updatePlayById = async (req, res) => {
    const { id } = req.params;
    // Validar que el cuerpo de la solicitud no esté vacío
    if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).json({ message: 'Los datos del jugador son requeridos' });
    }
    try {
        const player = await Play.findByPk(id);
        if (!player) {
            return res.status(404).json({ message: 'Jugador no encontrado' });
        }
        // Actualizar el jugador con los datos proporcionados
        await player.update(req.body);
        // Responder con el jugador actualizado
        res.json({ message: 'Jugador actualizado exitosamente', player });
    } catch (error) {
        console.error(error); // Log del error para depuración
        res.status(500).json({ message: 'Error al actualizar el jugador', error: error.message });
    }
};


// Obtener habilidades del jugador
const getPlayerSkillsById = async (req, res) => {
    const { id } = req.params;

    try {
        const player = await Play.findByPk(id);
        if (!player) {
            return res.status(404).json({ message: 'Jugador no encontrado' });
        }
        const skills = {
                // Agregar otros campos 
                rate: player.work_rate,
                pace: player.pace,                       
                shoot: player.shooting,                   
                pass: player.passing,  
                drib: player.dribbling,   
                defend: player.defending   
            };
        res.json({
            jugador_id : player.id,
            jugador_nombre : player.long_name,
            skills
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener las habilidades del jugador', error: error.message });
    }
};

module.exports = {
    createPlay,
    getPlayers,
    getPlayById,
    updatePlayById,
    getPlayerSkillsById 
};
