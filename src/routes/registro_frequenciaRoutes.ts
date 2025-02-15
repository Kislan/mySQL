import express from 'express';
import * as registro_frequenciaController from '../controllers/registro_frequenciaController.js';

const router = express.Router();

router.get('/', registro_frequenciaController.getFrequencia);
router.post('/', registro_frequenciaController.criarRegistro_Frequencia);

export default router;
