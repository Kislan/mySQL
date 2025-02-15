import * as registro_frequenciaModel from '../models/registro_frequenciaModel.js';
export async function getFrequencia(req, res) {
    try {
        const frequencia = await registro_frequenciaModel.getFrequencia();
        res.json(frequencia);
    }
    catch (error) {
        res.status(500).json({ message: 'Erro ao buscar alunos' });
    }
}
export async function criarRegistro_Frequencia(req, res) {
    const { aluno_id, disciplina_id, aulas_dadas, faltas } = req.body;
    if (!aluno_id || !disciplina_id || !aulas_dadas || !faltas) {
        return res.status(400).json({ message: 'Todos os campos devem ser preenchidos.' });
    }
    try {
        const result = await registro_frequenciaModel.criarRegistro_Frequencia(aluno_id, disciplina_id, aulas_dadas, faltas);
        return res.status(201).json({ id: result.insertId });
    }
    catch (error) {
        return res.status(500).json({ message: 'Erro ao criar aluno' });
    }
}
