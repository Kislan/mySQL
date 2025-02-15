import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config(); // Isso vai carregar as variáveis de ambiente do arquivo .env
import turmaRoutes from './routes/turmaRoutes.js';
import alunoRoutes from './routes/alunoRoutes.js';
import disciplinaRoutes from './routes/disciplinaRoutes.js';
import professorRoutes from './routes/professorRoutes.js';
import notaRoutes from './routes/notaRoutes.js';
import registro_frequencia from './routes/registro_frequenciaRoutes.js';
import turma_disciplinaRoutes from './routes/turma_disciplinaRoutes.js';
import aluno_disciplinaRoutes from './routes/aluno_disciplinaRoutes.js';
const app = express();
app.use(cors()); // Permitir requisições de diferentes origens
app.use(express.json()); // Para manipular requisições JSON
// Configuração das rotas
app.use('/api/turma', turmaRoutes);
app.use('/api/aluno', alunoRoutes);
app.use('/api/disciplina', disciplinaRoutes);
app.use('/api/professor', professorRoutes);
app.use('/api/nota', notaRoutes);
app.use('/api/registro_frequencia', registro_frequencia);
app.use('/api/turma_disciplina', turma_disciplinaRoutes);
app.use('/api/aluno_disciplina', aluno_disciplinaRoutes);
console.log('Rotas carregadas corretamente!');
app.listen(3000, () => {
    console.log(`Servidor rodando em http://localhost:3000`);
});
