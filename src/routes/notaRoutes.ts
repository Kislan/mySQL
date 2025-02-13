import express from 'express';
import * as notaController from '../controllers/notaController.js';

const router = express.Router();

router.get('/', notaController.getNotas);
router.post('/', notaController.criarNotas);

export default router;
