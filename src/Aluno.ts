import { Turma } from "./Turma";
import { Nota } from "./Nota";
import { Disciplina } from "./Disciplina";

export class Aluno {
    private _nome: string;
    private _data_nascimento: string;
    private _endereco: string;
    private _email: string;
    protected _turma: Turma;
    private _Usuario: string;
    private _senha: string;
    protected _notas: Nota[] = [];
    private _aulasEFaltas: Map<string, { aulasDadas: number, faltas: number }> = new Map();

    constructor(nome: string, dataNascimento: string, endereco: string, email: string, turma: Turma, usuario: string, senha: string) {
        this._nome = nome;
        this._data_nascimento = dataNascimento;
        this._endereco = endereco;
        this._email = email;
        this._turma = turma;
        this._Usuario = usuario;
        this._senha = senha;
    }

    // Método para registrar aulas e faltas
    registrarAulasEFaltas(disciplina: Disciplina, aulasDadas: number, faltas: number): void {
        const key = disciplina.nome;
        if (!this._aulasEFaltas.has(key)) {
            this._aulasEFaltas.set(key, { aulasDadas: 0, faltas: 0 });
        }

        let dados = this._aulasEFaltas.get(key);
        if (dados) {
            dados.aulasDadas += aulasDadas;
            dados.faltas += faltas;
        }
    }

    // Método toJSON para personalizar a serialização do aluno
    toJSON(): void {
        return {
            ...this,  // Copia todas as propriedades do aluno
            _aulasEFaltas: Array.from(this._aulasEFaltas.entries()).reduce<Record<string, any>>((obj, [key, value]) => {
                obj[key] = value;
                return obj;
            }, {}),  // Converte o Map para um objeto simples
            _turma: this._turma.toJSON()  // Converte a turma de maneira similar, se necessário
        };
    }
    

    // Método para adicionar notas ao aluno

    adicionarNota(nota: Nota): void {
        const notasDaDisciplina = this._notas.filter(n => n.disciplina.nome === nota.disciplina.nome && n.bimestre === nota.bimestre);
    
        // Calcula a soma das notas já adicionadas à disciplina
        const somaNotas = notasDaDisciplina.reduce((acc, n) => acc + n.valorNota, 0);
    
        if (nota.valorNota > 100) {
            console.log(`Erro: A nota individual não pode ser maior que 100. Nota não registrada`);
            alert(`Erro: A nota individual não pode ser maior que 100. Nota não registrada`);
            return;
        }
    
        // Verifica se a soma das notas não ultrapassa 100
        if (somaNotas + nota.valorNota > 100) {
            console.log(`Erro: A soma das notas da disciplina ${nota.disciplina.nome} não pode ultrapassar 100.`);
            alert(`Erro: A soma das notas da disciplina não pode ultrapassar 100.`);
            return;
        } else {
            // Adiciona a nova nota
            this._notas.push(nota);
        }
    }
    

    Nota_bimestre(disci: string,bi:number): number | string {
        const notasDaDisciplina = this._notas.filter(n => n.disciplina.nome === disci);

        const notas_por_bimestre=notasDaDisciplina.filter(n => n.bimestre==bi)
        
        // Calcula a soma das notas já adicionadas à disciplina
        const somaNotas = notas_por_bimestre.reduce((acc, n) => acc + n.valorNota, 0);
    
        // Verifica se não encontrou notas
        if (notas_por_bimestre.length === 0) {
            return '-';
        }
    
        return somaNotas;
    }
    

    calcularMediaFinal(disciplina: Disciplina): number {
        // Filtra as notas que pertencem à disciplina especificada
        const notasDaDisciplina = this._notas.filter(nota => nota.disciplina.nome === disciplina.nome);
    
        // Se não houver notas para essa disciplina, retornamos um valor especial (por exemplo, -1)
        if (notasDaDisciplina.length === 0) {
            console.log(`Nenhuma nota registrada para a disciplina ${disciplina.nome}`);
            return -1; // Pode retornar -1 ou algum outro valor indicando que não há notas para a disciplina
        }
    
        // Calcula a soma das notas
        let somaNotas = 0;
        notasDaDisciplina.forEach(nota => {
            somaNotas += nota.valorNota;
        });

        if (somaNotas === 0) {
            console.log(`Todas as notas para a disciplina ${disciplina.nome} são zero.`);
            return 0; // Retorna 0, pois a média das notas é zero
        }
    
        // Calcula a média das notas
        const media = somaNotas / 4;
    
        return media; // Retorna a média final
    }
    

    // Método para calcular a frequência
    calcularFrequencia(disciplina: Disciplina): number {
        const key = disciplina.nome;
        if (this._aulasEFaltas.has(key)) {
            let { aulasDadas, faltas } = this._aulasEFaltas.get(key) || { aulasDadas: 0, faltas: 0 };
            if (aulasDadas === 0) return -1; // Retorna -1 para indicar que não houve aulas dadas
            return parseFloat((((aulasDadas - faltas) * 100) / aulasDadas).toFixed(2)); // Cálculo da frequência
        }
        return -1; // Retorna -1 caso o aluno não tenha registros de frequência
    }

    get nome() {
        return this._nome;
    }

    get nome_usuario() {
        return this._Usuario;
    }

    get senha() {
        return this._senha;
    }

    get dataNascimento() {
        return this._data_nascimento;
    }

    get endereco() {
        return this._endereco;
    }

    get email() {
        return this._email;
    }

    get turma(): Turma {
        return this._turma;
    }

    get notas(): Nota[] {
        return this._notas;
    }
}