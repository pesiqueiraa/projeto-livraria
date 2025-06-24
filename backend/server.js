const express = require('express'); // O Express é um framework para Node.js que facilita a criação de servidores web
const path = require('path'); // O path é usado para manipular caminhos de arquivos e diretórios
const cors = require('cors'); ; // O Cors serve para permitir requisições de outros domínios

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

const routes = require('./routes/index.js'); // Importa as rotas definidas no arquivo routes.js
app.use('/api', routes); // Define o prefixo '/api' para as rotas

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
}); 