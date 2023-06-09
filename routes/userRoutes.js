const express = require("express");

const router = express.Router();

const authController = require("../controllers/authController");

//importar el userController
const userController = require("../controllers/userController");
const {upload} = require("../middlewares/fileUpload");

router.get('/', userController.getAllUsers);

router.post('/create', userController.createUser);

router.put('/update/:id', upload.single("picture"), userController.updateUser);

router.delete('/delete/:id', userController.deleteUser);

router.post('/login', authController.authenticateUser);

router.get('/:email', userController.getUser)

module.exports = router;