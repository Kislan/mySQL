import mysql from 'mysql2/promise';
export declare function getFrequencias(): Promise<mysql.QueryResult>;
export declare function criarFrequencia(aluno_id: number, disciplina_id: number, aulas_dadas: number, faltas: number, data_: string): Promise<{
    insertId: number;
}>;
