import { Disciplina } from "../src/Disciplina";
import { Professor } from "../src/Professor";

describe("Disciplina", () => {
    let professor: Professor;
    let disciplina: Disciplina;

    beforeEach(() => {
        professor = new Professor("Carlos Silva", "carlos@email.com", "carlos321", "1234");
        disciplina = new Disciplina("Matemática", 60, professor);
    });

    test("Deve criar uma disciplina com nome, quantidade de aulas e professor responsável", () => {
        expect(disciplina.nome).toBe("Matemática");
        expect(disciplina.quantidadeAulas).toBe(60);
        expect(disciplina.professorResponsavel).toBe(professor);
    });

    test("Deve retornar corretamente o nome da disciplina", () => {
        expect(disciplina.nome).toBe("Matemática");
    });

    test("Deve retornar corretamente a quantidade de aulas", () => {
        expect(disciplina.quantidadeAulas).toBe(60);
    });

    test("Deve retornar corretamente o professor responsável", () => {
        expect(disciplina.professorResponsavel.nome).toBe("Carlos Silva");
        expect(disciplina.professorResponsavel.email).toBe("carlos@email.com");
    });
});
