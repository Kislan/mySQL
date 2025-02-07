import { Aluno } from "./Aluno.js";
import { Disciplina } from "./Disciplina.js";
import { Nota } from "./Nota.js";

export class Professor {
    private _nome: string;
    private _email: string;
    private _nome_usuario: string;
    private _senha: string;

    constructor(nome: string, email: string, nome_usuario: string, senha: string) {
        this._nome = nome;
        this._email = email;
        this._nome_usuario = nome_usuario;
        this._senha = senha;
    }

    get nome() {
        return this._nome;
    }

    get email() {
        return this._email;
    }

    get nome_usuario() {
        return this._nome_usuario;
    }

    get senha() {
        return this._senha;
    }

    // Registrar nota do aluno
    registrarNota(aluno: Aluno, disciplina: Disciplina, tipoAvaliacao: string, notaAluno: number, bimestre: number): void {
        if (!aluno || !disciplina) {
            throw new Error("Aluno ou disciplina inválidos.");
        }
        
        if (notaAluno < 0 || notaAluno > 100) {
            throw new Error("Nota inválida! A nota deve ser entre 0 e 100.");
        }

        let nota = new Nota(notaAluno, disciplina, aluno, tipoAvaliacao, bimestre);
        aluno.adicionarNota(nota);
        console.log(`Nota de ${nota.valorNota} registrada para ${aluno.nome} do bimestre ${nota.bimestre} na disciplina ${disciplina.nome}`);
    }

    // Registrar frequência do aluno
    registrarAulasEFaltas(aluno: Aluno, disciplina: Disciplina, aulasDadas: number, faltas: number): void {
        if (!aluno || !disciplina) {
            throw new Error("Aluno ou disciplina inválidos.");
        }

        if (aulasDadas < 0 || faltas < 0 || aulasDadas > disciplina.quantidadeAulas) {
            throw new Error("Valores inválidos! As aulas dadas não podem ser negativas ou superiores à carga horária da disciplina.");
        }

        aluno.registrarAulasEFaltas(disciplina, aulasDadas, faltas);
        console.log(`Aulas dadas: ${aulasDadas}, Faltas: ${faltas} registradas para o aluno ${aluno.nome} na disciplina ${disciplina.nome}.`);
    }

    // Gerar relatório de aluno
    gerarRelatorio(aluno: Aluno, disciplina: Disciplina): void {
        if (!aluno || !disciplina) {
            throw new Error("Aluno ou disciplina inválidos.");
        }

        console.log(`Notas do aluno ${aluno.nome} na disciplina ${disciplina.nome}`);
        console.log(`Nota 1° Bimestre: ${aluno.Nota_bimestre(disciplina.nome, 1)}`);
        console.log(`Nota 2° Bimestre: ${aluno.Nota_bimestre(disciplina.nome, 2)}`);
        console.log(`Nota 3° Bimestre: ${aluno.Nota_bimestre(disciplina.nome, 3)}`);
        console.log(`Nota 4° Bimestre: ${aluno.Nota_bimestre(disciplina.nome, 4)}`);
    }
}