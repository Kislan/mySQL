// Função de login com tratamento de exceções e mensagens de erro claras
function Login() {
    try {
        // Captura os valores do formulário
        const opcao = document.getElementById('opcoes').value;
        const login = document.getElementById('login').value;
        const senha = document.getElementById('senha').value;

        // Valida os campos
        if (!opcao || !login || !senha) {
            throw new Error('Por favor, preencha todos os campos.');
        }

        // Verifica se é um professor e valida o login e senha
        if (opcao === 'professor') {
            // Verifica se os professores foram carregados corretamente
            const professores = JSON.parse(localStorage.getItem('professores')) || [];
            if (professores.length === 0) {
                throw new Error('Dados de professores ainda não carregados.');
            }

            // Procura o professor na lista carregada
            const professor = professores.find(prof => prof._nome_usuario === login && prof._senha === senha);

            if (!professor) {
                throw new Error('Login ou senha incorretos para professor.');
            }

            // Armazenamento do professor logado
            localStorage.removeItem('professorLogado');
            localStorage.setItem('professorLogado', JSON.stringify(professor));
            alert(`Bem-vindo, Professor(a) ${professor._nome}!`);
            window.location.href = 'pagina-professor.html';

        } else if (opcao === 'aluno') {
            // Verifica se os alunos foram carregados corretamente
            const alunos = JSON.parse(localStorage.getItem('alunos')) || [];
            if (alunos.length === 0) {
                throw new Error('Dados de alunos ainda não carregados.');
            }

            // Procura o aluno na lista carregada
            const aluno = alunos.find(al => al._Usuario === login && al._senha === senha);

            if (!aluno) {
                throw new Error('Login ou senha incorretos para aluno.');
            }

            // Armazenamento do aluno logado
            localStorage.removeItem('alunoLogado');
            localStorage.setItem('alunoLogado', JSON.stringify(aluno));
            alert(`Bem-vindo, Aluno(a) ${aluno._nome}!`);
            window.location.href = 'pagina-aluno.html';

        } else {
            throw new Error('Opção inválida!');
        }

    } catch (error) {
        // Exibe o erro ao usuário ou loga no console
        console.error(error); // Registra o erro no console
        alert(error.message);  // Exibe a mensagem de erro para o usuário
    }
}