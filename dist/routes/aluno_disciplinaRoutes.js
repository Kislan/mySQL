import express from 'express';
import * as aluno_disciplinaController from '../controllers/aluno_disciplinaController.js';
const router = express.Router();
router.get('/', aluno_disciplinaController.getAlunos_disiplinas);
router.post('/', aluno_disciplinaController.criarAluno_disciplina);
export default router;
