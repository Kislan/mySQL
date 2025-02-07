import { Turma } from "../src/Turma";
import { Disciplina } from "../src/Disciplina";
import { Aluno } from "../src/Aluno";
import { Professor } from "../src/Professor";

describe("Turma", () => {
    let turma: Turma;
    let professor: Professor;
    let disciplina: Disciplina;
    let aluno: Aluno;

    beforeEach(() => {
        turma = new Turma("Turma A", 2024, "Matutino");
        professor = new Professor("Carlos Silva", "carlos@email.com", "carlossilva", "senha123");
        disciplina = { nome: "Matemática", quantidadeAulas: 60, professorResponsavel: professor } as Disciplina;
        aluno = { nome: "João Silva", email: "joao@email.com" } as Aluno;
    });

    test("Deve criar uma turma corretamente", () => {
        expect(turma.nome).toBe("Turma A");
        expect(turma.ano_letivo).toBe(2024);
        expect(turma.turno).toBe("Matutino");
    });

    test("Deve adicionar uma disciplina à turma", () => {
        turma.adicionarDisciplina(disciplina);
        expect(turma.disciplinas.length).toBe(1);
        expect(turma.disciplinas[0].nome).toBe("Matemática");
    });

    test("Não deve adicionar uma disciplina duplicada", () => {
        turma.adicionarDisciplina(disciplina);
        expect(() => turma.adicionarDisciplina(disciplina)).toThrow(`Disciplina Matemática já foi adicionada à turma.`);
    });

    test("Deve adicionar um aluno à turma", () => {
        turma.adicionarAluno(aluno);
        expect(turma.alunos.length).toBe(1);
        expect(turma.alunos[0].nome).toBe("João Silva");
    });

    test("Não deve adicionar um aluno duplicado", () => {
        turma.adicionarAluno(aluno);
        expect(() => turma.adicionarAluno(aluno)).toThrow(`Aluno João Silva já foi adicionado à turma.`);
    });

    test("Deve matricular um aluno na disciplina se ele estiver na turma", () => {
        turma.adicionarAluno(aluno);
        console.log = jest.fn(); // Captura o console.log
        turma.matricularAlunoNaDisciplina(aluno, disciplina);
        expect(console.log).toHaveBeenCalledWith("João Silva matriculado na disciplina Matemática");
    });

    test("Não deve matricular um aluno que não está na turma", () => {
        console.log = jest.fn(); // Captura o console.log
        turma.matricularAlunoNaDisciplina(aluno, disciplina);
        expect(console.log).toHaveBeenCalledWith("Aluno João Silva não está na turma.");
    });
});
