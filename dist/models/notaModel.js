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
// Função para obter todas as notas
export async function getNotas() {
    try {
        const [rows] = await pool.execute('SELECT * FROM nota');
        return rows;
    }
    catch (error) {
        console.error('Erro ao obter notas:', error);
        throw new Error('Erro ao obter dados das notas');
    }
}
// Função para criar nota
export async function criarNota(valorNota, tipo_avaliacao, bimestre, aluno_id, disciplina_id) {
    try {
        const [result] = await pool.execute('INSERT INTO nota (valorNota, tipo_avaliacao, bimestre, aluno_id, disciplina_id) VALUES (?, ?, ?, ?, ?)', [valorNota, tipo_avaliacao, bimestre, aluno_id, disciplina_id]);
        const insertId = result.insertId;
        return { insertId }; // Retorna o ID da nota inserida
    }
    catch (error) {
        console.error('Erro ao criar nota:', error);
        throw new Error('Erro ao inserir dados de nota');
    }
}
