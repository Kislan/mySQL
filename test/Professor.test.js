"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Professor_1 = require("../src/Professor");
var Aluno_1 = require("../src/Aluno");
var Disciplina_1 = require("../src/Disciplina");
var Turma_1 = require("../src/Turma");
describe("Professor", function () {
    var professor;
    var turma;
    var aluno;
    var disciplina;
    beforeEach(function () {
        turma = new Turma_1.Turma("Turma A", 2024, "Matutino");
        professor = new Professor_1.Professor("Carlos Silva", "carlos@email.com", "carlossilva", "senha123");
        disciplina = new Disciplina_1.Disciplina("Matemática", 60, professor);
        aluno = new Aluno_1.Aluno("João Silva", "2005-03-10", "Rua 123", "joao@email.com", turma, "joaosilva", "senha123");
    });
    test("Deve criar um professor corretamente", function () {
        expect(professor.nome).toBe("Carlos Silva");
        expect(professor.email).toBe("carlos@email.com");
        expect(professor.nome_usuario).toBe("carlossilva");
        expect(professor.senha).toBe("senha123");
    });
    test("Deve registrar uma nota válida para um aluno", function () {
        professor.registrarNota(aluno, disciplina, "Prova", 85, 1);
        expect(aluno.notas.length).toBe(1);
        expect(aluno.notas[0].valorNota).toBe(85);
    });
    test("Não deve registrar uma nota inválida (negativa)", function () {
        expect(function () { return professor.registrarNota(aluno, disciplina, "Prova", -10, 1); }).toThrow("Nota inválida! A nota deve ser entre 0 e 100.");
    });
    test("Não deve registrar uma nota inválida (acima de 100)", function () {
        expect(function () { return professor.registrarNota(aluno, disciplina, "Prova", 110, 1); }).toThrow("Nota inválida! A nota deve ser entre 0 e 100.");
    });
    test("Deve registrar aulas e faltas corretamente", function () {
        professor.registrarAulasEFaltas(aluno, disciplina, 20, 5);
        expect(aluno.calcularFrequencia(disciplina)).toBe(75);
    });
    test("Não deve registrar aulas inválidas (mais do que a carga horária)", function () {
        expect(function () { return professor.registrarAulasEFaltas(aluno, disciplina, 70, 5); }).toThrow("Valores inválidos! As aulas dadas não podem ser negativas ou superiores à carga horária da disciplina.");
    });
});
