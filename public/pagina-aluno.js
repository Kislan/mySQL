document.addEventListener('DOMContentLoaded', async function() {
    try {
        // Tenta pegar o nome do aluno logado do localStorage
        let aluno_nomeUsuario = JSON.parse(localStorage.getItem('alunoLogado'));
        if (!aluno_nomeUsuario) {
            throw new Error('Aluno não encontrado no localStorage.');
        }

        const response = await fetch('http://localhost:3000/api/aluno');
        if (!response.ok) {
            throw new Error('Falha ao carregar dados dos alunos. Status: ' + response.status);
        }

        const alunos = await response.json();

        // Encontrar o aluno correspondente com base no nome de usuário
        let aluno = alunos.find(al => al.usuario === aluno_nomeUsuario.usuario);

        if (!aluno) {
            throw new Error('Aluno não encontrado na lista de alunos.');
        }

        // Exibe o nome do aluno
        document.getElementById('nomeAluno').textContent = aluno.nome;
        
    } catch (error) {
        console.error("Erro ao recuperar o aluno logado:", error);
        alert(`Ocorreu um erro ao carregar os dados do aluno: ${error.message}. Por favor, tente novamente.`);
    }
});

function toggleMenu() {
    const menu = document.getElementById('menuLateral');
    if (!menu) {
        console.error("Menu não encontrado no DOM.");
        alert("Ocorreu um erro ao tentar abrir ou fechar o menu.");
        return;
    }

    const currentLeft = menu.style.left;

    try {
        if (currentLeft === '0px') {
            menu.style.left = '-250px'; 
        } else {
            menu.style.left = '0';  
        }
    } catch (error) {
        console.error("Erro ao tentar alternar o menu: ", error);
        alert("Houve um problema ao tentar abrir ou fechar o menu.");
    }
}

function exibirBoletim() {
    try {
        // Altera o URL da janela atual para a página do boletim
        window.location.href = 'boletim.html';
    } catch (error) {
        console.error("Erro ao tentar acessar a página do boletim: ", error);
        alert("Não foi possível acessar seu boletim. Tente novamente.");
    }
}

function grade_curricular() {
    try {
        // Altera o URL da janela atual para a página da grade curricular
        window.location.href = 'grade_curricular.html';
    } catch (error) {
        console.error("Erro ao tentar acessar a página da grade curricular: ", error);
        alert("Não foi possível acessar a grade curricular. Tente novamente.");
    }
}
