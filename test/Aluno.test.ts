import { Aluno } from "../src/Aluno";
import { Turma } from "../src/Turma";
import { Nota } from "../src/Nota";
import { Disciplina } from "../src/Disciplina";
import { Professor } from "../src/Professor";

describe("Aluno", () => {
    let aluno: Aluno;
    let turma: Turma;
    let disciplina: Disciplina;
    let professor: Professor;

    beforeEach(() => {
        turma = new Turma("Turma A", 2024, "Manhã");
        professor = new Professor("Carlos Silva", "carlos@email.com", "carlos321", "1234");
        disciplina = new Disciplina("Matemática", 60, professor);
        aluno = new Aluno("João Silva", "2005-03-10", "Rua 123", "joao@email.com", turma, "joaosilva", "senha123");
    });

    describe("Adicionar Nota", () => {
        it("Deve adicionar uma nota ao aluno", () => {
            const nota = new Nota(80, disciplina, aluno, "Prova", 1);
            aluno.adicionarNota(nota);

            expect(aluno.notas.length).toBe(1);
            expect(aluno.notas[0].valorNota).toBe(80);
        });

        it("Não deve permitir que a soma das notas ultrapasse 100", () => {
            aluno.adicionarNota(new Nota(60, disciplina, aluno, "Prova", 1));

            expect(() => aluno.adicionarNota(new Nota(50, disciplina, aluno, "Trabalho", 1))).toThrow(Error);
        });
    });

    describe("Calcular Média Final", () => {
        it("Deve calcular a média final corretamente", () => {
            aluno.adicionarNota(new Nota(80, disciplina, aluno, "Prova", 1));
            aluno.adicionarNota(new Nota(90, disciplina, aluno, "Prova", 2));
            aluno.adicionarNota(new Nota(70, disciplina, aluno, "Prova", 3));
            aluno.adicionarNota(new Nota(60, disciplina, aluno, "Prova", 4));

            const mediaFinal = aluno.calcularMediaFinal(disciplina);
            expect(mediaFinal).toBe(75);
        });
    });

    describe("Registrar Aulas e Faltas", () => {
        it("Deve registrar aulas e faltas corretamente", () => {
            aluno.registrarAulasEFaltas(disciplina, 10, 2);

            const frequencia = aluno.calcularFrequencia(disciplina);
            expect(frequencia).toBe(80);
        });
    });

    describe("Calcular Frequência", () => {
        it("Deve calcular a frequência corretamente", () => {
            aluno.registrarAulasEFaltas(disciplina, 20, 5);

            const frequencia = aluno.calcularFrequencia(disciplina);
            expect(frequencia).toBe(75);
        });
    });
});