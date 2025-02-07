import { Disciplina } from "./Disciplina.js";
import { Aluno } from "./Aluno.js";

export class Nota {
    //propriedades
    private _valorNota: number;
    private _disciplina: Disciplina;
    private _aluno: Aluno;
    private _tipoAvaliacao: string;
    private _bimestre:number

    constructor(valorNota: number, disciplina: Disciplina, aluno: Aluno, tipoAvaliacao: string, bimestre:number) {
        this._valorNota = valorNota;
        this._disciplina = disciplina;
        this._aluno = aluno;
        this._tipoAvaliacao = tipoAvaliacao;
        this._bimestre=bimestre
    }

    atribuirNota(valor: number): void {
        try {
            if (valor < 0 || valor > 100) {
                throw new Error("Nota inválida. A nota deve estar entre 0 e 100.");
            }
            this._valorNota = valor;
        } catch (error) {
            if (error instanceof Error) {
                // Log do erro ou tratamento alternativo, sem interromper o sistema
                console.error(error.message);
            } else {
                // Caso seja um erro desconhecido
                console.error("Erro desconhecido ao atribuir nota:", error);
            }
        }
    }


    // Método para calcular a média, caso necessário para a disciplina
    calcularMedia(): number {
        return this._valorNota;
    }

    get valorNota(): number {
        return this._valorNota;
    }

    get disciplina(): Disciplina {
        return this._disciplina;
    }

    get aluno(): Aluno {
        return this._aluno;
    }

    get tipoAvaliacao() {
        return this._tipoAvaliacao;
    }

    get bimestre(){
        return this._bimestre
    }
}