require('dotenv').config(); 

const mongoose = require('mongoose');

<<<<<<< HEAD
=======
console.log('URL do MongoDB: ', process.env.MONGODB_URI); 

>>>>>>> 54459d3cc1efbdd765822d16aa8b459b41b666f1
if (!process.env.MONGODB_URI) {
  console.error('Erro: MONGODB_URI não definida no arquivo .env');
  process.exit(1);
}

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Conectado ao MongoDB com sucesso');
  })
  .catch((err) => {
    console.error('Erro ao conectar ao MongoDB:', err.message);  // Mostre a mensagem de erro mais detalhada
    console.error(err);  // Mostre o erro completo para mais detalhes
  });
