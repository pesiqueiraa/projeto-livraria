const User = require('../models/User');

class UserController {
    // POST /users - Create a new user
    static async createUser(req, res) {
        const { name, email, password } = req.body;
        try {
            // basic validation
            if (!name || !email || !password) {
                return res.status(400).json({ 
                    error: 'Nome, e-mail e senha são obrigatórios.' 
                });
            }
            const newUser = await User.create(name, email, password);
            res.status(201).json({ 
                message: 'User criado com sucesso', 
                user: { id: newUser.id, name: newUser.name, email: newUser.email } 
            });

        } catch (error) {
            console.error("Erro ao criar usuário: ", error);
            res.status(500).json({
                error: 'An error occurred while creating the user.'
            });
        }
    }

    // POST /users/login - Login user
    static async loginUser(req, res) {
        const { email, password } = req.body;
        try {
            // basic validation
            if (!email || !password) {
                return res.status(400).json({ 
                    error: 'E-mail e senha são obrigatórios.' 
                });
            }
            const user = await User.findByEmail(email);
            if (!user || user.password !== password) {
                return res.status(401).json({
                    error: 'E-mail ou senha inválidos.'
                });
            }
            res.status(200).json({
                message: 'Login realizado com sucesso',
                user: { id: user.id, name: user.name, email: user.email }
            });
        } catch (error) {
            console.error("Erro ao fazer login: ", error);
            res.status(500).json({
                error: 'An error occurred while logging in.'
            });
        }
    }


    
    

}