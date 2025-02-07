try {
    // Tenta obter o aluno do localStorage e analisar os dados
    let aluno = JSON.parse(localStorage.getItem('alunoLogado'));

    // Verifica se o aluno está logado
    if (aluno && aluno._nome) {
        // Exibe os dados do aluno logado
        document.getElementById('nomeAluno').textContent = aluno._nome;
    } else {
        // Caso o aluno não tenha nome ou não esteja logado
        console.warn("Aluno não encontrado ou dados incompletos.");
    }
} catch (error) {
    // Caso ocorra algum erro ao acessar o localStorage ou processar os dados
    console.error("Erro ao carregar os dados do aluno: ", error);
    alert("Ocorreu um erro ao carregar seus dados. Por favor, tente novamente.");
}

function toggleMenu() {
    const menu = document.getElementById('menuLateral');
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