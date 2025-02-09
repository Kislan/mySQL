import { Request, Response } from 'express';
import * as notaModel from '../models/notaModel';

// Função para obter os alunos
export async function getNotas(req: Request, res: Response):Promise<void> {
  try {
    const notas = await notaModel.getNotas();
    res.json(notas);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar frequencias' });
  }
}

// Função para criar o aluno
export async function criarNotas(req: Request, res: Response):Promise <void> {
  const { valorNota,tipo_avaliacao,bimestre,aluno_id,disciplina_id } = req.body;

  // Verifica se todos os campos obrigatórios estão presentes
  if (!valorNota || !tipo_avaliacao || !bimestre || !aluno_id || !disciplina_id) {
    res.status(400).json({ message: 'Todos os campos devem ser preenchidos.' });
  }

  try {
    const result = await notaModel.criarNota(valorNota,tipo_avaliacao,bimestre,aluno_id,disciplina_id);
     res.status(201).json({ id: result.insertId });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar Nota' });
  }
}
