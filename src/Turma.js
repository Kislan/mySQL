"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Turma = void 0;
var Aluno_js_1 = require("./Aluno.js");
var Disciplina_js_1 = require("./Disciplina.js");
var Turma = /** @class */ (function () {
    function Turma(nome, anoLetivo, turno) {
        this._disciplinas = [];
        this._alunos = [];
        this._ano_letivo = anoLetivo;
        this._nome = nome;
        this._turno = turno;
    }
    Turma.prototype.adicionarDisciplina = function (disciplina) {
        // Verifica se a disciplina já existe na turma
        if (this._disciplinas.some(function (d) { return d.nome === disciplina.nome; })) {
            throw new Error("Disciplina ".concat(disciplina.nome, " j\u00E1 foi adicionada \u00E0 turma."));
        }
        if (!disciplina || !(disciplina instanceof Disciplina_js_1.Disciplina)) {
            throw new Error("Disciplina fornecida é inválida.");
        }
        this._disciplinas.push(disciplina);
    };
    Turma.prototype.adicionarAluno = function (aluno) {
        // Verifica se o aluno já existe na turma
        if (this._alunos.some(function (a) { return a.nome === aluno.nome && a.email === aluno.email; })) {
            throw new Error("Aluno ".concat(aluno.nome, " j\u00E1 foi adicionado \u00E0 turma."));
        }
        if (!aluno || !(aluno instanceof Aluno_js_1.Aluno)) {
            throw new Error("Aluno fornecido é inválido.");
        }
        this._alunos.push(aluno);
    };
    // Matricular aluno na disciplina.
    Turma.prototype.matricularAlunoNaDisciplina = function (aluno, disciplina) {
        if (this._alunos.includes(aluno)) {
            console.log("".concat(aluno.nome, " matriculado na disciplina ").concat(disciplina.nome));
        }
        else {
            console.log("Aluno ".concat(aluno.nome, " n\u00E3o est\u00E1 na turma."));
        }
    };
    Turma.prototype.toJSON = function () {
        return {
            _nome: this._nome,
            _ano_letivo: this._ano_letivo,
            _turno: this._turno,
            _disciplinas: this._disciplinas.map(function (disciplina) { return ({
                _nome: disciplina.nome,
                _quantidade_aulas: disciplina.quantidadeAulas,
                _professorResponsavel: disciplina.professorResponsavel
            }); })
        };
    };
    Object.defineProperty(Turma.prototype, "nome", {
        get: function () {
            return this._nome;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Turma.prototype, "ano_letivo", {
        get: function () {
            return this._ano_letivo;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Turma.prototype, "turno", {
        get: function () {
            return this._turno;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Turma.prototype, "disciplinas", {
        get: function () {
            return this._disciplinas;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Turma.prototype, "alunos", {
        get: function () {
            return this._alunos;
        },
        enumerable: false,
        configurable: true
    });
    return Turma;
}());
exports.Turma = Turma;
