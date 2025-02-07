import { Professor } from "../dist/Professor.js";
import { Aluno } from "../dist/Aluno.js";
import { Disciplina } from "../dist/Disciplina.js";
import { Turma } from "../dist/Turma.js";
import { Nota } from "../dist/Nota.js";
import { ValidationError, DatabaseError, OperationError } from './Excecoes.js';

// Verifica se o professor está logado
let ProfLogado;
try {
    ProfLogado = JSON.parse(localStorage.getItem('professorLogado'));
    if (!ProfLogado) throw new ValidationError("Professor não encontrado no localStorage.");
} catch (error) {
    console.error(error.message);
    alert("Erro ao carregar os dados do professor. Por favor, faça login novamente.");
}

// Verifica se o professor está logado e exibe seu nome
if (ProfLogado) {
    document.getElementById('nomeUsuario').textContent = ProfLogado._nome;
}

// Instancia o professor
let prof_instancia;
try {
    prof_instancia = new Professor(ProfLogado._nome, ProfLogado._email, ProfLogado._nome_usuario, ProfLogado._senha);
} catch (error) {
    console.error("Erro ao instanciar o professor:", error);
    alert("Falha ao instanciar o professor. Verifique os dados fornecidos.");
}

// Instância a disciplina
let disciplina_prof = null;
let alunos = [];
try {
    alunos = JSON.parse(localStorage.getItem('alunos')) || [];
} catch (error) {
    console.error("Erro ao carregar dados de alunos:", error);
    alert("Falha ao carregar informações dos alunos.");
}

// Encontrando a disciplina do professor
alunos.forEach(aluno => {
    aluno._turma._disciplinas.forEach(disciplina => {
        if (disciplina._professorResponsavel._nome === ProfLogado._nome) {
            disciplina_prof = new Disciplina(disciplina._nome, disciplina._quantidade_aulas, prof_instancia);
        }
    });
});

// Lista para armazenar as turmas que o professor é responsável
let turmasResponsaveis = [];

try {
    // Percorre os alunos e verifica as turmas em que o professor é responsável
    alunos.forEach(aluno => {
        aluno._turma._disciplinas.forEach(disciplina => {
            if (disciplina._professorResponsavel._nome === ProfLogado._nome) {
                if (!turmasResponsaveis.includes(aluno._turma._nome)) {
                    turmasResponsaveis.push(aluno._turma._nome);
                }
            }
        });
    });
} catch (error) {
    console.error("Erro ao processar turmas do professor:", error);
    alert("Falha ao processar as turmas do professor.");
}

// Exibe as turmas e suas respectivas opções no menu
try {
    if (turmasResponsaveis.length > 0) {
        const menuTurmas = document.getElementById('menuTurmas');
        turmasResponsaveis.forEach(turma => {
            const turmaLink = document.createElement('div');
            turmaLink.innerHTML = `
                <a href="javascript:void(0)" onclick="registrarFrequencia('${turma}')">${turma}</a>
                <div>
                    <a href="javascript:void(0)" class="registrar-notas" data-turma="${turma}">Boletins</a>
                    <a href="javascript:void(0)" class="registrar-frequencia" data-turma="${turma}">Frequência</a>
                    <a href="javascript:void(0)" class="gerar-relatorio" data-turma="${turma}">Relatórios Acadêmicos</a>
                </div>
            `;
            menuTurmas.appendChild(turmaLink);
        });

        // Adicionando os eventos de clique para cada ação
        document.querySelectorAll('.registrar-notas').forEach(link => {
            link.addEventListener('click', (e) => registrarNotas(e.target.dataset.turma));
        });

        document.querySelectorAll('.registrar-frequencia').forEach(link => {
            link.addEventListener('click', (e) => registrarFrequencia(e.target.dataset.turma));
        });

        document.querySelectorAll('.gerar-relatorio').forEach(link => {
            link.addEventListener('click', (e) => gerarRelatorio(e.target.dataset.turma));
        });
    } else {
        alert("Não há turmas atribuídas ao professor.");
    }
} catch (error) {
    console.error("Erro ao exibir turmas no menu:", error);
    alert("Falha ao exibir as turmas atribuídas ao professor.");
}


// Função para registrar a frequência
function registrarFrequencia(turma) {
    console.log('Chamaram a função registrarFrequencia para a turma: ' + turma);

    let div_resultado = document.getElementById('resultado');
    div_resultado.innerHTML = '';
    
    const alunos_da_turma = [];
    try {
        // Filtra os alunos que pertencem à turma
        alunos.forEach(al => {
            if (al._turma._nome === turma) {
                alunos_da_turma.push(al);
            }
        });

        if (alunos_da_turma.length === 0) {
            throw new OperationError("Nenhum aluno encontrado para a turma " + turma);
        }

        let resultado = `<h2>Registre as faltas dos alunos da turma ${turma}</h2>`;
        resultado += `
            <label>Digite a quantidade de aulas:</label>
            <input type="number" id='qtaulas' min="1" required/>
            <br><br>
            <table border="1" cellpadding="10" cellspacing="0" style="border-collapse: collapse; width: 100%; text-align: center;">
            <thead>
                <tr>
                    <th>Aluno</th>
                    <th>Faltas</th>
                </tr>
            </thead>
            <tbody>`;

        alunos_da_turma.forEach(aluno => {
            const alunoNomeFormatado = aluno._nome.replace(/\s+/g, '_'); // Substitui espaços por _
            resultado += `
                <tr>
                    <td>${aluno._nome.toUpperCase()}</td>
                    <td><input type="number" name="faltas_${alunoNomeFormatado}" min="0" max="100" required /></td>
                </tr>`;
        });

        resultado += `
            </tbody>
            </table>
            <br>
            <button id="btnSalvarFrequencia">Salvar</button>
        `;
        
        div_resultado.innerHTML = resultado;

        // Adiciona o evento de clique ao botão
        document.getElementById('btnSalvarFrequencia').addEventListener('click', function() {
            salvarFrequencia(turma);
        });

    } catch (error) {
        console.error(error.message);
        alert("Ocorreu um erro ao registrar a frequência. " + error.message);
    }
}


// Função para salvar a frequência
function salvarFrequencia(turma) {
    try {
        console.log('Salvando a frequência para a turma: ' + turma);

        const alunos_da_turma_atualizados = [];
        const quantidadeAulas = parseInt(document.getElementById('qtaulas').value);

        // Verificação da quantidade de aulas
        if (isNaN(quantidadeAulas) || quantidadeAulas <= 0) {
            throw new ValidationError("A quantidade de aulas deve ser um número válido maior que 0.");
        }

        // Buscando alunos do localStorage (ou outra fonte de dados persistente)
        const alunos = JSON.parse(localStorage.getItem('alunos')) || [];

        if (!alunos) {
            throw new DatabaseError("Falha ao recuperar dados de alunos do armazenamento local.");
        }

        let turminha = '';
        let aluno_recriado = null;

        alunos.forEach(aluno => {
            if (aluno._turma._nome === turma) {
                const alunoNomeFormatado = aluno._nome.replace(/\s+/g, '_');
                const faltasInput = document.querySelector(`input[name="faltas_${alunoNomeFormatado}"]`);
                const faltas = parseInt(faltasInput.value) || 0;

                // Verificando se o campo de faltas está vazio ou inválido
                if (faltasInput.value === '' || isNaN(faltas) || faltas < 0 || faltas > quantidadeAulas) {
                    throw new ValidationError("A quantidade de faltas não pode ser maior que o número de aulas ou ser negativa. Verifique os campos.");
                }

                let turma_aluno = new Turma(aluno._turma._nome, aluno._turma._ano_letivo, aluno._turma._turno);

                const disciplinas = aluno._turma._disciplinas.map(disciplina => {
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
                });

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

                disciplinas.forEach(disciplina => {
                    turma_aluno.matricularAlunoNaDisciplina(aluno_recriado, disciplina);
                });

                turminha = turma_aluno;

                let aulasDadasExistentes = 0;
                let faltasExistentes = 0;

                // Verifica se o aluno já tem dados de aulas e faltas registrados
                if (Object.keys(aluno._aulasEFaltas).length > 0) {
                    turminha._disciplinas.forEach(disciplina => {
                        if (aluno._aulasEFaltas[disciplina._nome]) {
                            const dadosAntigos = aluno._aulasEFaltas[disciplina._nome];
                            aulasDadasExistentes = dadosAntigos.aulasDadas || 0;
                            faltasExistentes = dadosAntigos.faltas || 0;

                            aluno_recriado.registrarAulasEFaltas(disciplina, aulasDadasExistentes, faltasExistentes);
                            console.log(`Atualizando - Disciplina: ${disciplina._nome}, Aulas Dadas: ${aulasDadasExistentes}, Faltas: ${faltasExistentes}`);
                        }
                    });
                }

                // Verificação de condição 1: Nova quantidade de aulas dadas não pode ser maior que o total de aulas da disciplina
                if (Object.keys(aluno._aulasEFaltas).length > 0) {
                    turminha._disciplinas.forEach(disciplina => {
                        if (aluno._aulasEFaltas[disciplina._nome]) {
                            if(disciplina._nome== disciplina_prof._nome){
                                const dadosAntigos = aluno._aulasEFaltas[disciplina._nome];
                                let aulasDadasExistentes = dadosAntigos ? dadosAntigos.aulasDadas :0;
                                if (aulasDadasExistentes + quantidadeAulas > disciplina._quantidade_aulas) {
                                    throw new ValidationError(`Não é possível adicionar mais aulas do que o total de aulas da disciplina. Carga horária: ${disciplina._quantidade_aulas}. Aulas ministradas + novas aulas: ${aulasDadasExistentes+ quantidadeAulas}`);
                                }
                            }
                        }
                    });
                }

                if (parseInt(disciplina_prof._quantidade_aulas)<parseInt(quantidadeAulas)){
                    throw new ValidationError(`Não é possível adicionar mais aulas do que o total de aulas da disciplina. Carga horária: ${disciplina_prof._quantidade_aulas}.`);
                }

                // Registrar as novas aulas e faltas
                prof_instancia.registrarAulasEFaltas(aluno_recriado, disciplina_prof, quantidadeAulas, faltas);

                alunos_da_turma_atualizados.push(aluno_recriado);
            }
        });

        alunos_da_turma_atualizados.forEach(alunoAtualizado => {
            alunos.forEach(aluno_antigo => {
                if (alunoAtualizado._nome === aluno_antigo._nome) {
                    if (aluno_antigo._notas.length > 0) {
                        aluno_antigo._notas.forEach(nota => {
                            let tipoavaliação = nota._tipoAvaliacao;
                            let valor = nota._valorNota;
                            let bimestre = nota._bimestre;
                            let disci_nota = '';

                            turminha._disciplinas.forEach(d => {
                                if (d._nome === nota._disciplina._nome) {
                                    disci_nota = d;
                                }
                            });

                            let nota_nova = new Nota(valor, disci_nota, alunoAtualizado, tipoavaliação, bimestre);
                            alunoAtualizado.adicionarNota(nota_nova);
                        });
                    }
                }
            });
        });

        // Atualiza os dados no localStorage com os alunos da turma atualizados
        alunos_da_turma_atualizados.forEach(alunoAtualizado => {
            const index = alunos.findIndex(aluno => aluno._nome === alunoAtualizado._nome);
            if (index !== -1) {
                alunos[index] = alunoAtualizado;
            }
        });

        // Usando JSON.stringify com replacer para ignorar _alunos na Turma
        const alunosLimpos = alunos.map(aluno => {
            return JSON.parse(JSON.stringify(aluno, (key, value) => {
                if (key === '_alunos' || key === '_aluno') {
                    return undefined;  // Ignora a propriedade _alunos da turma
                }
                return value;  // Retorna o valor original para outras propriedades
            }));
        });

        // Salvando no localStorage
        localStorage.setItem('alunos', JSON.stringify(alunosLimpos));

        // Verifique se os dados foram realmente atualizados
        console.log('Dados no localStorage após atualização:', localStorage.getItem('alunos'));

        alert("Frequências registradas com sucesso!");
    } catch (error) {
        // Se ocorrer algum erro, trataremos aqui
        if (error instanceof ValidationError) {
            alert("Erro de validação: " + error.message);
            console.error("Erro de validação:", error.stack);
        } else if (error instanceof DatabaseError) {
            alert("Erro no banco de dados: " + error.message);
            console.error("Erro no banco de dados:", error.stack);
        } else if (error instanceof OperationError) {
            alert("Erro na operação: " + error.message);
            console.error("Erro na operação:", error.stack);
        } else {
            // Erro desconhecido
            alert("Ocorreu um erro inesperado.");
            console.error("Erro inesperado:", error.stack);
        }
    }
}


// Função para registrar as notas
function registrarNotas(turma) {
    let div_resultado = document.getElementById('resultado');
    div_resultado.innerHTML = '';

    const alunos_da_turma = [];
    try {
        // Filtra os alunos que pertencem à turma
        alunos.forEach(al => {
            if (al._turma._nome === turma) {
                alunos_da_turma.push(al);
            }
        });

        if (alunos_da_turma.length === 0) {
            throw new OperationError("Nenhum aluno encontrado para a turma " + turma);
        }

        let resultado = `<h2>Registre as notas dos alunos da turma ${turma}</h2>`;
        resultado += `
            <table border="1" cellpadding="10" cellspacing="0" style="border-collapse: collapse; width: 100%; text-align: center;">
            <thead>
                <tr>
                    <th>Aluno</th>
                    <th>Tipo de Avaliação</th>
                    <th>Nota</th>
                    <th>Bimestre</th>
                </tr>
            </thead>
            <tbody>`;

        alunos_da_turma.forEach(aluno => {
            const alunoNomeFormatado = aluno._nome.replace(/\s+/g, '_'); // Substitui espaços por _
            resultado += `
                <tr>
                    <td>${aluno._nome.toUpperCase()}</td>
                    <td>
                        <select name="tipo_avaliacao_${alunoNomeFormatado}" required>
                            <option value="prova">Prova</option>
                            <option value="trabalho">Trabalho</option>
                            <option value="atividade">Atividade</option>
                        </select>
                    </td>
                    <td><input type="number" name="nota_${alunoNomeFormatado}" min="0" max="100" required /></td>
                    <td>
                        <select name="bimestre_${alunoNomeFormatado}" required>
                            <option value="1">1º Bimestre</option>
                            <option value="2">2º Bimestre</option>
                            <option value="3">3º Bimestre</option>
                            <option value="4">4º Bimestre</option>
                        </select>
                    </td>
                </tr>`;
        });

        resultado += `
            </tbody>
            </table>
            <br>
            <button id="btnSalvarNotas">Salvar</button>
        `;

        div_resultado.innerHTML = resultado;

        // Adiciona o evento de clique ao botão
        document.getElementById('btnSalvarNotas').addEventListener('click', function() {
            salvarNotas(turma);
        });

    } catch (error) {
        // Trata o erro e exibe uma mensagem amigável
        console.error(error.message);
        alert("Ocorreu um erro ao registrar as notas. " + error.message);
    }
}


// Função para salvar as notas
function salvarNotas(turma) {
    console.log('Salvando as notas para a turma: ' + turma);
    const alunos_da_turma_atualizados = [];
    const alunos = JSON.parse(localStorage.getItem('alunos')) || [];
    if (!alunos) {
        throw new DatabaseError("Falha ao recuperar dados de alunos do armazenamento local.");
    }
    let turminha = '';
    let aluno_recriado = null;
    let todosOsErros = false;  // Flag para verificar se algum erro ocorreu

    try {
        alunos.forEach(aluno => {
            if (aluno._turma._nome === turma) {
                const alunoNomeFormatado = aluno._nome.replace(/\s+/g, '_');

                const tipoAvaliacaoElement = document.querySelector(`select[name="tipo_avaliacao_${alunoNomeFormatado}"]`);
                const notaElement = document.querySelector(`input[name="nota_${alunoNomeFormatado}"]`);
                const bimestreElement = document.querySelector(`select[name="bimestre_${alunoNomeFormatado}"]`);

                // Verifica se os campos estão preenchidos
                if (!tipoAvaliacaoElement || !notaElement || !bimestreElement || !notaElement.value) {
                    console.error(`Erro: Campos de avaliação ou nota não preenchidos para o aluno ${aluno._nome}`);
                    alert(`Erro: Todos os campos devem ser preenchidos para o aluno ${aluno._nome}`);
                    todosOsErros = true;  // Marca que houve erro
                    return; // Interrompe o processamento do aluno atual
                }

                const tipoAvaliacao = tipoAvaliacaoElement.value;
                const nota = parseInt(notaElement.value);
                const bimestre = bimestreElement.value;

                // Verifica se a nota está dentro do intervalo válido (0-100)
                if (nota < 0 || nota > 100) {
                    console.error(`Erro: A nota para o aluno ${aluno._nome} deve estar entre 0 e 100.`);
                    alert(`Erro: A nota para o aluno ${aluno._nome} deve estar entre 0 e 100.`);
                    todosOsErros = true;  // Marca que houve erro
                    return; // Interrompe o processamento do aluno atual
                }

                // Verifica se a soma das notas do bimestre não ultrapassa 100
                let somaNotasBimestre = 0;
                aluno._notas.forEach(notaExistente => {
                    if (notaExistente._bimestre === bimestre) {
                        somaNotasBimestre += notaExistente._valorNota;
                    }
                });

                // Se a soma das notas já existentes + a nova nota ultrapassar 100, gera um erro
                if (somaNotasBimestre + nota > 100) {
                    console.error(`Erro: A soma das notas no bimestre ${bimestre} para o aluno ${aluno._nome} não pode ultrapassar 100.`);
                    alert(`Erro: A soma das notas no bimestre ${bimestre} para o aluno ${aluno._nome} não pode ultrapassar 100.`);
                    todosOsErros = true;  // Marca que houve erro
                    return; // Interrompe o processamento do aluno atual
                }

                // Se todas as validações passaram, continua o processamento
                let turma_aluno = new Turma(aluno._turma._nome, aluno._turma._ano_letivo, aluno._turma._turno);

                const disciplinas = aluno._turma._disciplinas.map(disciplina => {
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
                });

                // Recria a instância de Aluno
                aluno_recriado = new Aluno(
                    aluno._nome,
                    aluno._data_nascimento,
                    aluno._endereco,
                    aluno._email,
                    turma_aluno, // Atribuindo a turma recriada
                    aluno._Usuario,
                    aluno._senha
                );

                turma_aluno.adicionarAluno(aluno_recriado);

                // Matricula o aluno nas disciplinas da turma
                disciplinas.forEach(disciplina => {
                    turma_aluno.matricularAlunoNaDisciplina(aluno_recriado, disciplina);
                });
                turminha = turma_aluno;

                let aulasDadasExistentes = 0;
                let faltasExistentes = 0;

                // Verifica se o aluno já tem dados de aulas e faltas registrados
                if (Object.keys(aluno._aulasEFaltas).length > 0) {
                    turminha._disciplinas.forEach(disciplina => {
                        if (aluno._aulasEFaltas[disciplina._nome]) {
                            const dadosAntigos = aluno._aulasEFaltas[disciplina._nome];
                            aulasDadasExistentes = dadosAntigos.aulasDadas || 0;
                            faltasExistentes = dadosAntigos.faltas || 0;

                            aluno_recriado.registrarAulasEFaltas(disciplina, aulasDadasExistentes, faltasExistentes);
                            console.log(`Atualizando - Disciplina: ${disciplina._nome}, Aulas Dadas: ${aulasDadasExistentes}, Faltas: ${faltasExistentes}`);
                        }
                    });
                }

                prof_instancia.registrarAulasEFaltas(aluno_recriado, disciplina_prof, 0, 0);
                prof_instancia.registrarNota(aluno_recriado, disciplina_prof, tipoAvaliacao, nota, bimestre);

                alunos_da_turma_atualizados.push(aluno_recriado);
            }
        });

        if (todosOsErros) {
            return;  // Se houver erro em algum aluno, não continua com o salvamento
        }

        // Atualiza os alunos com as novas notas
        alunos_da_turma_atualizados.forEach(alunoAtualizado => {
            alunos.forEach(aluno_antigo => {
                if (alunoAtualizado._nome === aluno_antigo._nome) {
                    if (aluno_antigo._notas.length > 0) {
                        aluno_antigo._notas.forEach(nota => {
                            let tipoavaliação = nota._tipoAvaliacao;
                            let valor = nota._valorNota;
                            let bimestre = nota._bimestre;
                            let disci_nota = '';

                            turminha._disciplinas.forEach(d => {
                                if (d._nome === nota._disciplina._nome) {
                                    disci_nota = d;
                                }
                            });
                            let nota_nova = new Nota(valor, disci_nota, alunoAtualizado, tipoavaliação, bimestre);
                            alunoAtualizado.adicionarNota(nota_nova);
                        });
                    }
                }
            });
        });

        alunos_da_turma_atualizados.forEach(alunoAtualizado => {
            const index = alunos.findIndex(aluno => aluno._nome === alunoAtualizado._nome);
            if (index !== -1) {
                alunos[index] = alunoAtualizado;
            }
        });

        // Usando JSON.stringify com replacer para ignorar _alunos na Turma
        const alunosLimpos = alunos.map(aluno => {
            return JSON.parse(JSON.stringify(aluno, (key, value) => {
                if (key === '_alunos' || key === '_aluno') {
                    return undefined;  // Ignora a propriedade _alunos da turma
                }
                return value;  // Retorna o valor original para outras propriedades
            }));
        });

        // Salvando no localStorage
        localStorage.setItem('alunos', JSON.stringify(alunosLimpos));

        // Verifique se os dados foram realmente atualizados
        console.log('Dados no localStorage após atualização:', localStorage.getItem('alunos'));

        // Exibe a mensagem de sucesso apenas se tudo estiver correto
        alert("Notas registradas com sucesso!");
    } catch (error) {
        console.error('Erro inesperado:', error);
        alert('Ocorreu um erro inesperado. Por favor, tente novamente.');
    }
}



// Função para gerar o relatório de desempenho
function gerarRelatorio(turma) {
    let div_resultado = document.getElementById('resultado');
    div_resultado.innerHTML = ''; // Limpa o conteúdo da div

    let resultado = `<h2>Gere relatórios acadêmicos sobre seus alunos do ${turma}</h2>`;

    resultado += `<label for="alunoSelect">Escolha o aluno:</label>
                  <select id="alunoSelect" name="aluno" required>
                  <option value="">Selecione um aluno</option>`;

    // Adiciona as opções de alunos no select
    const alunosDaTurma = alunos.filter(aluno => aluno._turma._nome === turma);
    if (alunosDaTurma.length === 0) {
        alert("Não há alunos registrados para essa turma.");
        return;
    }

    alunosDaTurma.forEach(aluno => {
        const alunoNomeFormatado = aluno._nome.replace(/\s+/g, '_'); // Substitui espaços por _
        resultado += `<option value="${alunoNomeFormatado}">${aluno._nome}</option>`
    });

    // Fecha a tag select
    resultado += `</select>`;

    resultado += `<button id="relatorio_aluno">Gerar Relatório</button>`;
    resultado += `<div id='relatorio'></div>`;

    // Atualiza o conteúdo da div de resultado
    div_resultado.innerHTML = resultado;

    // Adiciona evento de clique ao botão "Gerar Relatório"
    document.getElementById('relatorio_aluno').addEventListener('click', function() {
        try {
            const alunoSelecionado = document.getElementById('alunoSelect').value;
            if (!alunoSelecionado) {
                alert("Por favor, selecione um aluno.");
                return;
            }

            // Chama a função que gera o relatório para o aluno selecionado
            relatorio_aluno(turma, alunoSelecionado);
        } catch (error) {
            console.error("Erro ao gerar o relatório: ", error);
            alert("Ocorreu um erro ao gerar o relatório. Tente novamente.");
        }
    });
}


function relatorio_aluno(turma) {
    let turminha = null;
    let html = '';  // Definido antes para evitar uso do HTML fora do fluxo
    try {
        // Obter o nome do aluno do select e substituir espaços por underscores
        const nome_do_aluno = document.querySelector(`#alunoSelect`).value.replace(/\s+/g, '_');

        // Verificar se há dados no localStorage
        const alunos = JSON.parse(localStorage.getItem('alunos')) || [];

        // Verificar se o aluno existe
        const aluno = alunos.find(aluno => {
            const nomeAlunoReformado = aluno._nome.replace(/\s+/g, '_');
            return aluno._turma._nome === turma && nomeAlunoReformado === nome_do_aluno;
        });

        if (!aluno) {
            throw new Error(`Aluno não encontrado para a turma ${turma} e nome ${nome_do_aluno}`);
        }

        let turma_aluno = new Turma(aluno._turma._nome, aluno._turma._ano_letivo, aluno._turma._turno);

        // Criando as disciplinas e associando com os professores
        const disciplinas = aluno._turma._disciplinas.map(disciplina => {
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
        });

        // Recria a instância de Aluno
        const aluno_recriado = new Aluno(
            aluno._nome,
            aluno._data_nascimento,
            aluno._endereco,
            aluno._email,
            turma_aluno, // Atribuindo a turma recriada
            aluno._Usuario,
            aluno._senha
        );

        turma_aluno.adicionarAluno(aluno_recriado);

        // Matricula o aluno nas disciplinas da turma
        disciplinas.forEach(disciplina => {
            turma_aluno.matricularAlunoNaDisciplina(aluno_recriado, disciplina);
        });
        turminha = turma_aluno;

        // Processar as notas do aluno
        if (aluno._notas.length > 0) {
            aluno._notas.forEach(nota => {
                let tipoavaliação = nota._tipoAvaliacao;
                let valor = nota._valorNota;
                let bimestre = nota._bimestre;
                let disci_nota = '';

                turminha._disciplinas.forEach(d => {
                    if (d._nome === nota._disciplina._nome) {
                        disci_nota = d;
                    }
                });

                let nota_nova = new Nota(valor, disci_nota, aluno_recriado, tipoavaliação, bimestre);
                aluno_recriado.adicionarNota(nota_nova);
            });
        }

        let aulasDadasExistentes = 0;
        let faltasExistentes = 0;

        // Verifica se o aluno já tem dados de aulas e faltas registrados
        if (Object.keys(aluno._aulasEFaltas).length > 0) {
            turminha._disciplinas.forEach(disciplina => {
                if (aluno._aulasEFaltas[disciplina._nome]) {
                    const dadosAntigos = aluno._aulasEFaltas[disciplina._nome];
                    aulasDadasExistentes = dadosAntigos.aulasDadas || 0;
                    faltasExistentes = dadosAntigos.faltas || 0;

                    aluno_recriado.registrarAulasEFaltas(disciplina, aulasDadasExistentes, faltasExistentes);
                }
            });
        }

        // Gerar as tabelas para o aluno
        let frequencia = aluno_recriado.calcularFrequencia(disciplina_prof);
        if (frequencia === -1) {
            frequencia = "-";
        }

        // Tabela de Frequência
        html += `<h3>Frequência do Aluno: ${aluno_recriado._nome}</h3>`;
        html += `
        <table class="relatorio-tabela">
                <thead>
                    <tr>
                        <th>Frequência (%) </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>${frequencia}</td>
                    </tr>
                </tbody>
            </table>
            <br>
        `;

        // Tabelas de Bimestres e Notas
        for (let i = 1; i <= 4; i++) {
            html += `<h3>Bimestre ${i}</h3>`;
            html += `
            <table class="relatorio-tabela">
                    <thead>
                        <tr>
                            <th>Tipo de Avaliação</th>
                            <th>Nota Obtida</th>
                        </tr>
                    </thead>
                    <tbody>
            `;

            // Adicionar as notas do aluno para o bimestre
            aluno_recriado._notas.forEach(nota => {
                if (nota._bimestre == i && nota._disciplina.nome === disciplina_prof._nome) {
                    html += `
                    <tr>
                        <td>${nota._tipoAvaliacao}</td>
                        <td>${nota._valorNota}</td>
                    </tr>
                    `;
                }
            });

            html += `
                    </tbody>
                </table>
                <br>
            `;
        }

        // Inserir as tabelas geradas no DOM
        document.getElementById('relatorio').innerHTML = html;

    } catch (error) {
        // Exibir mensagem de erro no console para o desenvolvedor
        console.error("Erro ao gerar o relatório:", error.message);
        
        // Exibir mensagem de erro amigável para o usuário
        document.getElementById('relatorio').innerHTML = `
            <h3>Ocorreu um erro ao gerar o relatório. Por favor, tente novamente.</h3>
        `;

        // Registrar o erro no log (caso haja necessidade de logging adicional)
        // Uma possível implementação seria registrar o erro em um arquivo de log ou sistema de monitoramento
    }
}
