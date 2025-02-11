let dados_aluno;
let disciplinas_carregadas = [];
let professores_carregados=[];

async function carregarDadosDisciplinas(aluno_id) {
    const response = await fetch('http://localhost:3000/api/aluno_disciplina');
    const aluno_disciplina = await response.json();
        
    if (!aluno_disciplina || aluno_disciplina.length === 0) {
        alert("O aluno(a) não possui disciplinas associadas a ele(a).");
        return;
    }

    let disciplinas = [];
    for (let t_d of aluno_disciplina) {
        if (t_d.aluno_id == aluno_id) {
            disciplinas.push(t_d.disciplina_id);
            console.log(disciplinas);
        }
    }

    const response_disciplina = await fetch('http://localhost:3000/api/disciplina');
    const disciplinaS_aluno = await response_disciplina.json();
        
    if (!disciplinaS_aluno || disciplinaS_aluno.length === 0) {
        alert("O aluno(a) não possui disciplinas associadas a ele(a).");
        return;
    }

    for (let numero of disciplinas) {
        // Procurar um objeto em `dados` que tenha o mesmo número da disciplina
        let disciplinaEncontrada = disciplinaS_aluno.find(dado => dado.id === numero);

        // Se encontrar a disciplina, adicionar ao array de comuns
        if (disciplinaEncontrada) {
            disciplinas_carregadas.push(disciplinaEncontrada);
        }
    }
   
    console.log('Disciplinas carregadas:', disciplinas_carregadas);  // Para depuração

    const response_professores = await fetch('http://localhost:3000/api/professor');
    const professores = await response_professores.json();

    for (let prof of professores) {
        // Para cada professor, procurar a disciplina associada a ele
        for (let disciplina of disciplinas_carregadas) {
            if (disciplina.professor_id === prof.id) {
                // Armazenar o nome da disciplina e os dados do professor como um objeto na lista
                professores_carregados.push({
                    [disciplina.nome]: prof  // A chave é o nome da disciplina e o valor é o professor
                });
                break;  // Se já encontrou o professor responsável, pode sair do loop
            }
        }
    }

    // Chama a função para exibir a grade curricular
    grade_curricular();
}

document.addEventListener('DOMContentLoaded', async function() {
    try {
        // Tenta pegar o nome do aluno logado do localStorage
        let aluno_nomeUsuario = JSON.parse(localStorage.getItem('alunoLogado'));
        if (aluno_nomeUsuario) {
            const response = await fetch('http://localhost:3000/api/aluno');
            if (!response.ok) {
                throw new Error('Falha ao carregar dados dos alunos.');
            }
            const alunos = await response.json();

            // Encontrar o aluno correspondente com base no nome de usuário
            let aluno = alunos.find(al => al.usuario === aluno_nomeUsuario.usuario);

            if (aluno) {
                // Exibe o nome do aluno
                document.getElementById('nomeAluno').textContent = aluno.nome;
                dados_aluno = aluno;
                console.log(aluno.id)

                // Chama a função para carregar as disciplinas do aluno
                await carregarDadosDisciplinas(aluno.id);  // Aqui está a chamada
            } else {
                throw new Error('Aluno não encontrado na lista de alunos.');
            }
        } else {
            throw new Error('Aluno não encontrado no localStorage');
        }
    } catch (error) {
        console.error("Erro ao recuperar o aluno logado:", error);
        alert("Ocorreu um erro ao carregar os dados do aluno. Por favor, tente novamente.");
    }
});


function toggleMenu() {
    try {
        const menu = document.getElementById('menuLateral');
        const currentLeft = menu.style.left;

        if (currentLeft === '0px') {
            menu.style.left = '-250px';
        } else {
            menu.style.left = '0';
        }
    } catch (error) {
        console.error("Erro ao alternar o menu lateral:", error);
        alert("Não foi possível alterar o menu. Por favor, tente novamente.");
    }
}

function inicio() {
    try {
        // Altera o URL da janela atual para a página de início
        window.location.href = 'pagina-aluno.html';
    } catch (error) {
        console.error("Erro ao redirecionar para a página inicial:", error);
        alert("Não foi possível redirecionar para a página inicial. Por favor, tente novamente.");
    }
}

function boletim() {
    try {
        // Altera o URL da janela atual para a página do boletim
        window.location.href = 'boletim.html';
    } catch (error) {
        console.error("Erro ao redirecionar para a página do boletim:", error);
        alert("Não foi possível redirecionar para a página do boletim. Por favor, tente novamente.");
    }
}

function grade_curricular() {
    try {
        const boletimDiv = document.getElementById("boletim_grade");
        boletimDiv.innerHTML = '';
        let boletimHtml = '';

        boletimHtml += `
            <table border="1" cellpadding="10" cellspacing="0" style="border-collapse: collapse; width: 100%; text-align: center;">
                <thead>
                    <tr>
                        <th>Disciplina</th>
                        <th>C.H</th>
                        <th>Docente</th>
                        <th>E-mail do docente</th>
                    </tr>
                </thead>
                <tbody>`;

        // Percorre as disciplinas carregadas e preenche as linhas da tabela
        disciplinas_carregadas.forEach(disciplina => {
            // Encontra o professor responsável pela disciplina
            let professorResponsavel = professores_carregados.find(professor => professor[disciplina.nome]);

            // Se encontrou o professor, preenche os dados
            if (professorResponsavel) {
                let professor = professorResponsavel[disciplina.nome]; // Pega os dados do professor
                boletimHtml += `
                <tr>
                    <td>${disciplina.nome}</td>
                    <td>${disciplina.quantidade_aulas}</td>
                    <td>${professor.nome}</td>
                    <td>${professor.email}</td>
                </tr>
                `;
            } else {
                // Se não encontrou o professor, deixar as células vazias
                boletimHtml += `
                <tr>
                    <td>${disciplina.nome}</td>
                    <td>${disciplina.quantidade_aulas}</td>
                    <td>Sem professor</td>
                    <td>Sem e-mail</td>
                </tr>
                `;
            }
        });

        boletimHtml += `
        </tbody>
        </table>
        `;

        // Adiciona o conteúdo da tabela à div
        boletimDiv.innerHTML = boletimHtml;
    } catch (error) {
        console.error("Erro ao carregar a grade curricular:", error);
        alert("Ocorreu um erro ao carregar a grade curricular. Por favor, tente novamente.");
    }
}
