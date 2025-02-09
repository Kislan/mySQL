import { Aluno } from "./Aluno.js";
import { Disciplina } from "./Disciplina.js";
export declare class Professor {
    private _nome;
    private _email;
    private _nome_usuario;
    private _senha;
    constructor(nome: string, email: string, nome_usuario: string, senha: string);
    get nome(): string;
    get email(): string;
    get nome_usuario(): string;
    get senha(): string;
    registrarNota(aluno: Aluno, disciplina: Disciplina, tipoAvaliacao: string, notaAluno: number, bimestre: number): void;
    registrarAulasEFaltas(aluno: Aluno, disciplina: Disciplina, aulasDadas: number, faltas: number): void;
    gerarRelatorio(aluno: Aluno, disciplina: Disciplina): void;
}
