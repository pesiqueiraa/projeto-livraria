const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');
const BookController = require('../controllers/BookController');
// === ROTAS DO USUÁRIO === //
router.post('/users', UserController.createUser); // Criar usuário
// === ROTAS DO BOOK === //
router.get('/books', BookController.getAllBooks); // Listar todos os livros
router.get('/books/:id', BookController.getBookById); // Obter livro por ID
router.post('/books', BookController.createBook); // Criar livro
router.put('/books/:id', BookController.updateBook); // Atualizar livro por ID
router.delete('/books/:id', BookController.deleteBook); // Deletar livro por ID

module.exports = router