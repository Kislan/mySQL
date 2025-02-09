import mysql from 'mysql2/promise'; // Usando a versão promise do mysql2 para facilitar o uso de async/await
import dotenv from 'dotenv';

// Carrega as variáveis do .env
dotenv.config();

// Criação da conexão com o banco de dados
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: Number(process.env.DB_PORT),
});

export async function getTurmas() {
  try {
    const [rows] = await pool.execute('SELECT * FROM turma'); // Ajuste para o nome correto da tabela
    return rows;  // Retorna as turmas encontradas
  } catch (error) {
    console.error('Erro ao buscar turmas:', error);
    throw new Error('Erro ao buscar turmas');
  }
}
