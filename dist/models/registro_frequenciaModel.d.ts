import mysql from 'mysql2/promise';
export declare function getFrequencia(): Promise<mysql.QueryResult>;
export declare function criarRegistro_Frequencia(aluno_id: number, disciplina_id: number, aulas_dadas: number, faltas: string): Promise<{
    insertId: number;
}>;
