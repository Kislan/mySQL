const pool = require('../config/database.js');


export async function inserirTurma(nome: string, ano: number, turno: string) {
  const query = 'INSERT INTO turma (nome, ano, turno) VALUES (?, ?, ?)';
  try {
    const [result] = await pool.execute(query, [nome, ano, turno]);
    return result;
  } catch (error) {
    console.error('Erro ao inserir turma:', error);
    throw error;
  }
}

  export async function inserirProfessor(nome: string, email: string, nome_usuario: string, senha: string) {
    const query = 'INSERT INTO professor (nome, email, usuario, senha) VALUES (?, ?, ?, ?)';
    try {
      const [result] = await pool.execute(query, [nome, email, nome_usuario, senha]);
      return result;
    } catch (error) {
      console.error('Erro ao inserir professor:', error);
      throw error;
    }
  }

  export  async function inserirDisciplina(nome: string, carga_horaria: number, professor_id: number) {
    const query = 'INSERT INTO disciplina (nome, carga_horaria, professor_id) VALUES (?, ?, ?)';
    try {
      const [result] = await pool.execute(query, [nome, carga_horaria, professor_id]);
      return result;
    } catch (error) {
      console.error('Erro ao inserir disciplina:', error);
      throw error;
    }
  }
  
  export async function inserirTurmaDisciplina(turma_id: number, disciplina_id: number) {
    const query = 'INSERT INTO turma_disciplina (turma_id, disciplina_id) VALUES (?, ?)';
    try {
      const [result] = await pool.execute(query, [turma_id, disciplina_id]);
      return result;
    } catch (error) {
      console.error('Erro ao inserir turma-disciplina:', error);
      throw error;
    }
  } 