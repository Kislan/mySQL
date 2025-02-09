import { Request, Response } from 'express';
import * as alunoModel from '../models/alunoModel';

export async function getAlunos(req: Request, res: Response) {
  try {
    const alunos = await alunoModel.getAlunos();
    res.json(alunos);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar alunos' });
  }
}

export async function criarAluno(req: Request, res: Response) {
  const { nome, data_nascimento,endereco, email, usuario,senha, turma_id } = req.body;
  try {
    const result = await alunoModel.criarAluno(nome,data_nascimento,endereco, email,usuario,senha, turma_id);
    res.status(201).json({ id: result.insertId });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar aluno' });
  }
}
