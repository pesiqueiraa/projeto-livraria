const Book = require('../models/Book');

class BookController {
    // POST /books - Create a new book
    static async createBook(req, res) {
        const { title, author, genre_id, read_date, rating, review } = req.body;
        try {
            // basic validation
            if (!title || !author || !genre_id) {
                return res.status(400).json({ 
                    error: 'Title, author and genre_id are required.' 
                });
            }
            const newBook = await Book.create(title, author, genre_id, read_date, rating, review);
            res.status(201).json({ 
                message: 'Book created successfully', 
                book: { 
                    id: newBook.id, 
                    title: newBook.title, 
                    author: newBook.author,
                    genre_id: newBook.genre_id,
                    read_date: newBook.read_date,
                    rating: newBook.rating,
                    review: newBook.review
                } 
            });

        } catch (error) {
            console.error("Error creating book: ", error);
            res.status(500).json({
                error: 'An error occurred while creating the book.'
            });
        }
    }

    // PUT /books/:id - Update book by ID
    static async updateBook(req, res) {
        const id = req.params.id;
        const { title, author, genre_id, read_date, rating, review } = req.body;
        try {
            // basic validation
            if (!title || !author || !genre_id) {
                return res.status(400).json({
                    error: 'Title, author and genre_id are required.'
                });
            }
            const updatedBook = await Book.updateById(id, title, author, genre_id, read_date, rating, review);
            res.status(200).json({
                message: 'Book updated successfully',
                book: { 
                    id: updatedBook.id, 
                    title: updatedBook.title, 
                    author: updatedBook.author,
                    genre_id: updatedBook.genre_id,
                    read_date: updatedBook.read_date,
                    rating: updatedBook.rating,
                    review: updatedBook.review
                }
            });
        } catch (error) {
            console.error("Error updating book: ", error);
            res.status(500).json({
                error: 'An error occurred while updating the book.'
            });
        }   
    }

    // GET /books - Get all books
    static async getAllBooks(req, res) {
        try {
            const books = await Book.getAll();
            res.status(200).json(books);
        } catch (error) {
            console.error("Error fetching books: ", error);
            res.status(500).json({
                error: 'An error occurred while fetching books.'
            });
        }
    }

    // GET /books/:id - Get book by ID
    static async getBookById(req, res) {
        const id = req.params.id;
        try {
            const book = await Book.getById(id);
            if (!book) {
                return res.status(404).json({ error: 'Book not found.' });
            }
            res.status(200).json(book);
        } catch (error) {
            console.error("Error fetching book: ", error);
            res.status(500).json({
                error: 'An error occurred while fetching the book.'
            }); 
        }
    }

    // DELETE /books/:id - Delete book by ID
    static async deleteBook(req, res) {
        const id = req.params.id;
        try {
            const result = await Book.deleteById(id);
            if (!result) {
                return res.status(404).json({ error: 'Book not found.' });
            }
            res.status(200).json({
                message: 'Book deleted successfully'
            });
        } catch (error) {
            console.error("Error deleting book: ", error);
            res.status(500).json({
                error: 'An error occurred while deleting the book.'
            });
        }
    }
}

module.exports = BookController;