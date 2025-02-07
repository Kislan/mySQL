"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Disciplina = void 0;
var Disciplina = /** @class */ (function () {
    function Disciplina(nome, carga, professor) {
        this._nome = nome;
        this._quantidade_aulas = carga;
        this._professorResponsavel = professor;
    }
    Object.defineProperty(Disciplina.prototype, "nome", {
        get: function () {
            return this._nome;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Disciplina.prototype, "quantidadeAulas", {
        get: function () {
            return this._quantidade_aulas;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Disciplina.prototype, "professorResponsavel", {
        get: function () {
            return this._professorResponsavel;
        },
        enumerable: false,
        configurable: true
    });
    return Disciplina;
}());
exports.Disciplina = Disciplina;
