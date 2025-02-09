import { inserirTurma, inserirProfessor, inserirDisciplina, inserirTurmaDisciplina } from './index';
import { Professor } from './Professor';
import { Disciplina } from './Disciplina';
import { Turma } from './Turma';

async function inserirDados() {
  // 1. Criar os professores
  const professores = [
    new Professor("Carlos Silva", "carlos.silva@email.com", "carlos123", "senha123"),
    new Professor("Maria Oliveira", "maria.oliveira@email.com", "maria2025", "senha456"),
    new Professor("João Pereira", "joao.pereira@email.com", "joao987", "senha234"),
    new Professor("Ana Costa", "ana.costa@email.com", "ana102", "senha143"),
    new Professor("Lucas Souza", "lucas.souza@email.com", "lucas123", "senha124"),
    new Professor("Fernanda Lima", "fernanda.lima@email.com", "fernanda123", "senha745")
  ];

  // 2. Inserir Professores e pegar os IDs
  const professoresIds = [];

  for (const professor of professores) {
    const professorId = await inserirProfessor(professor.nome, professor.email, professor.nome_usuario, professor.senha);
    professoresIds.push({ professor: professor, id: professorId }); // Guardar o objeto professor e o ID
  }

  // 3. Inserir Turmas
  const turmas = [
    new Turma("1° ano A", 2024, "Matutino"),
    new Turma("1° ano B", 2024, "Vespertino"),
    new Turma("2° ano A", 2024, "Matutino"),
    new Turma("2° ano B", 2024, "Vespertino"),
    new Turma("3° ano A", 2024, "Matutino"),
    new Turma("3° ano B", 2024, "Vespertino")
  ];

  const turmasIds = [];
  for (const turma of turmas) {
    const turmaId = await inserirTurma(turma.nome, turma.ano_letivo, turma.turno);
    turmasIds.push(turmaId);
  }

  // 4. Inserir Disciplinas usando o objeto professor
  const disciplinas = [
    new Disciplina("Matemática", 80, professoresIds[0].professor), // Passando o objeto professor completo
    new Disciplina("Matemática", 80, professoresIds[1].professor),
    new Disciplina("Física", 80, professoresIds[2].professor),
    new Disciplina("Física", 80, professoresIds[3].professor),
    new Disciplina("Geografia", 60, professoresIds[4].professor),
    new Disciplina("Geografia", 60, professoresIds[5].professor)
  ];

  const disciplinasIds = [];

  for (const disciplina of disciplinas) {
    const professorFound = professoresIds.find(p => p.professor === disciplina.professorResponsavel);
      if (professorFound) {
        const professorId = professorFound.id;
        const disciplinaId = await inserirDisciplina(disciplina.nome, disciplina.quantidadeAulas, professorId);
        disciplinasIds.push(disciplinaId);
      } else {
        console.error(`Professor não encontrado para a disciplina: ${disciplina.nome}`);
    }

  }

  // 5. Relacionar Disciplinas com Turmas (Turma-Disciplina)
  const turmaDisciplinaPairs = [
    { turmaId: turmasIds[0], disciplinaId: disciplinasIds[0] }, // turma_1A + matematica_manha
    { turmaId: turmasIds[0], disciplinaId: disciplinasIds[2] }, // turma_1A + fisica_manha
    { turmaId: turmasIds[0], disciplinaId: disciplinasIds[4] }, // turma_1A + geografia_manha

    { turmaId: turmasIds[2], disciplinaId: disciplinasIds[0] }, // turma_2A + matematica_manha
    { turmaId: turmasIds[2], disciplinaId: disciplinasIds[2] }, // turma_2A + fisica_manha
    { turmaId: turmasIds[2], disciplinaId: disciplinasIds[4] }, // turma_2A + geografia_manha

    { turmaId: turmasIds[4], disciplinaId: disciplinasIds[0] }, // turma_3A + matematica_manha
    { turmaId: turmasIds[4], disciplinaId: disciplinasIds[2] }, // turma_3A + fisica_manha
    { turmaId: turmasIds[4], disciplinaId: disciplinasIds[4] }, // turma_3A + geografia_manha

    { turmaId: turmasIds[1], disciplinaId: disciplinasIds[1] }, // turma_1B + matematica_tarde
    { turmaId: turmasIds[1], disciplinaId: disciplinasIds[3] }, // turma_1B + fisica_tarde
    { turmaId: turmasIds[1], disciplinaId: disciplinasIds[5] }, // turma_1B + geografia_tarde

    { turmaId: turmasIds[3], disciplinaId: disciplinasIds[1] }, // turma_2B + matematica_tarde
    { turmaId: turmasIds[3], disciplinaId: disciplinasIds[3] }, // turma_2B + fisica_tarde
    { turmaId: turmasIds[3], disciplinaId: disciplinasIds[5] }, // turma_2B + geografia_tarde

    { turmaId: turmasIds[5], disciplinaId: disciplinasIds[1] }, // turma_3B + matematica_tarde
    { turmaId: turmasIds[5], disciplinaId: disciplinasIds[3] }, // turma_3B + fisica_tarde
    { turmaId: turmasIds[5], disciplinaId: disciplinasIds[5] }  // turma_3B + geografia_tarde
  ];

  for (const pair of turmaDisciplinaPairs) {
    await inserirTurmaDisciplina(pair.turmaId, pair.disciplinaId);
  }

  console.log('Dados inseridos com sucesso!');
}

inserirDados().catch((error) => console.error('Erro ao inserir os dados:', error));
