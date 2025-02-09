import { Request, Response } from 'express';
import * as disciplinaModel from '../models/disciplinaModel';

// Função para obter os alunos
export async function getDisciplinas(req: Request, res: Response) {
  try {
    const disciplinas = await disciplinaModel.getDisciplinas();
    res.json(disciplinas);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar disciplinas' });
  }
}

