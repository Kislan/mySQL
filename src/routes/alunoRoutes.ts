import { Router } from 'express';
import * as alunoController from '../controllers/alunoController';

const router = Router();

router.get('/', alunoController.getAlunos);
router.post('/', alunoController.criarAluno);

export default router;
