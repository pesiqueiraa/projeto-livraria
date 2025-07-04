const db = require('../config/database');   

class Genres {
    // Constructor to initialize the genre object
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }
    
    static async getAllGenres() {
        try {
            const result = await db.query('SELECT * FROM genres');
            return result.rows;
        } catch (error) {
            console.error("Erro ao buscar gêneros: ", error);
            throw error;
        }
    }
}