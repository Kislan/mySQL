import mysql from 'mysql2/promise';
export declare function getNotas(): Promise<mysql.QueryResult>;
export declare function criarNota(valorNota: number, tipo_avaliacao: string, bimestre: number, aluno_id: number, disciplina_id: number): Promise<{
    insertId: number;
}>;
