const mongoose = require('mongoose');

if (!process.env.MONGODB_URI) {
  console.error('Erro: MONGODB_URI não definida no arquivo .env');
  process.exit(1);  // Encerra o processo se a URL não estiver definida
}

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Conectado ao MongoDB com sucesso');
  })
  .catch((err) => {
    console.error('Erro ao conectar ao MongoDB:', err);
  });
