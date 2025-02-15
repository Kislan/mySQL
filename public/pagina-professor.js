class ValidationError extends Error {}
class DatabaseError extends Error {}
class OperationError extends Error {}

let professor_carregado;
let turmas_carregadas = [];
let disciplina_carregada;
let alunos_carregados = [];
let dataAtual = new Date();

// Formatar a data no formato desejado (YYYY-MM-DD)
let dataFormatada = dataAtual.toISOString(); // Formato ISO 8601, ex: '2025-02-13T03:00:00.000Z'


document.addEventListener('DOMContentLoaded', function () {
    async function loadData() {
        try {
            // Tenta pegar o nome do aluno logado do localStorage
            let proflogado = JSON.parse(localStorage.getItem('professorLogado'));
            
            if (!proflogado) {
                throw new Error('Professor não encontrado no localStorage');
            }

            const response_professor = await fetch('http://localhost:3000/api/professor');
            if (!response_professor.ok) {
                throw new Error('Falha ao carregar dados do professor.');
            }

            const professores = await response_professor.json();

            // Encontrar o professor correspondente com base no nome de usuário
            let professor = professores.find(prof => prof.nome_usuario === proflogado.nome_usuario);
            if (!professor) {
                throw new Error('Professor não encontrado.');
            }

            document.getElementById('nomeUsuario').textContent = professor.nome;
            professor_carregado = professor;

            const response_disciplina = await fetch('http://localhost:3000/api/disciplina');
            if (!response_disciplina.ok) {
                throw new Error('Falha ao carregar dados da disciplina.');
            }

            const disciplinas = await response_disciplina.json();

            // Encontrar a disciplina correspondente com base no professor
            let disciplina = disciplinas.find(disci => disci.professor_id === professor_carregado.id);
            if (!disciplina) {
                throw new Error('Disciplina não encontrada.');
            }

            disciplina_carregada = disciplina;

            const response_turmas_disci = await fetch('http://localhost:3000/api/turma_disciplina');
            if (!response_turmas_disci.ok) {
                throw new Error('Falha ao carregar dados das turmas e disciplinas.');
            }

            const turmas_disci = await response_turmas_disci.json();

            const response_turmas = await fetch('http://localhost:3000/api/turma');
            if (!response_turmas.ok) {
                throw new Error('Falha ao carregar dados das turmas.');
            }

            const turmas = await response_turmas.json();

            const turmas_dados = turmas.filter(t => 
                turmas_disci.some(t_d => 
                    t_d.disciplina_id === disciplina_carregada.id && t_d.turma_id === t.id
                )
            );

            turmas_carregadas = turmas_dados;
            
            if (turmas_carregadas.length === 0) {
                console.warn('Nenhuma turma encontrada para a disciplina.');
            }
            
            // Chama a função para exibir as turmas no menu, após turmas_carregadas estar preenchido
            exibirTurmasNoMenu();

        } catch (error) {
            console.error("Erro ao recuperar o professor logado:", error);
            alert("Ocorreu um erro ao carregar os dados do professor. Por favor, tente novamente.");
        }
    }

    // Função para exibir as turmas no menu
    function exibirTurmasNoMenu() {
        try {
            if (turmas_carregadas.length > 0) {
                const menuTurmas = document.getElementById('menuTurmas');
                turmas_carregadas.forEach(turma => {
                    const turmaLink = document.createElement('div');
                    turmaLink.innerHTML = `
                        <!-- Exibe somente o nome da turma, mas passa o id no onclick -->
                        <a href="javascript:void(0)" onclick="registrarFrequencia('${turma.id}')">${turma.nome}</a>
                        <div>
                            <a href="javascript:void(0)" class="registrar-notas" data-turma="${turma.id}">Boletins</a>
                            <a href="javascript:void(0)" class="registrar-frequencia" data-turma="${turma.id}">Frequência</a>
                            <a href="javascript:void(0)" class="gerar-relatorio" data-turma="${turma.id}">Relatórios Acadêmicos</a>
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
    }

    loadData(); // Chama a função assíncrona
});


// Função para registrar a frequência
async function registrarFrequencia(turma) {
    console.log('Chamaram a função registrarFrequencia para a turma: ' + turma);

    let div_resultado = document.getElementById('resultado');
    div_resultado.innerHTML = '';
    
    const alunos_da_turma = [];
    try {
        // Filtra os alunos que pertencem à turma
        const response_alunos = await fetch('http://localhost:3000/api/aluno');
        if (!response_alunos.ok) {
            throw new Error('Falha ao carregar dados dos alunos.');
        }

        const alunos = await response_alunos.json();

        alunos.forEach(alu =>{
            if (alu.turma_id == turma){
                alunos_da_turma.push(alu);
                alunos_carregados.push(alu)
            }
        })


        let resultado = `<h2>Registre as faltas dos alunos da turma</h2>`;
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
            const alunoNomeFormatado = aluno.usuario.replace(/\s+/g, '_'); // Substitui espaços por _
            resultado += `
                <tr>
                    <td>${aluno.nome.toUpperCase()}</td>
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

async function salvarFrequencia(turma) {
    console.log('Registrando as frequências para a turma: ' + turma);
    const alunos_da_turma_ = [];
    let todosOsErros = false; // Variável de controle de erros

    try {
        const quantidadeAulas = parseInt(document.getElementById('qtaulas').value);

        // Verificação da quantidade de aulas
        if (isNaN(quantidadeAulas) || quantidadeAulas <= 0) {
            throw new ValidationError("A quantidade de aulas deve ser um número válido maior que 0.");
        }

        // Buscando alunos do backend
        const response_alunos = await fetch('http://localhost:3000/api/aluno');
        if (!response_alunos.ok) {
            const errorDetails = await response_alunos.json();
            throw new DatabaseError(`Falha ao carregar dados dos alunos: ${errorDetails.message || 'Erro desconhecido'}`);
        }

        const alunos = await response_alunos.json();
        alunos.forEach(alu => {
            if (alu.turma_id == turma) {
                alunos_da_turma_.push(alu);
            }
        });

        console.log("Alunos encontrados:", alunos_da_turma_);

        if (alunos_da_turma_.length === 0) {
            throw new DatabaseError("Nenhum aluno encontrado para essa turma.");
        }

        // Loop pelos alunos
        for (const aluno of alunos_da_turma_) {
            const alunoNomeFormatado = aluno.usuario.replace(/\s+/g, '_');
            const faltasInput = document.querySelector(`input[name="faltas_${alunoNomeFormatado}"]`);

            if (!faltasInput) {
                console.error(`Erro: Não encontrado o campo de faltas para o aluno ${aluno.nome}`);
                alert(`Erro: Não encontrado o campo de faltas para o aluno ${aluno.nome}`);
                todosOsErros = true;
                continue; // Pula para o próximo aluno
            }

            const faltas_ = parseInt(faltasInput.value);

            // Validação da quantidade de faltas
            if (faltasInput.value === '' || isNaN(faltas_) || faltas_ < 0 || faltas_ > quantidadeAulas) {
                console.error(`Erro: A quantidade de faltas para o aluno ${aluno.nome} não é válida.`);
                alert(`Erro: A quantidade de faltas para o aluno ${aluno.nome} não pode ser maior que o número de aulas ou ser negativa.`);
                todosOsErros = true;
                continue; // Pula para o próximo aluno
            }

            let aulasDadasExistentes = 0;

            const response_frequencia = await fetch('http://localhost:3000/api/registros_aulas');
            if (!response_frequencia.ok) {
                const errorDetails = await response_frequencia.json();
                throw new DatabaseError(`Falha ao carregar frequências anteriores: ${errorDetails.message || 'Erro desconhecido'}`);
            }

            const frequencias_anteriores = await response_frequencia.json();

            // Verifica as frequências anteriores para o aluno
            frequencias_anteriores.forEach(p => {
                if (p.disciplina_id === disciplina_carregada.id && p.aluno_id === aluno.id) {
                    aulasDadasExistentes += p.aulas_dadas || 0;
                }
            });

            // Verificação de condição: Nova quantidade de aulas dadas não pode ser maior que o total de aulas da disciplina
            if (aulasDadasExistentes + quantidadeAulas > disciplina_carregada.quantidade_aulas) {
                console.error(`Erro: Não é possível adicionar mais aulas do que o total de aulas da disciplina. Carga horária: ${disciplina_carregada.quantidade_aulas}. Aulas ministradas + novas aulas: ${aulasDadasExistentes + quantidadeAulas}`);
                alert(`Erro: A soma das aulas não pode ultrapassar o total de aulas da disciplina.`);
                todosOsErros = true;
                continue; // Pula para o próximo aluno
            }

            // Registrar a frequência
            const aluno_id = parseInt(aluno.id);
            const disciplina_id = parseInt(disciplina_carregada.id);
            const aulas_dadas = quantidadeAulas;
            const faltas = faltas_.toString();

            // Validação dos dados antes de registrar a frequência
            if (!aluno_id || !disciplina_id || typeof aulas_dadas !== 'number' || typeof faltas !== 'string') {
                console.error("Todos os campos devem ser preenchidos corretamente.");
                alert("Todos os campos devem ser preenchidos corretamente.");
                todosOsErros = true;
                continue; // Pula para o próximo aluno
            }

            // Faz a requisição POST para registrar a frequência
            const response = await fetch('http://localhost:3000/api/registros_aulas', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ aluno_id, disciplina_id, aulas_dadas, faltas })
            });

            // Verificação de resposta da API
            if (!response.ok) {
                const errorDetails = await response.json();
                console.error('Erro detalhado da API:', errorDetails);
                throw new Error(`Erro ao registrar frequência: ${errorDetails.message || 'Erro desconhecido'}`);
            }

            // Sucesso
            console.log('Frequência registrada com sucesso!');
        }

        if (!todosOsErros) {
            alert("Frequências registradas com sucesso!");
        }

    } catch (error) {
        // Tratamento de erros
        if (error instanceof ValidationError) {
            alert("Erro de validação: " + error.message);
            console.error("Erro de validação:", error.stack);
        } else if (error instanceof DatabaseError) {
            alert("Erro no banco de dados: " + error.message);
            console.error("Erro no banco de dados:", error.stack);
        } else {
            alert("Ocorreu um erro inesperado.");
            console.error("Erro inesperado:", error.stack);
        }
    }
}



// Função para registrar as notas
async function registrarNotas(turma) {
    let div_resultado = document.getElementById('resultado');
    div_resultado.innerHTML = '';

    const alunos_da_turma = [];
    try {
        const response_alunos = await fetch('http://localhost:3000/api/aluno');
        if (!response_alunos.ok) {
            throw new Error('Falha ao carregar dados dos alunos.');
        }

        const alunos = await response_alunos.json();

        alunos.forEach(alu => {
            if (alu.turma_id == turma) {
                alunos_da_turma.push(alu);
            }
        });

        let resultado = `<h2>Registre as notas dos alunos da turma</h2>`;
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
            const alunoNomeFormatado = aluno.usuario.replace(/\s+/g, '_'); // Substitui espaços por _
            resultado += `
                <tr>
                    <td>${aluno.nome.toUpperCase()}</td>
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

async function post_Notas(valorNota, tipo_avaliacao, bimestre, aluno_id, disciplina_id) {
    try {
        const response = await fetch('http://localhost:3000/api/nota', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ valorNota: valorNota, tipo_avaliacao: tipo_avaliacao, bimestre: bimestre, aluno_id: aluno_id, disciplina_id: disciplina_id })
        });

        if (!response.ok) {
            const errorDetails = await response.json();
            console.log('Detalhes do erro:', errorDetails);
            throw new Error(`Erro ao registrar notas: ${errorDetails.message || 'Erro desconhecido'}`);
        }

    } catch (error) {
        console.error("Erro ao registrar nota:", error);
        throw new Error("Ocorreu um erro ao registrar a nota.");
    }
}

// Função para salvar as notas
async function salvarNotas(turma) {
    console.log('Salvando as notas para a turma: ' + turma);
    const alunos_da_turma_ = [];
    let todosOsErros = false; // Variável de controle de erros

    try {
        // Obter os alunos
        const response_alunos = await fetch('http://localhost:3000/api/aluno');
        if (!response_alunos.ok) {
            const errorDetails = await response_alunos.json();
            throw new Error(`Falha ao carregar dados dos alunos: ${errorDetails.message || 'Erro desconhecido'}`);
        }

        const alunos = await response_alunos.json();
        alunos.forEach(alu => {
            if (alu.turma_id == turma) {
                alunos_da_turma_.push(alu);
            }
        });

        console.log("Alunos encontrados:", alunos_da_turma_);

        if (alunos_da_turma_.length === 0) {
            throw new Error("Nenhum aluno encontrado para essa turma.");
        }

        // Loop pelos alunos
        for (const aluno of alunos_da_turma_) {
            try {
                if (aluno.turma_id == turma) {
                    const alunoNomeFormatado = aluno.usuario.replace(/\s+/g, '_');

                    const tipoAvaliacaoElement = document.querySelector(`select[name="tipo_avaliacao_${alunoNomeFormatado}"]`);
                    const notaElement = document.querySelector(`input[name="nota_${alunoNomeFormatado}"]`);
                    const bimestreElement = document.querySelector(`select[name="bimestre_${alunoNomeFormatado}"]`);

                    // Verifica se os campos estão preenchidos
                    if (!tipoAvaliacaoElement || !notaElement || !bimestreElement || !notaElement.value) {
                        console.error(`Erro: Campos de avaliação ou nota não preenchidos para o aluno ${aluno.nome}`);
                        alert(`Erro: Todos os campos devem ser preenchidos para o aluno ${aluno.nome}`);
                        todosOsErros = true;
                        continue;  // Pula para o próximo aluno
                    }

                    const tipoAvaliacao = tipoAvaliacaoElement.value;
                    const nota = parseInt(notaElement.value);
                    const bimestre = bimestreElement.value;

                    // Verifica se a nota está dentro do intervalo válido (0-100)
                    if (nota < 0 || nota > 100) {
                        console.error(`Erro: A nota para o aluno ${aluno.nome} deve estar entre 0 e 100.`);
                        alert(`Erro: A nota para o aluno ${aluno.nome} deve estar entre 0 e 100.`);
                        todosOsErros = true;
                        continue;
                    }

                    // Verifica as notas existentes para o bimestre e aluno
                    const response_notas = await fetch('http://localhost:3000/api/nota');
                    if (!response_notas.ok) {
                        const errorDetails = await response_notas.json();
                        throw new Error(`Falha ao carregar dados das notas: ${errorDetails.message || 'Erro desconhecido'}`);
                    }

                    const notas = await response_notas.json();

                    let somaNotasBimestre = 0;
                    notas.forEach(notaExistente => {
                        if (notaExistente.bimestre == bimestre && notaExistente.aluno_id == aluno.id && notaExistente.disciplina_id == disciplina_carregada.id) {
                            somaNotasBimestre += notaExistente.valorNota;
                        }
                    });

                    // Se a soma das notas já existentes + a nova nota ultrapassar 100, gera um erro
                    if (somaNotasBimestre + nota > 100) {
                        console.error(`Erro: A soma das notas no bimestre ${bimestre} para o aluno ${aluno.nome} não pode ultrapassar 100.`);
                        alert(`Erro: A soma das notas no bimestre ${bimestre} para o aluno ${aluno.nome} não pode ultrapassar 100.`);
                        todosOsErros = true;
                        continue;  // Pula para o próximo aluno
                    }

                    // Envia a nota para o backend
                    await post_Notas(nota, tipoAvaliacao.toString(), parseInt(bimestre), parseInt(aluno.id), parseInt(disciplina_carregada.id));
                }
            } catch (alunoError) {
                console.error(`Erro ao processar o aluno ${aluno.nome}:`, alunoError);
                alert(`Ocorreu um erro ao processar o aluno ${aluno.nome}.`);
                todosOsErros = true;
            }
        }

        if (todosOsErros) {
            return;  // Se houver erro em algum aluno, não continua com o salvamento
        }

        alert("Notas registradas com sucesso!");

    } catch (error) {
        console.error('Erro inesperado:', error);
        alert('Ocorreu um erro inesperado. Por favor, tente novamente.');
    }
}

// Função para gerar o relatório de desempenho
async function gerarRelatorio(turma) {
    let div_resultado = document.getElementById('resultado');
    div_resultado.innerHTML = ''; // Limpa o conteúdo da div

    let resultado = `<h2>Gere relatórios acadêmicos sobre seus alunos</h2>`;

    resultado += `<label for="alunoSelect">Escolha o aluno:</label>
                  <select id="alunoSelect" name="aluno" required>
                  <option value="">Selecione um aluno</option>`;

    try {
        // Faz a requisição para carregar os alunos
        const response_alunos = await fetch('http://localhost:3000/api/aluno');
        
        if (!response_alunos.ok) {
            throw new Error('Falha ao carregar dados dos alunos.');
        }

        const alunos = await response_alunos.json();
        let alunosDaTurma = [];

        // Filtra os alunos da turma
        alunos.forEach(alu => {
            if (alu.turma_id == turma) {
                alunosDaTurma.push(alu);
            }
        });

        // Se não encontrar alunos na turma
        if (alunosDaTurma.length === 0) {
            alert("Não há alunos registrados para essa turma.");
            return;
        }

        // Adiciona as opções de alunos no select
        alunosDaTurma.forEach(aluno => {
            const alunoNomeFormatado = aluno.usuario.replace(/\s+/g, '_'); // Substitui espaços por _
            resultado += `<option value="${alunoNomeFormatado}">${aluno.nome.toUpperCase()}</option>`;
        });

        // Fecha a tag select
        resultado += `</select>`;

        resultado += `<button id="relatorio_aluno">Gerar Relatório</button>`;
        resultado += `<div id='relatorio'></div>`;

        // Atualiza o conteúdo da div de resultado
        div_resultado.innerHTML = resultado;

        // Adiciona evento de clique ao botão "Gerar Relatório"
        document.getElementById('relatorio_aluno').addEventListener('click', function () {
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

    } catch (error) {
        // Tratamento de erro no fetch ou manipulação do DOM
        console.error("Erro ao carregar os dados dos alunos ou manipular o DOM:", error);
        alert("Ocorreu um erro ao carregar os alunos. Tente novamente.");
    }
}



async function relatorio_aluno(turma) {
    let alunos_da_turma_=[];
    let html = '';  // Definido antes para evitar uso do HTML fora do fluxo
    try {
        // Obter o nome do aluno do select e substituir espaços por underscores
        const nome_do_aluno = document.querySelector(`#alunoSelect`).value.replace(/\s+/g, '_');

        // Verificar se há dados no localStorage
        const response_alunos = await fetch('http://localhost:3000/api/aluno');
        if (!response_alunos.ok) {
            const errorDetails = await response_alunos.json();
            throw new Error(`Falha ao carregar dados dos alunos: ${errorDetails.message || 'Erro desconhecido'}`);
        }

        const alunos = await response_alunos.json();
        alunos.forEach(alu => {
            if (alu.turma_id == turma) {
                alunos_da_turma_.push(alu);
            }
        });

        // Verificar se o aluno existe
        const aluno = alunos_da_turma_.find(aluno => {
            const nomeAlunoReformado = aluno.usuario.replace(/\s+/g, '_');
            return nomeAlunoReformado === nome_do_aluno;
        });

        if (!aluno) {
            throw new Error(`Aluno não encontrado para a turma ${turma} e nome ${nome_do_aluno}`);
        }

        const response_notas = await fetch('http://localhost:3000/api/nota');
        if (!response_notas.ok) {
            throw new Error('Falha ao carregar notas.');
        }
        const notas = await response_notas.json();

        let frequencia='-';

        // Tabela de Frequência
        html += `<h3>Frequência do Aluno: ${aluno.nome}</h3>`;
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
            notas.forEach(nota => {
                if (nota.bimestre == i && nota.disciplina_id === disciplina_carregada.id && nota.aluno_id == aluno.id) {
                    html += `
                    <tr>
                        <td>${nota.tipo_avaliacao}</td>
                        <td>${nota.valorNota}</td>
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
    }
}