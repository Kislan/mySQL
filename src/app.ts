import express from 'express';
import cors from 'cors';
import turmaRoutes from './routes/turmaRoutes';
import alunoRoutes from './routes/alunoRoutes';
import disciplinaRoutes from './routes/disciplinaRoutes';
import professorRoutes from './routes/professorRoutes';
import notaRoutes from './routes/notaRoutes'
import frequenciaRoutes from './routes/frequenciaRoutes'
import turma_disciplinaRoutes from './routes/turma_disciplinaRoutes'
import aluno_disciplinaRoutes from './routes/aluno_disciplinaRoutes'

const app = express();

app.use(cors()); // Permitir requisições de diferentes origens
app.use(express.json()); // Para manipular requisições JSON

// Configuração das rotas
app.use('/api/turma', turmaRoutes);
app.use('/api/aluno', alunoRoutes);
app.use('/api/disciplina', disciplinaRoutes)
app.use('/api/professor', professorRoutes)
app.use('/api/nota', notaRoutes)
app.use('/api/frequencia', frequenciaRoutes)
app.use('/api/turma_disciplina', turma_disciplinaRoutes)
app.use('/api/aluno_disciplina', aluno_disciplinaRoutes)


app.listen(3000, () => {
  console.log(`Servidor rodando em http://localhost:3000`);
});
