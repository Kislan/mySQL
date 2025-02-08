import { Professor } from "./Professor";
import { Disciplina } from "./Disciplina";
import { Turma } from "./Turma";
import { inserirTurma, inserirProfessor, inserirDisciplina, inserirTurmaDisciplina } from './index';

async function inserirDados() {
  // Inserir Professores
  const professores = [
    new Professor("Carlos Silva", "carlos.silva@email.com", "carlos123", "senha123"),
    new Professor("Maria Oliveira", "maria.oliveira@email.com", "maria2025", "senha456"),
    new Professor("João Pereira", "joao.pereira@email.com", "joao987", "senha234"),
    new Professor("Ana Costa", "ana.costa@email.com", "ana102", "senha143"),
    new Professor("Lucas Souza", "lucas.souza@email.com", "lucas123", "senha124"),
    new Professor("Fernanda Lima", "fernanda.lima@email.com", "fernanda123", "senha745")
  ];

  for (const professor of professores) {
    await inserirProfessor(professor.nome, professor.email, professor.nome_usuario, professor.senha);
  }

  // Inserir Turmas
  const turmas = [
    new Turma("1° ano A", 2024, "Matutino"),
    new Turma("1° ano B", 2024, "Vespertino"),
    new Turma("2° ano A", 2024, "Matutino"),
    new Turma("2° ano B", 2024, "Vespertino"),
    new Turma("3° ano A", 2024, "Matutino"),
    new Turma("3° ano B", 2024, "Vespertino")
  ];

  for (const turma of turmas) {
    await inserirTurma(turma.nome, turma.ano_letivo, turma.turno);
  }

  // Inserir Disciplinas
  const disciplinas = [
    new Disciplina("Matemática", 80, professores[0]),
    new Disciplina("Matemática", 80, professores[1]),
    new Disciplina("Física", 80, professores[2]),
    new Disciplina("Física", 80, professores[3]),
    new Disciplina("Geografia", 60, professores[4]),
    new Disciplina("Geografia", 60, professores[5])
  ];

  for (const disciplina of disciplinas) {
    const professorId = professores.find(p => p.nome === disciplina.professorResponsavel.nome)?.id || 0;
    await inserirDisciplina(disciplina.nome, disciplina.quantidadeAulas, professorId);
  }

  // Relacionar Disciplinas com Turmas
  // Isso depende de como você deseja vincular as disciplinas com as turmas (talvez de forma manual ou usando dados do seu código)
}

inserirDados().then(() => console.log('Dados inseridos com sucesso!')).catch((err) => console.error('Erro ao inserir dados', err));
