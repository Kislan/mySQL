import * as disciplinaModel from '../models/disciplinaModel.js';
// Função para obter os alunos
export async function getDisciplinas(req, res) {
    try {
        const disciplinas = await disciplinaModel.getDisciplinas();
        res.json(disciplinas);
    }
    catch (error) {
        res.status(500).json({ message: 'Erro ao buscar disciplinas' });
    }
}
