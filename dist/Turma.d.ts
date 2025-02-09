import { Aluno } from "./Aluno.js";
import { Disciplina } from "./Disciplina.js";
export declare class Turma {
    private _nome;
    private _ano_letivo;
    private _turno;
    protected _disciplinas: Disciplina[];
    protected _alunos: Aluno[];
    constructor(nome: string, anoLetivo: number, turno: string);
    adicionarDisciplina(disciplina: Disciplina): void;
    adicionarAluno(aluno: Aluno): void;
    matricularAlunoNaDisciplina(aluno: Aluno, disciplina: Disciplina): void;
    toJSON(): {
        _nome: string;
        _ano_letivo: number;
        _turno: string;
        _disciplinas: {
            _nome: string;
            _quantidade_aulas: number;
            _professorResponsavel: import("./Professor.js").Professor;
        }[];
    };
    get nome(): string;
    get ano_letivo(): number;
    get turno(): string;
    get disciplinas(): Disciplina[];
    get alunos(): Aluno[];
}
