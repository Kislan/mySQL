"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Aluno_1 = require("../src/Aluno");
var Turma_1 = require("../src/Turma");
var Nota_1 = require("../src/Nota");
var Disciplina_1 = require("../src/Disciplina");
var Professor_1 = require("../src/Professor");
describe("Aluno", function () {
    var aluno;
    var turma;
    var disciplina;
    var professor;
    beforeEach(function () {
        turma = new Turma_1.Turma("Turma A", 2024, "Manhã");
        professor = new Professor_1.Professor("Carlos Silva", "carlos@email.com", "carlos321", "1234");
        disciplina = new Disciplina_1.Disciplina("Matemática", 60, professor);
        aluno = new Aluno_1.Aluno("João Silva", "2005-03-10", "Rua 123", "joao@email.com", turma, "joaosilva", "senha123");
    });
    test("Deve adicionar uma nota ao aluno", function () {
        var nota = new Nota_1.Nota(80, disciplina, aluno, "Prova", 1);
        aluno.adicionarNota(nota);
        expect(aluno.notas.length).toBe(1);
        expect(aluno.notas[0].valorNota).toBe(80);
    });
    test("Não deve permitir que a soma das notas ultrapasse 100", function () {
        aluno.adicionarNota(new Nota_1.Nota(60, disciplina, aluno, "Prova", 1));
        expect(function () { return aluno.adicionarNota(new Nota_1.Nota(50, disciplina, aluno, "Trabalho", 1)); }).toThrow(Error);
    });
    test("Deve calcular a média final corretamente", function () {
        aluno.adicionarNota(new Nota_1.Nota(80, disciplina, aluno, "Prova", 1));
        aluno.adicionarNota(new Nota_1.Nota(90, disciplina, aluno, "Prova", 2));
        aluno.adicionarNota(new Nota_1.Nota(70, disciplina, aluno, "Prova", 3));
        aluno.adicionarNota(new Nota_1.Nota(60, disciplina, aluno, "Prova", 4));
        expect(aluno.calcularMediaFinal(disciplina)).toBe(75);
    });
    test("Deve registrar aulas e faltas corretamente", function () {
        aluno.registrarAulasEFaltas(disciplina, 10, 2);
        expect(aluno.calcularFrequencia(disciplina)).toBe(80);
    });
    test("Deve calcular a frequência corretamente", function () {
        aluno.registrarAulasEFaltas(disciplina, 20, 5);
        expect(aluno.calcularFrequencia(disciplina)).toBe(75);
    });
});
