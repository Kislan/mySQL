import express from 'express';
import cors from 'cors';
import turmaRoutes from './routes/turmaRoutes';
import alunoRoutes from './routes/alunoRoutes';

const app = express();
const port = 3000;

app.use(cors()); // Permitir requisições de diferentes origens
app.use(express.json()); // Para manipular requisições JSON

// Configuração das rotas
app.use('/api/turma', turmaRoutes);
app.use('/api/aluno', alunoRoutes);

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
