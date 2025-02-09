import { Request, Response } from 'express';
import * as professorModel from '../models/professorModel';

// Função para obter os alunos
export async function getProfessores(req: Request, res: Response) {
  try {
    const professores = await professorModel.getProfessores()
    res.json(professores);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar professores' });
  }
}