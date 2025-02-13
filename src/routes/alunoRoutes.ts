import express from 'express';
import * as alunoController from '../controllers/alunoController.js';

const router = express.Router();

router.get('/', alunoController.getAlunos);
router.post('/', alunoController.criarAluno);

export default router;
