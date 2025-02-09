import pool from '../config/database.js';

export async function getAlunos() {
  const [rows] = await pool.execute('SELECT * FROM aluno');
  return rows;
}

export async function criarAluno(nome: string, data_nascimento: string, endereco:string, email: string,usuario:string,senha:string, turma_id: number) {
  const [result] = await pool.execute('INSERT INTO aluno (nome,data_nascimento, endereco, email, usuario, senha, turma_id) VALUES (?, ?, ?, ?, ?, ?, ?)', [nome,data_nascimento,endereco, email,usuario,senha, turma_id]);
  return result;
}
