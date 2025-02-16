let dados_aluno;
let disciplinas_carregadas = [];
let professores_carregados = [];

async function carregarDadosDisciplinas(aluno_id) {
    try {
        const response = await fetch('http://localhost:3000/api/aluno_disciplina');
        if (!response.ok) {
            throw new Error('Falha ao carregar dados das disciplinas do aluno.');
        }
        const aluno_disciplina = await response.json();
        
        if (!aluno_disciplina || aluno_disciplina.length === 0) {
            alert("O aluno(a) não possui disciplinas associadas a ele(a).");
            return;
        }

        let disciplinas = [];
        for (let t_d of aluno_disciplina) {
            if (t_d.aluno_id == aluno_id) {
                disciplinas.push(t_d.disciplina_id);
            }
        }

        const response_disciplina = await fetch('http://localhost:3000/api/disciplina');
        if (!response_disciplina.ok) {
            throw new Error('Falha ao carregar dados das disciplinas.');
        }
        const disciplinaS_aluno = await response_disciplina.json();
        
        if (!disciplinaS_aluno || disciplinaS_aluno.length === 0) {
            alert("O aluno(a) não possui disciplinas associadas a ele(a).");
            return;
        }

        for (let numero of disciplinas) {
            let disciplinaEncontrada = disciplinaS_aluno.find(dado => dado.id === numero);
            if (disciplinaEncontrada) {
                disciplinas_carregadas.push(disciplinaEncontrada);
            }
        }

        const response_professores = await fetch('http://localhost:3000/api/professor');
        if (!response_professores.ok) {
            throw new Error('Falha ao carregar dados dos professores.');
        }
        const professores = await response_professores.json();

        for (let prof of professores) {
            for (let disciplina of disciplinas_carregadas) {
                if (disciplina.professor_id === prof.id) {
                    professores_carregados.push({
                        [disciplina.nome]: prof
                    });
                    break;
                }
            }
        }

        grade_curricular(); // Chama a função para exibir a grade curricular
    } catch (error) {
        console.error("Erro ao carregar dados das disciplinas:", error);
        alert("Ocorreu um erro ao carregar os dados das disciplinas. Por favor, tente novamente.");
    }
}

document.addEventListener('DOMContentLoaded', async function() {
    try {
        let aluno_nomeUsuario = JSON.parse(localStorage.getItem('alunoLogado'));
        if (!aluno_nomeUsuario) {
            throw new Error('Aluno não encontrado no localStorage');
        }

        const response = await fetch('http://localhost:3000/api/aluno');
        if (!response.ok) {
            throw new Error('Falha ao carregar dados dos alunos.');
        }
        const alunos = await response.json();

        let aluno = alunos.find(al => al.usuario === aluno_nomeUsuario.usuario);
        if (!aluno) {
            throw new Error('Aluno não encontrado na lista de alunos.');
        }

        document.getElementById('nomeAluno').textContent = aluno.nome;
        dados_aluno = aluno;

        await carregarDadosDisciplinas(aluno.id);
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
        window.location.href = 'pagina-aluno.html';
    } catch (error) {
        console.error("Erro ao redirecionar para a página inicial:", error);
        alert("Não foi possível redirecionar para a página inicial. Por favor, tente novamente.");
    }
}

function boletim() {
    try {
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

        disciplinas_carregadas.forEach(disciplina => {
            let professorResponsavel = professores_carregados.find(professor => professor[disciplina.nome]);

            if (professorResponsavel) {
                let professor = professorResponsavel[disciplina.nome];
                boletimHtml += `
                <tr>
                    <td>${disciplina.nome}</td>
                    <td>${disciplina.quantidade_aulas}</td>
                    <td>${professor.nome}</td>
                    <td>${professor.email}</td>
                </tr>`;
            } else {
                boletimHtml += `
                <tr>
                    <td>${disciplina.nome}</td>
                    <td>${disciplina.quantidade_aulas}</td>
                    <td>Sem professor</td>
                    <td>Sem e-mail</td>
                </tr>`;
            }
        });

        boletimHtml += `</tbody></table>`;
        boletimDiv.innerHTML = boletimHtml;
    } catch (error) {
        console.error("Erro ao carregar a grade curricular:", error);
        alert("Ocorreu um erro ao carregar a grade curricular. Por favor, tente novamente.");
    }
}
