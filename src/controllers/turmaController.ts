import { Request, Response } from 'express';
import * as turmaModel from '../models/turmaModel';

export async function getTurmas(req: Request, res: Response) {
  try {
    const turmas = await turmaModel.getTurmas();
    res.json(turmas);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar turmas' });
  }
}