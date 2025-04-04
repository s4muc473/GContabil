require('dotenv').config();  // Certifique-se de que este código esteja no topo do arquivo
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('./config/db');  // Conexão com MongoDB
const userRoutes = require('./routes/userRoutes');

const app = express();

// Middleware para analisar corpo da requisição
app.use(bodyParser.json());

// Usando rotas
app.use('/api', userRoutes);

// Iniciar o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
