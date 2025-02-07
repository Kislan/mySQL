"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Nota_1 = require("../src/Nota");
var Disciplina_1 = require("../src/Disciplina");
var Aluno_1 = require("../src/Aluno");
var Professor_1 = require("../src/Professor");
var Turma_1 = require("../src/Turma");
describe("Nota", function () {
    var professor;
    var disciplina;
    var turma;
    var aluno;
    var nota;
    beforeEach(function () {
        turma = new Turma_1.Turma("Turma A", 2024, "Matutino");
        professor = new Professor_1.Professor("Carlos Silva", "carlos@email.com", "carlos321", "1234");
        disciplina = new Disciplina_1.Disciplina("Matemática", 60, professor);
        aluno = new Aluno_1.Aluno("João Silva", "2005-03-10", "Rua 123", "joao@email.com", turma, "joaosilva", "senha123");
        nota = new Nota_1.Nota(85, disciplina, aluno, "Prova", 1);
    });
    test("Deve criar uma nota corretamente", function () {
        expect(nota.valorNota).toBe(85);
        expect(nota.disciplina).toBe(disciplina);
        expect(nota.aluno).toBe(aluno);
        expect(nota.tipoAvaliacao).toBe("Prova");
        expect(nota.bimestre).toBe(1);
    });
    test("Deve atribuir uma nova nota válida", function () {
        nota.atribuirNota(90);
        expect(nota.valorNota).toBe(90);
    });
    test("Não deve atribuir uma nota inválida (negativa)", function () {
        nota.atribuirNota(-10);
        expect(nota.valorNota).toBe(85); // Deve manter o valor original
    });
    test("Não deve atribuir uma nota inválida (acima de 100)", function () {
        nota.atribuirNota(110);
        expect(nota.valorNota).toBe(85); // Deve manter o valor original
    });
    test("Deve calcular corretamente a média da nota", function () {
        expect(nota.calcularMedia()).toBe(85);
    });
});
