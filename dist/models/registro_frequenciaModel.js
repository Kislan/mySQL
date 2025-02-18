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
export async function getFrequencia() {
    try {
        const [rows] = await pool.execute('SELECT * FROM registros_aulas');
        return rows;
    }
    catch (error) {
        console.error('Erro ao obter frequências:', error);
        throw new Error('Erro ao obter dados das frequências');
    }
}
// Função para criar aluno
export async function criarRegistro_Frequencia(aluno_id, disciplina_id, aulas_dadas, faltas) {
    // Verifique se algum valor é inválido antes de tentar inserir no banco
    if (!aluno_id || !disciplina_id || !aulas_dadas || !faltas) {
        throw new Error('Campos obrigatórios não preenchidos');
    }
    try {
        const [result] = await pool.execute('INSERT INTO registros_aulas (aluno_id, disciplina_id, aulas_dadas, faltas) VALUES (?,?,?,?)', [aluno_id, disciplina_id, aulas_dadas, faltas]);
        const insertId = result.insertId;
        return { insertId }; // Retorna o ID do aluno inserido
    }
    catch (error) {
        console.error('Erro ao criar frequência:', error);
        throw new Error('Erro ao inserir dados');
    }
}
