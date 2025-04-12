// src/routes/playersroutes.js
const express = require('express');
const router = express.Router();
const playersController = require('../controllers/playerscontrollers');

// Rutas para los usuarios
router.post('/players', playersController.createPlay);  // Crear un nuevo jugador  -->     http://localhost:3000/api/players   
router.get('/players', playersController.getPlayers);    // Obtener todos los jugadores paginados con filtros http://localhost:3000/api/players?page=1&limit=10&name=Lionel&club=FC%20Barcelona&nacion=Argentina 
router.get('/players/find/:id', playersController.getPlayById);  // Buscar jugador por ID  --> http://localhost:3000/api/players/12
router.put('/players//update/:id', playersController.updatePlayById);  // Actualizar jugador por ID
router.get('/players/skills/:id', playersController.getPlayerSkillsById );  // Obtener jugador por ID  --> http://localhost:3000/api/players/12
module.exports = router;
