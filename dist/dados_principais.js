"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Professor_1 = require("./Professor");
const Disciplina_1 = require("./Disciplina");
const Turma_1 = require("./Turma");
const index_1 = require("./index");
async function inserirDados() {
    // Inserir Professores e obter IDs
    const professores = [
        new Professor_1.Professor("Carlos Silva", "carlos.silva@email.com", "carlos123", "senha123"),
        new Professor_1.Professor("Maria Oliveira", "maria.oliveira@email.com", "maria2025", "senha456"),
        new Professor_1.Professor("João Pereira", "joao.pereira@email.com", "joao987", "senha234"),
        new Professor_1.Professor("Ana Costa", "ana.costa@email.com", "ana102", "senha143"),
        new Professor_1.Professor("Lucas Souza", "lucas.souza@email.com", "lucas123", "senha124"),
        new Professor_1.Professor("Fernanda Lima", "fernanda.lima@email.com", "fernanda123", "senha745")
    ];
    const professoresIds = [];
    for (const professor of professores) {
        const professorId = await (0, index_1.inserirProfessor)(professor.nome, professor.email, professor.nome_usuario, professor.senha);
        professoresIds.push(professorId.insertId); // Aqui estamos armazenando o ID gerado da inserção
    }
    // Inserir Turmas e obter IDs
    const turmas = [
        new Turma_1.Turma("1° ano A", 2024, "Matutino"),
        new Turma_1.Turma("1° ano B", 2024, "Vespertino"),
        new Turma_1.Turma("2° ano A", 2024, "Matutino"),
        new Turma_1.Turma("2° ano B", 2024, "Vespertino"),
        new Turma_1.Turma("3° ano A", 2024, "Matutino"),
        new Turma_1.Turma("3° ano B", 2024, "Vespertino")
    ];
    const turmasIds = [];
    for (const turma of turmas) {
        const turmaId = await (0, index_1.inserirTurma)(turma.nome, turma.ano_letivo, turma.turno);
        turmasIds.push(turmaId.insertId); // Aqui estamos armazenando o ID gerado da inserção
    }
    // Inserir Disciplinas
    const disciplinas = [
        new Disciplina_1.Disciplina("Matemática", 80, professores[0]),
        new Disciplina_1.Disciplina("Matemática", 80, professores[1]),
        new Disciplina_1.Disciplina("Física", 80, professores[2]),
        new Disciplina_1.Disciplina("Física", 80, professores[3]),
        new Disciplina_1.Disciplina("Geografia", 60, professores[4]),
        new Disciplina_1.Disciplina("Geografia", 60, professores[5])
    ];
    const disciplinasIds = [];
    for (const disciplina of disciplinas) {
        const disciplinaId = await (0, index_1.inserirDisciplina)(disciplina.nome, disciplina.quantidadeAulas, professoresIds[disciplinas.indexOf(disciplina)]);
        disciplinasIds.push(disciplinaId.insertId); // Aqui estamos armazenando o ID gerado da inserção
    }
    // Relacionar Disciplinas com as Turmas
    // Turmas da manhã
    await (0, index_1.inserirTurmaDisciplina)(turmasIds[0], disciplinasIds[0]); // turma_1A - matematica_manha
    await (0, index_1.inserirTurmaDisciplina)(turmasIds[0], disciplinasIds[2]); // turma_1A - fisica_manha
    await (0, index_1.inserirTurmaDisciplina)(turmasIds[0], disciplinasIds[4]); // turma_1A - geografia_manha
    await (0, index_1.inserirTurmaDisciplina)(turmasIds[2], disciplinasIds[0]); // turma_2A - matematica_manha
    await (0, index_1.inserirTurmaDisciplina)(turmasIds[2], disciplinasIds[2]); // turma_2A - fisica_manha
    await (0, index_1.inserirTurmaDisciplina)(turmasIds[2], disciplinasIds[4]); // turma_2A - geografia_manha
    await (0, index_1.inserirTurmaDisciplina)(turmasIds[4], disciplinasIds[0]); // turma_3A - matematica_manha
    await (0, index_1.inserirTurmaDisciplina)(turmasIds[4], disciplinasIds[2]); // turma_3A - fisica_manha
    await (0, index_1.inserirTurmaDisciplina)(turmasIds[4], disciplinasIds[4]); // turma_3A - geografia_manha
    // Turmas da tarde
    await (0, index_1.inserirTurmaDisciplina)(turmasIds[1], disciplinasIds[1]); // turma_1B - matematica_tarde
    await (0, index_1.inserirTurmaDisciplina)(turmasIds[1], disciplinasIds[3]); // turma_1B - fisica_tarde
    await (0, index_1.inserirTurmaDisciplina)(turmasIds[1], disciplinasIds[5]); // turma_1B - geografia_tarde
    await (0, index_1.inserirTurmaDisciplina)(turmasIds[3], disciplinasIds[1]); // turma_2B - matematica_tarde
    await (0, index_1.inserirTurmaDisciplina)(turmasIds[3], disciplinasIds[3]); // turma_2B - fisica_tarde
    await (0, index_1.inserirTurmaDisciplina)(turmasIds[3], disciplinasIds[5]); // turma_2B - geografia_tarde
    await (0, index_1.inserirTurmaDisciplina)(turmasIds[5], disciplinasIds[1]); // turma_3B - matematica_tarde
    await (0, index_1.inserirTurmaDisciplina)(turmasIds[5], disciplinasIds[3]); // turma_3B - fisica_tarde
    await (0, index_1.inserirTurmaDisciplina)(turmasIds[5], disciplinasIds[5]); // turma_3B - geografia_tarde
}
inserirDados()
    .then(() => console.log('Dados inseridos com sucesso!'))
    .catch((err) => console.error('Erro ao inserir dados', err));
