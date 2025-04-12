
const express = require('express');
const router = express.Router();
const usersController = require('../controllers/userscontrollers');
const { userLoginValidations } = require('../controllers/userscontrollers');  
const { verifyToken } = require('../controllers/userscontrollers');  

router.post('/users/login', userLoginValidations,usersController.userLogin);  
router.post('/users', usersController.createUser);  
router.get('/users', usersController.getAllUsers);  
router.get('/users/:id', verifyToken,usersController.getUserById);  
router.put('/users/:id', verifyToken,  usersController.updateUserById);  

module.exports = router;
