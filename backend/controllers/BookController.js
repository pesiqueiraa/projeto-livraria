const Book = require('../models/Book');

class BookController {
    // POST /books - Create a new book
    static async createBook(req, res) {
        const { title, author, genre, publishedYear } = req.body;
        try {
            // basic validation
            if (!title || !author || !genre || !publishedYear) {
                return res.status(400).json({ 
                    error: 'Title, author, genre and published year are required.' 
                });
            }
            const newBook = await Book.create(title, author, genre, publishedYear);
            res.status(201).json({ 
                message: 'Book created successfully', 
                book: { id: newBook.id, title: newBook.title, author: newBook.author } 
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
        const { title, author, genre, publishedYear } = req.body;
        try {
            // basic validation
            if (!title || !author || !genre || !publishedYear) {
                return res.status(400).json({
                    error: 'Title, author, genre and published year are required.'
                });
            }
            const updatedBook = await Book.updateById(id, title, author, genre, publishedYear);
            res.status(200).json({
                message: 'Book updated successfully',
                book: { id: updatedBook.id, title: updatedBook.title, author: updatedBook.author }
            });
        } catch (error) {
            console.error("Error updating book: ", error);
            res.status(500).json({
                error: 'An error occurred while updating the book.'
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
}