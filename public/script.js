
document.addEventListener('DOMContentLoaded', async () => {
    const turmaSelect = document.getElementById("turma");

    try {
        const response = await fetch('http://localhost:3000/api/turma');
        const turmas = await response.json();
        console.log('Turmas recebidas do servidor:', turmas);  // Verifique o que chegou do servidor
        
        turmas.forEach(turma => {
            const option = document.createElement("option");
            option.value = turma.id;
            option.textContent = turma.nome;
            turmaSelect.appendChild(option);
        });
    } catch (error) {
        console.error("Erro ao carregar turmas:", error.message);
        alert("Erro ao carregar turmas. Tente novamente mais tarde.");
    }
});


// Função para criar aluno e cadastrá-lo
async function criarAlunoECadastrar(nome, dataNascimento, endereco, email, turmaID, usuario, senha) {
    try {
        const response = await fetch('/api/aluno', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nome, dataNascimento, endereco, email, usuario, senha, turmaID })
        });

        if (!response.ok) {
            throw new Error('Erro ao cadastrar aluno. Verifique os dados e tente novamente.');
        }

        const result = await response.json();

        // Alerta de sucesso com o nome do aluno
        alert(`Cadastro realizado com sucesso! Estudante ${nome} foi matriculado(a) na turma.`);
        console.log('Aluno cadastrado com ID:', result.id);

    } catch (error) {
        console.error("Erro ao criar aluno:", error.message);
        alert(`Erro ao realizar cadastro: ${error.message}`);
    }
}

// Evento de submit do formulário
document.getElementById("formCadastro").addEventListener("submit", function(event) {
    event.preventDefault();

    try {
        const nome = document.getElementById("nome").value;
        const dataNascimento = document.getElementById("dataNascimento").value;
        const endereco = document.getElementById("endereco").value;
        const email = document.getElementById("email").value;
        const turmaID = document.getElementById("turma").value;
        const usuario = document.getElementById("usuario").value;
        const senha = document.getElementById("senha").value;
        const confirmacaoSenha = document.getElementById("confirmacaoSenha").value;

        // Verifica se todos os campos obrigatórios foram preenchidos
        if (!nome || !dataNascimento || !endereco || !email || !usuario || !senha || !confirmacaoSenha) {
            throw new Error("Por favor, preencha todos os campos.");
        }

        // Verifica se a senha tem exatamente 8 dígitos
        if (senha.length !== 8) {
            throw new Error("A senha deve ter exatamente 8 dígitos.");
        }

        // Verifica se as senhas coincidem
        if (senha !== confirmacaoSenha) {
            throw new Error("As senhas não coincidem. Por favor, tente novamente.");
        }

        // Verifica se a turma foi selecionada
        if (turmaID === "") {
            throw new Error("Por favor, selecione uma turma.");
        }

        // Chama a função para criar o aluno e cadastrá-lo na turma
        criarAlunoECadastrar(nome, dataNascimento, endereco, email, turmaID, usuario, senha);

        // Redireciona para a página de alunos após o cadastro
        setTimeout(function() {
            window.location.href = 'index.html';  // Altere para a URL de destino adequada
        }, 500);  // Aguarda 500ms para garantir que o aluno foi adicionado antes de redirecionar
    } catch (error) {
        console.error("Erro no formulário de cadastro:", error.message);
        alert(`Erro: ${error.message}`);
    }
});
