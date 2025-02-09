import express from 'express';
import * as disciplinasController from '../controllers/disciplinaController';

const router = express.Router();

router.get('/', disciplinasController.getDisciplinas);

export default router;
