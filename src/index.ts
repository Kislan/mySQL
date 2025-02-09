import pool from './config/database.js'; 

export async function inserirTurma(nome: string, ano: number, turno: string) {
  const query = 'INSERT INTO turma (nome, ano_letivo, turno) VALUES (?, ?, ?)';
  try {
    const [result] = await pool.execute(query, [nome, ano, turno]);
    return result.insertId; // Agora, retornamos o ID gerado
  } catch (error) {
    console.error('Erro ao inserir turma:', error);
    throw error;
  }
}

export async function inserirProfessor(nome: string, email: string, nome_usuario: string, senha: string) {
  const query = 'INSERT INTO professor (nome, email, nome_usuario, senha) VALUES (?, ?, ?, ?)';
  try {
    const [result] = await pool.execute(query, [nome, email, nome_usuario, senha]);
    return result.insertId; // Retorna o ID do professor inserido
  } catch (error) {
    console.error('Erro ao inserir professor:', error);
    throw error;
  }
}

export async function inserirDisciplina(nome: string, carga_horaria: number, professor_id: number) {
  const query = 'INSERT INTO disciplina (nome, quantidade_aulas, professor_id) VALUES (?, ?, ?)';
  try {
    const [result] = await pool.execute(query, [nome, carga_horaria, professor_id]);
    return result.insertId; // Retorna o ID da disciplina inserida
  } catch (error) {
    console.error('Erro ao inserir disciplina:', error);
    throw error;
  }
}

export async function inserirTurmaDisciplina(turma_id: number, disciplina_id: number) {
  const query = 'INSERT INTO turma_disciplina (turma_id, disciplina_id) VALUES (?, ?)';
  try {
    const [result] = await pool.execute(query, [turma_id, disciplina_id]);
    return result.insertId; // Retorna o resultado da inserção na tabela de relacionamento
  } catch (error) {
    console.error('Erro ao inserir turma-disciplina:', error);
    throw error;
  }
}
