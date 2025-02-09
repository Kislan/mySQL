import express from 'express';
import * as turma_disciplina from '../controllers/turma_disciplinaController';

const router = express.Router();

router.get('/', turma_disciplina.getTurmas_disciplinas);  // Esse é o endpoint /api/turma

export default router;
