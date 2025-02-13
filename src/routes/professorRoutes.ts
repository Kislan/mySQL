import express from 'express';
import * as professorController from '../controllers/professorController.js';

const router = express.Router();

router.get('/', professorController.getProfessores);  // Esse é o endpoint /api/turma

export default router;
