"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Nota = void 0;
var Nota = /** @class */ (function () {
    function Nota(valorNota, disciplina, aluno, tipoAvaliacao, bimestre) {
        this._valorNota = valorNota;
        this._disciplina = disciplina;
        this._aluno = aluno;
        this._tipoAvaliacao = tipoAvaliacao;
        this._bimestre = bimestre;
    }
    Nota.prototype.atribuirNota = function (valor) {
        try {
            if (valor < 0 || valor > 100) {
                throw new Error("Nota inválida. A nota deve estar entre 0 e 100.");
            }
            this._valorNota = valor;
        }
        catch (error) {
            if (error instanceof Error) {
                // Log do erro ou tratamento alternativo, sem interromper o sistema
                console.error(error.message);
            }
            else {
                // Caso seja um erro desconhecido
                console.error("Erro desconhecido ao atribuir nota:", error);
            }
        }
    };
    // Método para calcular a média, caso necessário para a disciplina
    Nota.prototype.calcularMedia = function () {
        return this._valorNota;
    };
    Object.defineProperty(Nota.prototype, "valorNota", {
        get: function () {
            return this._valorNota;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Nota.prototype, "disciplina", {
        get: function () {
            return this._disciplina;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Nota.prototype, "aluno", {
        get: function () {
            return this._aluno;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Nota.prototype, "tipoAvaliacao", {
        get: function () {
            return this._tipoAvaliacao;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Nota.prototype, "bimestre", {
        get: function () {
            return this._bimestre;
        },
        enumerable: false,
        configurable: true
    });
    return Nota;
}());
exports.Nota = Nota;
