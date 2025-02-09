import { Request, Response } from 'express';
import * as alunoModel from '../models/alunoModel';

// Função para obter os alunos
export async function getAlunos(req: Request, res: Response) {
  try {
    const alunos = await alunoModel.getAlunos();
    res.json(alunos);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar alunos' });
  }
}

// Função para criar o aluno
export async function criarAluno(req: Request, res: Response) {
  const { nome, data_nascimento, endereco, email, usuario, senha, turma_id } = req.body;

  // Verifica se todos os campos obrigatórios estão presentes
  if (!nome || !data_nascimento || !endereco || !email || !usuario || !senha || !turma_id) {
    return res.status(400).json({ message: 'Todos os campos devem ser preenchidos.' });
  }

  try {
    const result = await alunoModel.criarAluno(nome, data_nascimento, endereco, email, usuario, senha, turma_id);
    return res.status(201).json({ id: result.insertId });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar aluno' });
  }
}
