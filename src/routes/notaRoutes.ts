import express from 'express';
import * as notaController from '../controllers/notaController';

const router = express.Router();

router.get('/', notaController.getNotas);
router.post('/', notaController.criarNotas);

export default router;
