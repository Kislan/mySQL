import { Nota } from "../src/Nota";
import { Disciplina } from "../src/Disciplina";
import { Aluno } from "../src/Aluno";
import { Professor } from "../src/Professor";
import { Turma } from "../src/Turma";

describe("Nota", () => {
    let professor: Professor;
    let disciplina: Disciplina;
    let turma: Turma;
    let aluno: Aluno;
    let nota: Nota;

    beforeEach(() => {
        turma = new Turma("Turma A", 2024, "Matutino");
        professor = new Professor("Carlos Silva", "carlos@email.com", "carlos321", "1234");
        disciplina = new Disciplina("Matemática", 60, professor);
        aluno = new Aluno("João Silva", "2005-03-10", "Rua 123", "joao@email.com", turma, "joaosilva", "senha123");
        nota = new Nota(85, disciplina, aluno, "Prova", 1);
    });

    test("Deve criar uma nota corretamente", () => {
        expect(nota.valorNota).toBe(85);
        expect(nota.disciplina).toBe(disciplina);
        expect(nota.aluno).toBe(aluno);
        expect(nota.tipoAvaliacao).toBe("Prova");
        expect(nota.bimestre).toBe(1);
    });

    test("Deve atribuir uma nova nota válida", () => {
        nota.atribuirNota(90);
        expect(nota.valorNota).toBe(90);
    });

    test("Não deve atribuir uma nota inválida (negativa)", () => {
        nota.atribuirNota(-10);
        expect(nota.valorNota).toBe(85); // Deve manter o valor original
    });

    test("Não deve atribuir uma nota inválida (acima de 100)", () => {
        nota.atribuirNota(110);
        expect(nota.valorNota).toBe(85); // Deve manter o valor original
    });

    test("Deve calcular corretamente a média da nota", () => {
        expect(nota.calcularMedia()).toBe(85);
    });
});
