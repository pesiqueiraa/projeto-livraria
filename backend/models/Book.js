const db = require('../config/database');

class Book {

    constructor(id, title, author, genre_id, read_date, rating, review) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.genre_id = genre_id;
        this.read_date = read_date;
        this.rating = rating;
        this.review = review;
    }
    // Metodo para criar um novo livro
    static async create(title, author, genre_id, read_date, rating, review) {
        const query = 'INSERT INTO books (title, author, genre_id, read_date, rating, review) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *';
        const values = [title, author, genre_id, read_date, rating, review];
        const result = await db.query(query, values);
        return new Book(result.rows[0].id, result.rows[0].title, result.rows[0].author, result.rows[0].genre_id, result.rows[0].read_date, result.rows[0].rating, result.rows[0].review);
    }

    // Metodo para buscar todos os livros
    static async getAll() {
        const query = 'SELECT * FROM books';
        const result = await db.query(query);
        return result.rows.map(row => new Book(row.id, row.title, row.author, row.genre_id, row.read_date, row.rating, row.review));
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
        return new Book(row.id, row.title, row.author, row.genre_id, row.read_date, row.rating, row.review);
    }
    // Metodo para atualizar um livro por ID
    static async updateById(id, title, author, genre_id, read_date, rating, review) {
        const query = 'UPDATE books SET title = $1, author = $2, genre_id = $3, read_date = $4, rating = $5, review = $6 WHERE id = $7 RETURNING *';
        const values = [title, author, genre_id, read_date, rating, review, id];
        const result = await db.query(query, values);
        if (result.rows.length === 0) {
            throw new Error('Book not found');
        }
        const row = result.rows[0];
        return new Book(row.id, row.title, row.author, row.genre_id, row.read_date, row.rating, row.review);
    }

    // Metodo para encontrar por nome do livro
    static async findByName(title) {
        const query = 'SELECT * FROM books WHERE title ILIKE $1';
        const values = [`%${title}%`];
        const result = await db.query(query, values);
        if (result.rows.length === 0) {
            throw new Error('Book not found');
        }
        return result.rows.map(row => new Book(row.id, row.title, row.author, row.genre_id, row.read_date, row.rating, row.review));
    }

    // Metodo para deletar um livro por ID
    static async deleteById(id) {
        const query = 'DELETE FROM books WHERE id = $1 RETURNING *';
        const values = [id];
        const result = await db.query(query, values);
        if (result.rows.length === 0) {
            throw new Error('Book not found');
        }
        return new Book(result.rows[0].id, result.rows[0].title, result.rows[0].author, result.rows[0].genre_id, result.rows[0].read_date, result.rows[0].rating, result.rows[0].review);
    }
}

module.exports = Book;