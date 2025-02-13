export class Nota {
    //propriedades
    _valorNota;
    _disciplina;
    _aluno;
    _tipoAvaliacao;
    _bimestre;
    constructor(valorNota, disciplina, aluno, tipoAvaliacao, bimestre) {
        this._valorNota = valorNota;
        this._disciplina = disciplina;
        this._aluno = aluno;
        this._tipoAvaliacao = tipoAvaliacao;
        this._bimestre = bimestre;
    }
    atribuirNota(valor) {
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
    }
    // Método para calcular a média, caso necessário para a disciplina
    calcularMedia() {
        return this._valorNota;
    }
    get valorNota() {
        return this._valorNota;
    }
    get disciplina() {
        return this._disciplina;
    }
    get aluno() {
        return this._aluno;
    }
    get tipoAvaliacao() {
        return this._tipoAvaliacao;
    }
    get bimestre() {
        return this._bimestre;
    }
}
