import { Professor } from "./Professor";
export declare class Disciplina {
    private _nome;
    private _quantidade_aulas;
    private _professorResponsavel;
    constructor(nome: string, carga: number, professor: Professor);
    get nome(): string;
    get quantidadeAulas(): number;
    get professorResponsavel(): Professor;
}
