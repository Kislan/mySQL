import { Aluno } from "../dist/Aluno.js";
import { Disciplina } from "../dist/Disciplina.js";
import { Professor } from "../dist/Professor.js";
import { Turma } from "../dist/Turma.js";
import { Nota } from "../dist/Nota.js";

// Função para tratar possíveis erros ao acessar o aluno logado no localStorage
function getAlunoLogado() {
    try {
        const aluno = JSON.parse(localStorage.getItem('alunoLogado'));
        if (!aluno) {
            throw new Error('Aluno não encontrado no localStorage');
        }
        return aluno;
    } catch (error) {
        console.error("Erro ao obter o aluno logado:", error);
        alert("Ocorreu um erro ao carregar os dados do aluno.");
        return null;
    }
}

// Função para exibir o boletim
function exibirBoletim() {
    const aluno = getAlunoLogado();
    if (!aluno) return;

    let turma_aluno;
    try {
        turma_aluno = new Turma(aluno._turma._nome, aluno._turma._ano_letivo, aluno._turma._turno);
    } catch (error) {
        console.error("Erro ao criar a turma:", error);
        alert("Erro ao carregar a turma.");
        return;
    }

    const disciplinas_aluno = aluno._turma._disciplinas.map(disciplina => {
        try {
            const professor = new Professor(
                disciplina._professorResponsavel._nome,
                disciplina._professorResponsavel._email,
                disciplina._professorResponsavel._nome_usuario,
                disciplina._professorResponsavel._senha
            );
    
            const novaDisciplina = new Disciplina(
                disciplina._nome,
                disciplina._quantidade_aulas,
                professor
            );
    
            turma_aluno.adicionarDisciplina(novaDisciplina);
            return novaDisciplina;
        } catch (error) {
            console.error(`Erro ao criar a disciplina ${disciplina._nome}:`, error);
        }
    });

    let aluno_recriado;
    try {
        aluno_recriado = new Aluno(
            aluno._nome,
            aluno._data_nascimento,
            aluno._endereco,
            aluno._email,
            turma_aluno,
            aluno._Usuario,
            aluno._senha
        );
        turma_aluno.adicionarAluno(aluno_recriado);
    } catch (error) {
        console.error("Erro ao criar o aluno:", error);
        alert("Erro ao carregar os dados do aluno.");
        return;
    }

    disciplinas_aluno.forEach(disciplina => {
        try {
            turma_aluno.matricularAlunoNaDisciplina(aluno_recriado, disciplina);
        } catch (error) {
            console.error(`Erro ao matricular aluno na disciplina ${disciplina._nome}:`, error);
        }
    });

    // Variáveis para armazenar as aulas e faltas
    let aulasDadasExistentes = 0;
    let faltasExistentes = 0;

    // Verifica se o aluno já tem dados de aulas e faltas registrados
    try {
        if (Object.keys(aluno._aulasEFaltas).length > 0) {
            turma_aluno._disciplinas.forEach(disciplina => {
                if (aluno._aulasEFaltas[disciplina._nome]) {
                    const dadosAntigos = aluno._aulasEFaltas[disciplina._nome];
                    aulasDadasExistentes = dadosAntigos.aulasDadas || 0;
                    faltasExistentes = dadosAntigos.faltas || 0;

                    aluno_recriado.registrarAulasEFaltas(disciplina, aulasDadasExistentes, faltasExistentes);
                    console.log(`Atualizando - Disciplina: ${disciplina._nome}, Aulas Dadas: ${aulasDadasExistentes}, Faltas: ${faltasExistentes}`);
                }
            });
        }
    } catch (error) {
        console.error("Erro ao processar as aulas e faltas do aluno:", error);
    }

    // Processamento das notas
    try {
        if (aluno._notas.length > 0) {
            aluno._notas.forEach(nota => {
                let tipoavaliação = nota._tipoAvaliacao;
                let valor = nota._valorNota;
                let bimestre = nota._bimestre;
                let disci_nota = '';
    
                turma_aluno._disciplinas.forEach(d => {
                    if (d._nome === nota._disciplina._nome) {
                        disci_nota = d;
                    }
                });
    
                let nota_nova = new Nota(valor, disci_nota, aluno_recriado, tipoavaliação, bimestre);
                aluno_recriado.adicionarNota(nota_nova);
            });
        }
    } catch (error) {
        console.error("Erro ao processar as notas do aluno:", error);
    }

    // Construção do boletim
    try {
        let boletimDiv = document.getElementById("boletim_grade");
        boletimDiv.innerHTML = '';
        let boletimHtml = ` `;

        // Criando a tabela para o boletim
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
                    </tr>
                </thead>
                <tbody>`;

        // Itera sobre as disciplinas para exibir suas informações
        aluno_recriado._turma._disciplinas.forEach(disciplina => {
            let nota1 = aluno_recriado.Nota_bimestre(disciplina.nome, 1);
            let nota2 = aluno_recriado.Nota_bimestre(disciplina.nome, 2);
            let nota3 = aluno_recriado.Nota_bimestre(disciplina.nome, 3);
            let nota4 = aluno_recriado.Nota_bimestre(disciplina.nome, 4);
            let frequencia = aluno_recriado.calcularFrequencia(disciplina);
            if (frequencia === -1) {
                frequencia = "-";
            }

            let aulas_totais = '-';
            let faltas_totais = '-';

            // Verifique se o aluno tem registros de faltas para a disciplina
            if (aluno._aulasEFaltas[disciplina._nome]) {
                faltas_totais = aluno._aulasEFaltas[disciplina._nome].faltas || 0;
                aulas_totais = aluno._aulasEFaltas[disciplina._nome].aulasDadas || 0;
            }

            let media_final = '-';
            if (aluno_recriado.calcularMediaFinal(disciplina) == -1) {
                media_final = '-';
            } else if (aluno_recriado.calcularMediaFinal(disciplina) > 0) {
                media_final = aluno_recriado.calcularMediaFinal(disciplina);
            }

            // Adicionando a linha da disciplina na tabela
            boletimHtml += `
                <tr>
                    <td>${disciplina._nome}</td>
                    <td>${aulas_totais}</td>
                    <td>${faltas_totais}</td>
                    <td>${frequencia}</td>
                    <td>${nota1}</td>
                    <td>${nota2}</td>
                    <td>${nota3}</td>
                    <td>${nota4}</td>
                    <td>${media_final}</td>
                </tr>`;
        });

        boletimHtml += `
                </tbody>
            </table>`;

        // Adicionando o conteúdo da tabela à div
        boletimDiv.innerHTML = boletimHtml;

        console.log(aluno_recriado);
    } catch (error) {
        console.error("Erro ao gerar o boletim:", error);
        alert("Ocorreu um erro ao gerar o boletim.");
    }
}

// Chama a função para exibir o boletim ao carregar a página
exibirBoletim();
