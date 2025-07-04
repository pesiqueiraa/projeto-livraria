const db = require('../config/database');

class Book {

    constructor(id, title, author, genre_id, genre, read_date, rating, review) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.genre_id = genre_id;
        this.genre = genre; // Nome do gênero
        this.read_date = read_date;
        this.rating = rating;
        this.review = review;
    }
    // Metodo para criar um novo livro
    static async create(title, author, genre_id, read_date, rating, review) {
        const query = 'INSERT INTO books (title, author, genre_id, read_date, rating, review) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *';
        const values = [title, author, genre_id, read_date, rating, review];
        const result = await db.query(query, values);
        
        // Buscar o nome do gênero após criar o livro
        const genreQuery = 'SELECT name FROM genres WHERE id = $1';
        const genreResult = await db.query(genreQuery, [result.rows[0].genre_id]);
        const genreName = genreResult.rows[0]?.name || null;
        
        return new Book(
            result.rows[0].id, 
            result.rows[0].title, 
            result.rows[0].author, 
            result.rows[0].genre_id, 
            genreName,
            result.rows[0].read_date, 
            result.rows[0].rating, 
            result.rows[0].review
        );
    }

    // Metodo para buscar todos os livros
    static async getAll() {
        const query = `
            SELECT b.*, genre_name 
            FROM books b 
            LEFT JOIN genres g ON b.genre_id = g.id
        `;
        const result = await db.query(query);
        return result.rows.map(row => new Book(
            row.id, 
            row.title, 
            row.author, 
            row.genre_id,
            row.genre_name,
            row.read_date, 
            row.rating, 
            row.review
        ));
    }

    // Metodo para buscar um livro por ID
    static async getById(id) {
        const query = `
            SELECT b.*, genre_name 
            FROM books b 
            LEFT JOIN genres g ON b.genre_id = g.id 
            WHERE b.id = $1
        `;
        const values = [id];
        const result = await db.query(query, values);
        if (result.rows.length === 0) {
            throw new Error('Book not found');
        }
        const row = result.rows[0];
        return new Book(
            row.id, 
            row.title, 
            row.author, 
            row.genre_id, 
            row.genre_name,
            row.read_date, 
            row.rating, 
            row.review
        );
    }
    // Metodo para atualizar um livro por ID
    static async updateById(id, title, author, genre_id, read_date, rating, review) {
        const query = 'UPDATE books SET title = $1, author = $2, genre_id = $3, read_date = $4, rating = $5, review = $6 WHERE id = $7 RETURNING *';
        const values = [title, author, genre_id, read_date, rating, review, id];
        const result = await db.query(query, values);
        if (result.rows.length === 0) {
            throw new Error('Book not found');
        }
        
        // Buscar o nome do gênero após atualizar o livro
        const genreQuery = 'SELECT name FROM genres WHERE id = $1';
        const genreResult = await db.query(genreQuery, [result.rows[0].genre_id]);
        const genreName = genreResult.rows[0]?.name || null;
        
        const row = result.rows[0];
        return new Book(
            row.id, 
            row.title, 
            row.author, 
            row.genre_id, 
            genreName,
            row.read_date, 
            row.rating, 
            row.review
        );
    }

    // Metodo para encontrar por nome do livro
    static async findByName(title) {
        const query = `
            SELECT b.*, genre_name 
            FROM books b 
            LEFT JOIN genres g ON b.genre_id = g.id 
            WHERE b.title ILIKE $1
        `;
        const values = [`%${title}%`];
        const result = await db.query(query, values);
        if (result.rows.length === 0) {
            throw new Error('Book not found');
        }
        return result.rows.map(row => new Book(
            row.id, 
            row.title, 
            row.author, 
            row.genre_id, 
            row.genre_name,
            row.read_date, 
            row.rating, 
            row.review
        ));
    }

    // Metodo para deletar um livro por ID
    static async deleteById(id) {
        // Primeiro buscar o livro com o gênero antes de deletar
        const selectQuery = `
            SELECT b.*, genre_name 
            FROM books b 
            LEFT JOIN genres g ON b.genre_id = g.id 
            WHERE b.id = $1
        `;
        const selectResult = await db.query(selectQuery, [id]);
        if (selectResult.rows.length === 0) {
            throw new Error('Book not found');
        }
        
        // Agora deletar o livro
        const deleteQuery = 'DELETE FROM books WHERE id = $1 RETURNING *';
        const deleteResult = await db.query(deleteQuery, [id]);
        
        const bookData = selectResult.rows[0];
        return new Book(
            bookData.id, 
            bookData.title, 
            bookData.author, 
            bookData.genre_id, 
            bookData.genre_name,
            bookData.read_date, 
            bookData.rating, 
            bookData.review
        );
    }
}

module.exports = Book;