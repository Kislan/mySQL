import mysql from 'mysql2/promise'; // Usando a versão promise do mysql2
import dotenv from 'dotenv';
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
export async function getAluno_disciplina() {
    try {
        const [rows] = await pool.execute('SELECT * FROM aluno_disciplina');
        return rows;
    }
    catch (error) {
        console.error('Erro ao obter alunos e disciplinas:', error);
        throw new Error('Erro ao obter dados da tabela aluno_disciplina');
    }
}
// Função para criar aluno
export async function criarAluno_disciplina(aluno_id, disciplina_id) {
    try {
        const [result] = await pool.execute('INSERT INTO aluno_disciplina (aluno_id, disciplina_id) VALUES (?, ?)', [aluno_id, disciplina_id]);
        const insertId = result.insertId;
        return { insertId };
    }
    catch (error) {
        console.error('Erro ao criar aluno_disciplina:', error);
        throw new Error('Erro ao inserir dados na tabela aluno_disciplina');
    }
}
