import { Aluno } from "./Aluno.js";
import { Disciplina } from "./Disciplina.js";
export class Turma {
    constructor(nome, anoLetivo, turno) {
        this._disciplinas = [];
        this._alunos = [];
        this._ano_letivo = anoLetivo;
        this._nome = nome;
        this._turno = turno;
    }
    adicionarDisciplina(disciplina) {
        // Verifica se a disciplina já existe na turma
        if (this._disciplinas.some(d => d.nome === disciplina.nome)) {
            throw new Error(`Disciplina ${disciplina.nome} já foi adicionada à turma.`);
        }
        if (!disciplina || !(disciplina instanceof Disciplina)) {
            throw new Error("Disciplina fornecida é inválida.");
        }
        this._disciplinas.push(disciplina);
    }
    adicionarAluno(aluno) {
        // Verifica se o aluno já existe na turma
        if (this._alunos.some(a => a.nome === aluno.nome && a.email === aluno.email)) {
            throw new Error(`Aluno ${aluno.nome} já foi adicionado à turma.`);
        }
        if (!aluno || !(aluno instanceof Aluno)) {
            throw new Error("Aluno fornecido é inválido.");
        }
        this._alunos.push(aluno);
    }
    // Matricular aluno na disciplina.
    matricularAlunoNaDisciplina(aluno, disciplina) {
        if (this._alunos.includes(aluno)) {
            console.log(`${aluno.nome} matriculado na disciplina ${disciplina.nome}`);
        }
        else {
            console.log(`Aluno ${aluno.nome} não está na turma.`);
        }
    }
    toJSON() {
        return {
            _nome: this._nome,
            _ano_letivo: this._ano_letivo,
            _turno: this._turno,
            _disciplinas: this._disciplinas.map(disciplina => ({
                _nome: disciplina.nome,
                _quantidade_aulas: disciplina.quantidadeAulas,
                _professorResponsavel: disciplina.professorResponsavel
            }))
        };
    }
    get nome() {
        return this._nome;
    }
    get ano_letivo() {
        return this._ano_letivo;
    }
    get turno() {
        return this._turno;
    }
    get disciplinas() {
        return this._disciplinas;
    }
    get alunos() {
        return this._alunos;
    }
}
