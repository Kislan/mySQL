let dados_aluno;

async function carregarDadosDisciplinas(aluno_id){
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
                dados_aluno=aluno;
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
            

        disciplinas.forEach(disciplina => {
            boletimHtml += `
            <tr>
                <td>${disciplina._nome}</td>
                <td>${disciplina._quantidade_aulas}</td>
                <td>${disciplina._professorResponsavel._nome}</td>
                <td>${disciplina._professorResponsavel._email}</td>
            </tr>
            `;
        });

        boletimHtml += `
        </tbody>
        </table>
        `;

        // Adicionando o conteúdo da tabela à div
        boletimDiv.innerHTML = boletimHtml;
    } catch (error) {
        console.error("Erro ao carregar a grade curricular:", error);
        alert("Ocorreu um erro ao carregar a grade curricular. Por favor, tente novamente.");
    }
}

// Chama a função para exibir a grade curricular
grade_curricular();
