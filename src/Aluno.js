"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Aluno = void 0;
var Aluno = /** @class */ (function () {
    function Aluno(nome, dataNascimento, endereco, email, turma, usuario, senha) {
        this._notas = [];
        this._aulasEFaltas = new Map();
        this._nome = nome;
        this._data_nascimento = dataNascimento;
        this._endereco = endereco;
        this._email = email;
        this._turma = turma;
        this._Usuario = usuario;
        this._senha = senha;
    }
    // Método para registrar aulas e faltas
    Aluno.prototype.registrarAulasEFaltas = function (disciplina, aulasDadas, faltas) {
        var key = disciplina.nome;
        if (!this._aulasEFaltas.has(key)) {
            this._aulasEFaltas.set(key, { aulasDadas: 0, faltas: 0 });
        }
        var dados = this._aulasEFaltas.get(key);
        if (dados) {
            dados.aulasDadas += aulasDadas;
            dados.faltas += faltas;
        }
    };
    // Método toJSON para personalizar a serialização do aluno
    Aluno.prototype.toJSON = function () {
        return __assign(__assign({}, this), { _aulasEFaltas: Array.from(this._aulasEFaltas.entries()).reduce(function (obj, _a) {
                var key = _a[0], value = _a[1];
                obj[key] = value;
                return obj;
            }, {}), _turma: this._turma.toJSON() // Converte a turma de maneira similar, se necessário
         });
    };
    // Método para adicionar notas ao aluno
    Aluno.prototype.adicionarNota = function (nota) {
        var notasDaDisciplina = this._notas.filter(function (n) { return n.disciplina.nome === nota.disciplina.nome && n.bimestre === nota.bimestre; });
        // Calcula a soma das notas já adicionadas à disciplina
        var somaNotas = notasDaDisciplina.reduce(function (acc, n) { return acc + n.valorNota; }, 0);
        if (nota.valorNota > 100) {
            console.log("Erro: A nota individual n\u00E3o pode ser maior que 100. Nota n\u00E3o registrada");
            alert("Erro: A nota individual n\u00E3o pode ser maior que 100. Nota n\u00E3o registrada");
            return;
        }
        // Verifica se a soma das notas não ultrapassa 100
        if (somaNotas + nota.valorNota > 100) {
            console.log("Erro: A soma das notas da disciplina ".concat(nota.disciplina.nome, " n\u00E3o pode ultrapassar 100."));
            alert("Erro: A soma das notas da disciplina n\u00E3o pode ultrapassar 100.");
            return;
        }
        else {
            // Adiciona a nova nota
            this._notas.push(nota);
        }
    };
    Aluno.prototype.Nota_bimestre = function (disci, bi) {
        var notasDaDisciplina = this._notas.filter(function (n) { return n.disciplina.nome === disci; });
        var notas_por_bimestre = notasDaDisciplina.filter(function (n) { return n.bimestre == bi; });
        // Calcula a soma das notas já adicionadas à disciplina
        var somaNotas = notas_por_bimestre.reduce(function (acc, n) { return acc + n.valorNota; }, 0);
        // Verifica se não encontrou notas
        if (notas_por_bimestre.length === 0) {
            return '-';
        }
        return somaNotas;
    };
    Aluno.prototype.calcularMediaFinal = function (disciplina) {
        // Filtra as notas que pertencem à disciplina especificada
        var notasDaDisciplina = this._notas.filter(function (nota) { return nota.disciplina.nome === disciplina.nome; });
        // Se não houver notas para essa disciplina, retornamos um valor especial (por exemplo, -1)
        if (notasDaDisciplina.length === 0) {
            console.log("Nenhuma nota registrada para a disciplina ".concat(disciplina.nome));
            return -1; // Pode retornar -1 ou algum outro valor indicando que não há notas para a disciplina
        }
        // Calcula a soma das notas
        var somaNotas = 0;
        notasDaDisciplina.forEach(function (nota) {
            somaNotas += nota.valorNota;
        });
        if (somaNotas === 0) {
            console.log("Todas as notas para a disciplina ".concat(disciplina.nome, " s\u00E3o zero."));
            return 0; // Retorna 0, pois a média das notas é zero
        }
        // Calcula a média das notas
        var media = somaNotas / 4;
        return media; // Retorna a média final
    };
    // Método para calcular a frequência
    Aluno.prototype.calcularFrequencia = function (disciplina) {
        var key = disciplina.nome;
        if (this._aulasEFaltas.has(key)) {
            var _a = this._aulasEFaltas.get(key) || { aulasDadas: 0, faltas: 0 }, aulasDadas = _a.aulasDadas, faltas = _a.faltas;
            if (aulasDadas === 0)
                return -1; // Retorna -1 para indicar que não houve aulas dadas
            return parseFloat((((aulasDadas - faltas) * 100) / aulasDadas).toFixed(2)); // Cálculo da frequência
        }
        return -1; // Retorna -1 caso o aluno não tenha registros de frequência
    };
    Object.defineProperty(Aluno.prototype, "nome", {
        get: function () {
            return this._nome;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Aluno.prototype, "nome_usuario", {
        get: function () {
            return this._Usuario;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Aluno.prototype, "senha", {
        get: function () {
            return this._senha;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Aluno.prototype, "dataNascimento", {
        get: function () {
            return this._data_nascimento;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Aluno.prototype, "endereco", {
        get: function () {
            return this._endereco;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Aluno.prototype, "email", {
        get: function () {
            return this._email;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Aluno.prototype, "turma", {
        get: function () {
            return this._turma;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Aluno.prototype, "notas", {
        get: function () {
            return this._notas;
        },
        enumerable: false,
        configurable: true
    });
    return Aluno;
}());
exports.Aluno = Aluno;
