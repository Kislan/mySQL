"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Disciplina_1 = require("../src/Disciplina");
var Professor_1 = require("../src/Professor");
describe("Disciplina", function () {
    var professor;
    var disciplina;
    beforeEach(function () {
        professor = new Professor_1.Professor("Carlos Silva", "carlos@email.com", "carlos321", "1234");
        disciplina = new Disciplina_1.Disciplina("Matemática", 60, professor);
    });
    test("Deve criar uma disciplina com nome, quantidade de aulas e professor responsável", function () {
        expect(disciplina.nome).toBe("Matemática");
        expect(disciplina.quantidadeAulas).toBe(60);
        expect(disciplina.professorResponsavel).toBe(professor);
    });
    test("Deve retornar corretamente o nome da disciplina", function () {
        expect(disciplina.nome).toBe("Matemática");
    });
    test("Deve retornar corretamente a quantidade de aulas", function () {
        expect(disciplina.quantidadeAulas).toBe(60);
    });
    test("Deve retornar corretamente o professor responsável", function () {
        expect(disciplina.professorResponsavel.nome).toBe("Carlos Silva");
        expect(disciplina.professorResponsavel.email).toBe("carlos@email.com");
    });
});
