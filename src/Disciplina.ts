import { Professor } from "./Professor";
export class Disciplina{
    private _nome:string;
    private _quantidade_aulas:number;
    private _professorResponsavel:Professor;

    constructor(nome:string, carga:number, professor:Professor){
        this._nome= nome;
        this._quantidade_aulas= carga;
        this._professorResponsavel= professor;

    }
    
    get nome () {
        return this._nome
    }

    get quantidadeAulas(): number {
        return this._quantidade_aulas;
    }

    get professorResponsavel(): Professor {
        return this._professorResponsavel;
    }
}