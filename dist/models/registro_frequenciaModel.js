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
// Função para obter todas as frequências
export async function getFrequencias() {
    try {
        const [rows] = await pool.execute('SELECT * FROM registro_frequencia');
        return rows;
    }
    catch (error) {
        console.error('Erro ao obter frequências:', error);
        throw new Error('Erro ao obter dados de frequências');
    }
}
// Função para criar frequência
export async function criarFrequencia(aluno_id, disciplina_id, aulas_dadas, faltas, data_) {
    try {
        const [result] = await pool.execute('INSERT INTO registro_frequencia (aluno_id, disciplina_id, aulas_dadas, faltas,data_) VALUES (?, ?, ?, ?, ?)', [aluno_id, disciplina_id, aulas_dadas, faltas, data_]);
        const insertId = result.insertId;
        return { insertId }; // Retorna o ID da frequência inserida
    }
    catch (error) {
        console.error('Erro ao criar frequência:', error);
        throw new Error('Erro ao inserir dados de frequência');
    }
}
