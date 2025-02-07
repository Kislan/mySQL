import { Professor } from "../src/Professor";
import { Aluno } from "../src/Aluno";
import { Disciplina } from "../src/Disciplina";
import { Nota } from "../src/Nota";
import { Turma } from "../src/Turma";

describe("Professor", () => {
    let professor: Professor;
    let turma: Turma;
    let aluno: Aluno;
    let disciplina: Disciplina;

    beforeEach(() => {
        turma = new Turma("Turma A", 2024, "Matutino");
        professor = new Professor("Carlos Silva", "carlos@email.com", "carlossilva", "senha123");
        disciplina = new Disciplina("Matemática", 60, professor);
        aluno = new Aluno("João Silva", "2005-03-10", "Rua 123", "joao@email.com", turma, "joaosilva", "senha123");
    });

    test("Deve criar um professor corretamente", () => {
        expect(professor.nome).toBe("Carlos Silva");
        expect(professor.email).toBe("carlos@email.com");
        expect(professor.nome_usuario).toBe("carlossilva");
        expect(professor.senha).toBe("senha123");
    });

    test("Deve registrar uma nota válida para um aluno", () => {
        professor.registrarNota(aluno, disciplina, "Prova", 85, 1);
        expect(aluno.notas.length).toBe(1);
        expect(aluno.notas[0].valorNota).toBe(85);
    });

    test("Não deve registrar uma nota inválida (negativa)", () => {
        expect(() => professor.registrarNota(aluno, disciplina, "Prova", -10, 1)).toThrow("Nota inválida! A nota deve ser entre 0 e 100.");
    });

    test("Não deve registrar uma nota inválida (acima de 100)", () => {
        expect(() => professor.registrarNota(aluno, disciplina, "Prova", 110, 1)).toThrow("Nota inválida! A nota deve ser entre 0 e 100.");
    });

    test("Deve registrar aulas e faltas corretamente", () => {
        professor.registrarAulasEFaltas(aluno, disciplina, 20, 5);
        expect(aluno.calcularFrequencia(disciplina)).toBe(75);
    });

    test("Não deve registrar aulas inválidas (mais do que a carga horária)", () => {
        expect(() => professor.registrarAulasEFaltas(aluno, disciplina, 70, 5)).toThrow("Valores inválidos! As aulas dadas não podem ser negativas ou superiores à carga horária da disciplina.");
    });
});
