const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');
const BookController = require('../controllers/BookController');
// === ROTAS DO USUÁRIO === //
router.post('/users', UserController.createUser); // Criar usuário
// === ROTAS DO ADMIN === //
module.exports = router