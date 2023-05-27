const express = require("express");

const router = express.Router();

const authController = require("../controllers/authController");

//importar el userController
const userController = require("../controllers/userController");

router.get('/', userController.getAllUsers);

router.post('/', userController.createUser);

router.put('/:id', userController.updateUser);

router.delete('/:id', userController.deleteUser);

router.post('/login', authController.authenticateUser)

module.exports = router;