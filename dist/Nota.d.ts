import { Disciplina } from "./Disciplina.js";
import { Aluno } from "./Aluno.js";
export declare class Nota {
    private _valorNota;
    private _disciplina;
    private _aluno;
    private _tipoAvaliacao;
    private _bimestre;
    constructor(valorNota: number, disciplina: Disciplina, aluno: Aluno, tipoAvaliacao: string, bimestre: number);
    atribuirNota(valor: number): void;
    calcularMedia(): number;
    get valorNota(): number;
    get disciplina(): Disciplina;
    get aluno(): Aluno;
    get tipoAvaliacao(): string;
    get bimestre(): number;
}
