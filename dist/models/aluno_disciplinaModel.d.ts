import mysql from 'mysql2/promise';
export declare function getAluno_disciplina(): Promise<mysql.QueryResult>;
export declare function criarAluno_disciplina(aluno_id: number, disciplina_id: number): Promise<{
    insertId: number;
}>;
