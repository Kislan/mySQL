import { Request, Response } from 'express';
import * as frequenciaModel from '../models/registro_frequenciaModel';

// Função para obter os alunos
export async function getFrequencias(req: Request, res: Response) {
  try {
    const frequencias = await frequenciaModel.getFrequencias();
    res.json(frequencias);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar frequencias' });
  }
}

// Função para criar o aluno
export async function criarFrequencia(req: Request, res: Response) {
  const { aluno_id,disciplina_id,aulas_dadas,faltas } = req.body;

  // Verifica se todos os campos obrigatórios estão presentes
  if (!aluno_id || !disciplina_id || !aulas_dadas || !faltas) {
    return res.status(400).json({ message: 'Todos os campos devem ser preenchidos.' });
  }

  try {
    const result = await frequenciaModel.criarFrequencia(aluno_id,disciplina_id,aulas_dadas,faltas);
    return res.status(201).json({ id: result.insertId });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar frequencia' });
  }
}
