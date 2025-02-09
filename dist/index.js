"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.inserirTurma = inserirTurma;
exports.inserirProfessor = inserirProfessor;
exports.inserirDisciplina = inserirDisciplina;
exports.inserirTurmaDisciplina = inserirTurmaDisciplina;
const database_js_1 = __importDefault(require("./config/database.js"));
async function inserirTurma(nome, ano, turno) {
    const query = 'INSERT INTO turma (nome, ano, turno) VALUES (?, ?, ?)';
    try {
        const [result] = await database_js_1.default.execute(query, [nome, ano, turno]);
        return result; // O resultado é o retorno da operação de inserção
    }
    catch (error) {
        console.error('Erro ao inserir turma:', error);
        throw error;
    }
}
async function inserirProfessor(nome, email, nome_usuario, senha) {
    const query = 'INSERT INTO professor (nome, email, usuario, senha) VALUES (?, ?, ?, ?)';
    try {
        const [result] = await database_js_1.default.execute(query, [nome, email, nome_usuario, senha]);
        return result.insertId; // Retorna o ID do professor inserido
    }
    catch (error) {
        console.error('Erro ao inserir professor:', error);
        throw error;
    }
}
async function inserirDisciplina(nome, carga_horaria, professor_id) {
    const query = 'INSERT INTO disciplina (nome, carga_horaria, professor_id) VALUES (?, ?, ?)';
    try {
        const [result] = await database_js_1.default.execute(query, [nome, carga_horaria, professor_id]);
        return result.insertId; // Retorna o ID da disciplina inserida
    }
    catch (error) {
        console.error('Erro ao inserir disciplina:', error);
        throw error;
    }
}
async function inserirTurmaDisciplina(turma_id, disciplina_id) {
    const query = 'INSERT INTO turma_disciplina (turma_id, disciplina_id) VALUES (?, ?)';
    try {
        const [result] = await database_js_1.default.execute(query, [turma_id, disciplina_id]);
        return result; // Retorna o resultado da inserção na tabela de relacionamento
    }
    catch (error) {
        console.error('Erro ao inserir turma-disciplina:', error);
        throw error;
    }
}
