"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Turma_1 = require("../src/Turma");
var Professor_1 = require("../src/Professor");
describe("Turma", function () {
    var turma;
    var professor;
    var disciplina;
    var aluno;
    beforeEach(function () {
        turma = new Turma_1.Turma("Turma A", 2024, "Matutino");
        professor = new Professor_1.Professor("Carlos Silva", "carlos@email.com", "carlossilva", "senha123");
        disciplina = { nome: "Matemática", quantidadeAulas: 60, professorResponsavel: professor };
        aluno = { nome: "João Silva", email: "joao@email.com" };
    });
    test("Deve criar uma turma corretamente", function () {
        expect(turma.nome).toBe("Turma A");
        expect(turma.ano_letivo).toBe(2024);
        expect(turma.turno).toBe("Matutino");
    });
    test("Deve adicionar uma disciplina à turma", function () {
        turma.adicionarDisciplina(disciplina);
        expect(turma.disciplinas.length).toBe(1);
        expect(turma.disciplinas[0].nome).toBe("Matemática");
    });
    test("Não deve adicionar uma disciplina duplicada", function () {
        turma.adicionarDisciplina(disciplina);
        expect(function () { return turma.adicionarDisciplina(disciplina); }).toThrow("Disciplina Matem\u00E1tica j\u00E1 foi adicionada \u00E0 turma.");
    });
    test("Deve adicionar um aluno à turma", function () {
        turma.adicionarAluno(aluno);
        expect(turma.alunos.length).toBe(1);
        expect(turma.alunos[0].nome).toBe("João Silva");
    });
    test("Não deve adicionar um aluno duplicado", function () {
        turma.adicionarAluno(aluno);
        expect(function () { return turma.adicionarAluno(aluno); }).toThrow("Aluno Jo\u00E3o Silva j\u00E1 foi adicionado \u00E0 turma.");
    });
    test("Deve matricular um aluno na disciplina se ele estiver na turma", function () {
        turma.adicionarAluno(aluno);
        console.log = jest.fn(); // Captura o console.log
        turma.matricularAlunoNaDisciplina(aluno, disciplina);
        expect(console.log).toHaveBeenCalledWith("João Silva matriculado na disciplina Matemática");
    });
    test("Não deve matricular um aluno que não está na turma", function () {
        console.log = jest.fn(); // Captura o console.log
        turma.matricularAlunoNaDisciplina(aluno, disciplina);
        expect(console.log).toHaveBeenCalledWith("Aluno João Silva não está na turma.");
    });
});
