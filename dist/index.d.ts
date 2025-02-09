export declare function inserirTurma(nome: string, ano: number, turno: string): Promise<any>;
export declare function inserirProfessor(nome: string, email: string, nome_usuario: string, senha: string): Promise<any>;
export declare function inserirDisciplina(nome: string, carga_horaria: number, professor_id: number): Promise<any>;
export declare function inserirTurmaDisciplina(turma_id: number, disciplina_id: number): Promise<any>;
