import express from 'express';
import * as frequenciaController from '../controllers/frequenciaController.js';
const router = express.Router();
router.get('/', frequenciaController.getFrequencias);
router.post('/', frequenciaController.criarFrequencia);
export default router;
