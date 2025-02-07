"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Professor = void 0;
var Nota_js_1 = require("./Nota.js");
var Professor = /** @class */ (function () {
    function Professor(nome, email, nome_usuario, senha) {
        this._nome = nome;
        this._email = email;
        this._nome_usuario = nome_usuario;
        this._senha = senha;
    }
    Object.defineProperty(Professor.prototype, "nome", {
        get: function () {
            return this._nome;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Professor.prototype, "email", {
        get: function () {
            return this._email;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Professor.prototype, "nome_usuario", {
        get: function () {
            return this._nome_usuario;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Professor.prototype, "senha", {
        get: function () {
            return this._senha;
        },
        enumerable: false,
        configurable: true
    });
    // Registrar nota do aluno
    Professor.prototype.registrarNota = function (aluno, disciplina, tipoAvaliacao, notaAluno, bimestre) {
        if (!aluno || !disciplina) {
            throw new Error("Aluno ou disciplina inválidos.");
        }
        if (notaAluno < 0 || notaAluno > 100) {
            throw new Error("Nota inválida! A nota deve ser entre 0 e 100.");
        }
        var nota = new Nota_js_1.Nota(notaAluno, disciplina, aluno, tipoAvaliacao, bimestre);
        aluno.adicionarNota(nota);
        console.log("Nota de ".concat(nota.valorNota, " registrada para ").concat(aluno.nome, " do bimestre ").concat(nota.bimestre, " na disciplina ").concat(disciplina.nome));
    };
    // Registrar frequência do aluno
    Professor.prototype.registrarAulasEFaltas = function (aluno, disciplina, aulasDadas, faltas) {
        if (!aluno || !disciplina) {
            throw new Error("Aluno ou disciplina inválidos.");
        }
        if (aulasDadas < 0 || faltas < 0 || aulasDadas > disciplina.quantidadeAulas) {
            throw new Error("Valores inválidos! As aulas dadas não podem ser negativas ou superiores à carga horária da disciplina.");
        }
        aluno.registrarAulasEFaltas(disciplina, aulasDadas, faltas);
        console.log("Aulas dadas: ".concat(aulasDadas, ", Faltas: ").concat(faltas, " registradas para o aluno ").concat(aluno.nome, " na disciplina ").concat(disciplina.nome, "."));
    };
    // Gerar relatório de aluno
    Professor.prototype.gerarRelatorio = function (aluno, disciplina) {
        if (!aluno || !disciplina) {
            throw new Error("Aluno ou disciplina inválidos.");
        }
        console.log("Notas do aluno ".concat(aluno.nome, " na disciplina ").concat(disciplina.nome));
        console.log("Nota 1\u00B0 Bimestre: ".concat(aluno.Nota_bimestre(disciplina.nome, 1)));
        console.log("Nota 2\u00B0 Bimestre: ".concat(aluno.Nota_bimestre(disciplina.nome, 2)));
        console.log("Nota 3\u00B0 Bimestre: ".concat(aluno.Nota_bimestre(disciplina.nome, 3)));
        console.log("Nota 4\u00B0 Bimestre: ".concat(aluno.Nota_bimestre(disciplina.nome, 4)));
    };
    return Professor;
}());
exports.Professor = Professor;
