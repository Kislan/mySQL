import { Turma } from "./Turma";
import { Nota } from "./Nota";
import { Disciplina } from "./Disciplina";
export declare class Aluno {
    private _nome;
    private _data_nascimento;
    private _endereco;
    private _email;
    protected _turma: Turma;
    private _Usuario;
    private _senha;
    protected _notas: Nota[];
    private _aulasEFaltas;
    constructor(nome: string, dataNascimento: string, endereco: string, email: string, turma: Turma, usuario: string, senha: string);
    registrarAulasEFaltas(disciplina: Disciplina, aulasDadas: number, faltas: number): void;
    toJSON(): void;
    adicionarNota(nota: Nota): void;
    Nota_bimestre(disci: string, bi: number): number | string;
    calcularMediaFinal(disciplina: Disciplina): number;
    calcularFrequencia(disciplina: Disciplina): number;
    get nome(): string;
    get nome_usuario(): string;
    get senha(): string;
    get dataNascimento(): string;
    get endereco(): string;
    get email(): string;
    get turma(): Turma;
    get notas(): Nota[];
}
