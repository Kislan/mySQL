// Exceções Personalizadas
class AlunoNotFoundError extends Error {
    constructor(message) {
        super(message);
        this.name = "AlunoNotFoundError";
    }
}

class DataFetchError extends Error {
    constructor(message) {
        super(message);
        this.name = "DataFetchError";
    }
}

// Definindo variáveis
let aluno_carregado;
let turma_carregada;
let disciplinas_carregadas = [];
let notas_carregadas = [];
let professores_carregados = [];
let frequencias_carregadas = [];

document.addEventListener('DOMContentLoaded', async function () {
    try {
        // Tenta pegar o nome do aluno logado do localStorage
        let aluno_nomeUsuario = JSON.parse(localStorage.getItem('alunoLogado'));
        if (aluno_nomeUsuario) {
            try {
                const response = await fetch('http://localhost:3000/api/aluno');
                if (!response.ok) {
                    throw new DataFetchError('Falha ao carregar dados dos alunos.');
                }
                const alunos = await response.json();

                let aluno = alunos.find(al => al.usuario === aluno_nomeUsuario.usuario);

                if (!aluno) {
                    throw new AlunoNotFoundError("Aluno não encontrado.");
                }

                document.getElementById('nomeAluno').textContent = aluno.nome;
                aluno_carregado = aluno;

                // Carregando disciplinas associadas
                await carregarDisciplinas();

                // Carregando frequências
                await carregarFrequencias();

                // Carregando notas
                await carregarNotas();

                exibirBoletim();

            } catch (error) {
                if (error instanceof AlunoNotFoundError) {
                    alert(error.message);
                } else if (error instanceof DataFetchError) {
                    alert(error.message);
                } else {
                    console.error("Erro inesperado:", error);
                    alert("Ocorreu um erro desconhecido. Tente novamente.");
                }
            }
        } else {
            throw new AlunoNotFoundError('Aluno não encontrado no localStorage');
        }
    } catch (error) {
        console.error("Erro ao recuperar o aluno logado:", error);
        alert("Ocorreu um erro ao carregar os dados do aluno. Por favor, tente novamente.");
    }
});

async function carregarDisciplinas() {
    try {
        const response_al = await fetch('http://localhost:3000/api/aluno_disciplina');
        const aluno_disciplina = await response_al.json();

        if (!aluno_disciplina || aluno_disciplina.length === 0) {
            alert("O aluno(a) não possui disciplinas associadas a ele(a).");
            return;
        }

        let disciplinas = aluno_disciplina
            .filter(t_d => t_d.aluno_id === aluno_carregado.id)
            .map(t_d => t_d.disciplina_id);

        const response_disciplina = await fetch('http://localhost:3000/api/disciplina');
        const disciplinaS_aluno = await response_disciplina.json();

        if (!disciplinaS_aluno || disciplinaS_aluno.length === 0) {
            alert("O aluno(a) não possui disciplinas associadas a ele(a).");
            return;
        }

        disciplinas.forEach(numero => {
            let disciplinaEncontrada = disciplinaS_aluno.find(dado => dado.id === numero);
            if (disciplinaEncontrada) {
                disciplinas_carregadas.push(disciplinaEncontrada);
            }
        });

    } catch (error) {
        console.error("Erro ao carregar disciplinas:", error);
        alert("Erro ao carregar as disciplinas.");
    }
}

async function carregarFrequencias() {
    try {
        const response_frequencia = await fetch('http://localhost:3000/api/registros_aulas');
        if (!response_frequencia.ok) {
            throw new DataFetchError('Falha ao carregar frequências.');
        }
        const freq = await response_frequencia.json();
        frequencias_carregadas = freq.filter(f => f.aluno_id === aluno_carregado.id);
    } catch (error) {
        console.error("Erro ao carregar frequências:", error);
        alert("Erro ao carregar as frequências.");
    }
}

async function carregarNotas() {
    try {
        const response_notas = await fetch('http://localhost:3000/api/nota');
        if (!response_notas.ok) {
            throw new DataFetchError('Falha ao carregar notas.');
        }
        const notas = await response_notas.json();
        for (let nota of notas){
            notas_carregadas.push(nota)
        }
    } catch (error) {
        console.error("Erro ao carregar notas:", error);
        alert("Erro ao carregar as notas.");
    }
}

function exibirBoletim() {
    try {
        let boletimDiv = document.getElementById("boletim_grade");
        boletimDiv.innerHTML = '';
        let boletimHtml = '';

        boletimHtml += `
            <table border="1" cellpadding="10" cellspacing="0" style="border-collapse: collapse; width: 100%; text-align: center;">
                <thead>
                    <tr>
                        <th>Disciplina</th>
                        <th>Total de Aulas</th>
                        <th>Faltas</th>
                        <th>Frequência (%)</th>
                        <th>1º Bimestre</th>
                        <th>2º Bimestre</th>
                        <th>3º Bimestre</th>
                        <th>4º Bimestre</th>
                        <th>Média Final</th>
                        <th>Situação</th>
                    </tr>
                </thead>
                <tbody>`;

        disciplinas_carregadas.forEach(disciplina => {
            let soma_n1 = [], soma_n2 = [], soma_n3 = [], soma_n4 = [];
            let nota1, nota2, nota3, nota4;
            let situacao = 'Cursando';

            for (let nota of notas_carregadas) {
                if (nota.disciplina_id == disciplina.id && nota.bimestre == 1 && nota.aluno_id==aluno_carregado.id) soma_n1.push(nota);
                if (nota.disciplina_id == disciplina.id && nota.bimestre == 2 && nota.aluno_id==aluno_carregado.id) soma_n2.push(nota);
                if (nota.disciplina_id == disciplina.id && nota.bimestre == 3 && nota.aluno_id==aluno_carregado.id) soma_n3.push(nota);
                if (nota.disciplina_id == disciplina.id && nota.bimestre == 4 && nota.aluno_id==aluno_carregado.id) soma_n4.push(nota);
            }

            nota1 = soma_n1.length === 0 ? '-' : soma_n1.reduce((acc, obj) => acc + parseFloat(obj.valorNota), 0);
            nota2 = soma_n2.length === 0 ? '-' : soma_n2.reduce((acc, obj) => acc + parseFloat(obj.valorNota), 0);
            nota3 = soma_n3.length === 0 ? '-' : soma_n3.reduce((acc, obj) => acc + parseFloat(obj.valorNota), 0);
            nota4 = soma_n4.length === 0 ? '-' : soma_n4.reduce((acc, obj) => acc + parseFloat(obj.valorNota), 0);

            let aulas_e_faltas = [];
            let frequencia = '-';
            let aulas_totais = '-', faltas_totais = '-';

            frequencias_carregadas.forEach(aulas_faltas => {
                if (aulas_faltas.disciplina_id === disciplina.id && aulas_faltas.aluno_id === aluno_carregado.id) {
                    aulas_e_faltas.push(aulas_faltas);
                }
            });

            if (aulas_e_faltas.length > 0) {
                aulas_totais = aulas_e_faltas.reduce((acc, obj) => acc + parseFloat(obj.aulas_dadas), 0);
                faltas_totais = aulas_e_faltas.reduce((acc, obj) => acc + parseFloat(obj.faltas), 0);
                if (aulas_totais > 0) {
                    frequencia = ((aulas_totais - faltas_totais) * 100) / aulas_totais;
                    frequencia = Number(frequencia).toFixed(2);
                }
            }

            let media_final = '-';
            if (!isNaN(nota1) && !isNaN(nota2) && !isNaN(nota3) && !isNaN(nota4)) {
                media_final = ((nota1 + nota2 + nota3 + nota4) / 4).toFixed(2);
                situacao = media_final < 60 ? "<b>Reprovado</b>" : "<b>Aprovado</b>";
            }

            boletimHtml += `
                <tr>
                    <td>${disciplina.nome}</td>
                    <td>${aulas_totais}</td>
                    <td>${faltas_totais}</td>
                    <td>${frequencia}</td>
                    <td>${nota1}</td>
                    <td>${nota2}</td>
                    <td>${nota3}</td>
                    <td>${nota4}</td>
                    <td>${media_final}</td>
                    <td>${situacao}</td>
                </tr>`;
        });

        boletimHtml += `
                </tbody>
            </table>`;
        boletimDiv.innerHTML = boletimHtml;

    } catch (error) {
        console.error("Erro ao gerar o boletim:", error);
        alert("Ocorreu um erro ao gerar o boletim.");
    }
}
