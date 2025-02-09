import { Request, Response } from 'express';
import * as turmaModel from '../models/turmaModel';

export async function getTurmas(req: Request, res: Response) {
  try {
    const turmas = await turmaModel.getTurmas();
    console.log('Turmas recebidas:', turmas);  // Verifique o que está sendo retornado
    res.json(turmas);
  } catch (error) {
    console.error('Erro ao buscar turmas:', error);
    res.status(500).json({ message: 'Erro ao buscar turmas' });
  }
}
