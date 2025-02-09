import mysql from 'mysql2/promise'; // Usando a versão promise do mysql2
import dotenv from 'dotenv';
import { ResultSetHeader } from 'mysql2';

dotenv.config();

// Criação da conexão com o banco de dados
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: Number(process.env.DB_PORT),
});

// Função para obter todos os alunos
export async function getAlunos() {
  const [rows] = await pool.execute('SELECT * FROM aluno');
  return rows;
}

// Função para criar aluno
export async function criarAluno(
  nome: string,
  data_nascimento: string,
  endereco: string,
  email: string,
  usuario: string,
  senha: string,
  turma_id: number
) {
  const [result] = await pool.execute(
    'INSERT INTO aluno (nome, data_nascimento, endereco, email, usuario, senha, turma_id) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [nome, data_nascimento, endereco, email, usuario, senha, turma_id]
  );

  const insertId = (result as ResultSetHeader).insertId;
  return { insertId }; // Retorna o ID do aluno inserido
}
