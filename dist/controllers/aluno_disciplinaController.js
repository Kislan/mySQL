import * as aluno_disciplinaModel from '../models/aluno_disciplinaModel.js';
// Função para obter os alunos
export async function getAlunos_disiplinas(req, res) {
    try {
        const alunos_disciplinas = await aluno_disciplinaModel.getAluno_disciplina();
        res.json(alunos_disciplinas);
    }
    catch (error) {
        res.status(500).json({ message: 'Erro ao buscar alunos e disciplinas' });
    }
}
// Função para criar o aluno
export async function criarAluno_disciplina(req, res) {
    const { aluno_id, disciplina_id } = req.body;
    // Verifica se todos os campos obrigatórios estão presentes
    if (!aluno_id || !disciplina_id) {
        return res.status(400).json({ message: 'Todos os campos devem ser preenchidos.' });
    }
    try {
        const result = await aluno_disciplinaModel.criarAluno_disciplina(aluno_id, disciplina_id);
        return res.status(201).json({ id: result.insertId });
    }
    catch (error) {
        return res.status(500).json({ message: 'Erro ao criar aluno e disciplina' });
    }
}
