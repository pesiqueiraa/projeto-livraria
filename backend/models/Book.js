const db = require('../config/database');

class Book {

    constructor(id, title, author, genre, publishedYear) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.genre = genre;
        this.publishedYear = publishedYear;
    }
    // Metodo para criar um novo livro
    static async create(title, author, genre, publishedYear) {
        const query = 'INSERT INTO books (title, author, genre, published_year) VALUES ($1, $2, $3, $4) RETURNING *';
        const values = [title, author, genre, publishedYear];
        const result = await db.query(query, values);
        return new Book(result.rows[0].id, result.rows[0].title, result.rows[0].author, result.rows[0].genre, result.rows[0].published_year);
    }

    // Metodo para buscar todos os livros
    static async getAll() {
        const query = 'SELECT * FROM books';
        const result = await db.query(query);
        return result.rows.map(row => new Book(row.id, row.title, row.author, row.genre, row.published_year));
    }

    // Metodo para buscar um livro por ID
    static async getById(id) {
        const query = 'SELECT * FROM books WHERE id = $1';
        const values = [id];
        const result = await db.query(query, values);
        if (result.rows.length === 0) {
            throw new Error('Book not found');
        }
        const row = result.rows[0];
        return new Book(row.id, row.title, row.author, row.genre, row.published_year);
    }
    // Metodo para atualizar um livro por ID
    static async updateById(id, title, author, genre, publishedYear) {
        const query = 'UPDATE books SET title = $1, author = $2, genre = $3, published_year = $4 WHERE id = $5 RETURNING *';
        const values = [title, author, genre, publishedYear, id];
        const result = await db.query(query, values);
        if (result.rows.length === 0) {
            throw new Error('Book not found');
        }
        const row = result.rows[0];
        return new Book(row.id, row.title, row.author, row.genre, row.published_year);
    }

    // Metodo para encontrar por nome do livro
    static async findByName(title) {
        const query = 'SELECT * FROM books WHERE title ILIKE $1';
        const values = [`%${title}%`];
        const result = await db.query(query, values);
        if (result.rows.length === 0) {
            throw new Error('Book not found');
        }
        return result.rows.map(row => new Book(row.id, row.title, row.author, row.genre, row.published_year));
    }

    // Metodo para deletar um livro por ID
    static async deleteById(id) {
        const query = 'DELETE FROM books WHERE id = $1 RETURNING *';
        const values = [id];
        const result = await db.query(query, values);
        if (result.rows.length === 0) {
            throw new Error('Book not found');
        }
        return new Book(result.rows[0].id, result.rows[0].title, result.rows[0].author, result.rows[0].genre, result.rows[0].published_year);
    }
}

module.exports = Book;