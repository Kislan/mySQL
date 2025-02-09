// No arquivo de rotas (ex: turmaRouter.js)
import express from 'express';
import * as turmaController from '../controllers/turmaController';

const router = express.Router();

router.get('/', turmaController.getTurmas);  // Esse é o endpoint /api/turma

export default router;
