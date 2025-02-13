import { Request, Response } from 'express';
import * as turma_disciplinaModel from '../models/turma_disciplinaModel.js';

export async function getTurmas_disciplinas(req: Request, res: Response) {
  try {
    const turmas = await turma_disciplinaModel.getTurma_disciplinas();
    res.json(turmas);
  } catch (error) {
    console.error('Erro ao buscar turmas:', error);
    res.status(500).json({ message: 'Erro ao buscar turmas e disciplinas' });
  }
}
