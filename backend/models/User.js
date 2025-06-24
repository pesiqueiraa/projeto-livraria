
const db = require('../config/database');

class User {

    constructor(id, name, email, password) {
        this.id = id,
            this.name = name,
            this.email = email,
            this.password = password
    }

    // create a new user 
    static async create(name, email, password) {

        // Validate unique email
        const existingUser = await db.query('SELECT * FROM users WHERE email = $1', [email]);
        if (existingUser.rows.length > 0) {
            throw new Error('Email already exists');
        }

        try {
            const result = await db.query('INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *', [name, email, password])
            const user = result.rows[0];
            return new User(user.id, user.name, user.email, user.password);

        } catch (error) {
            console.log("Erro ao criar usuário: ", error);
            throw error;
        }
    }

    // find user by email
    static async findByEmail(email) {
        try {
            const result = await db.query('SELECT * FROM users WHERE email = $1', [email]);
            if (result.rows.length > 0) {
                const user = result.rows[0];
                return new User(user.id, user.name, user.email, user.password);
            } else {
                return null; // User not found
            }
        } catch (error) {
            console.log("Erro ao buscar usuário por email: ", error);
            throw error;
        }
    }

    // find user by id
    static async findById(id) {
        try {
            const result = await db.query('SELECT * FROM users WHERE id = $1', [id])
            if (result.rows.length > 0) {
                const user = result.rows[0];
                return new User(user.id, user.name, user.email, user.password);
            } else {
                return null; // User not found
            }
        } catch (error) {
            console.log("Erro ao buscar usuário por ID: ", error);
            throw error;
        }
    }

    // delete user by id
    static async deleteById(id) {
        try {
            const result = await db.query('DELETE FROM users WHERE id = $1 RETURNING *', [id]);
            if (result.rows.length > 0) {
                return true; // User deleted successfully
            }
        } catch (error) {
            console.log("Erro ao deletar usuário: ", error);
            throw error;
        }
    }


    // update user by id

    static async updateById(id, name, email, password) {
        try {
            const result = await db.query('UPDATE users SET name = $1, email = $2, password = $3 WHERE id = $4 RETURNING *', [name, email, password, id]);
            if (result.rows.length > 0) {
                const user = result.rows[0];
                return new User(user.id, user.name, user.email, user.password);
            } else {
                return null; // User not found
            }

        } catch (error) {
            console.log("Erro ao atualizar usuário: ", error);
            throw error;
        }
    }
}

module.exports = User;