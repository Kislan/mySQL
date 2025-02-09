
document.addEventListener('DOMContentLoaded', async () => {
    const turmaSelect = document.getElementById("turma");
<<<<<<< HEAD
  
    try {
      // Requisição para obter as turmas
      const response = await fetch('http://localhost:3000/api/turma');
      if (!response.ok) {
        throw new Error('Erro ao obter turmas.');
      }
      const turmas = await response.json();
      console.log('Turmas recebidas do servidor:', turmas);
  
      // Populando o select com as turmas
      turmas.forEach(turma => {
        const option = document.createElement("option");
        option.value = turma.id;
        option.textContent = turma.nome;
        turmaSelect.appendChild(option);
      });
=======

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
>>>>>>> 4bd0217 (turmas listadas)
    } catch (error) {
      console.error("Erro ao carregar turmas:", error.message);
      alert("Erro ao carregar turmas. Tente novamente mais tarde.");
    }
<<<<<<< HEAD
  });
  
  // Função para criar aluno e cadastrá-lo
  async function criarAlunoECadastrar(nome, dataNascimento, endereco, email, turmaID, usuario, senha) {
=======
});


// Função para criar aluno e cadastrá-lo
async function criarAlunoECadastrar(nome, dataNascimento, endereco, email, turmaID, usuario, senha) {
>>>>>>> 4bd0217 (turmas listadas)
    try {
      const response = await fetch('http://localhost:3000/api/aluno', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, dataNascimento, endereco, email, usuario, senha, turmaID })
      });
  
      if (!response.ok) {
        const errorDetails = await response.json();
        throw new Error(`Erro ao cadastrar aluno: ${errorDetails.message || 'Erro desconhecido'}`);
      }
  
      const result = await response.json();
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
  
      // Validações
      if (!nome || !dataNascimento || !endereco || !email || !usuario || !senha || !confirmacaoSenha) {
        throw new Error("Por favor, preencha todos os campos.");
      }
  
      if (senha.length !== 8) {
        throw new Error("A senha deve ter exatamente 8 dígitos.");
      }
  
      if (senha !== confirmacaoSenha) {
        throw new Error("As senhas não coincidem.");
      }
  
      if (turmaID === "") {
        throw new Error("Por favor, selecione uma turma.");
      }
  
      // Chama a função para criar o aluno
      criarAlunoECadastrar(nome, dataNascimento, endereco, email, turmaID, usuario, senha);
  
      // Redireciona após o cadastro
      setTimeout(() => {
        window.location.href = 'index.html';
      }, 500);
    } catch (error) {
      console.error("Erro no formulário de cadastro:", error.message);
      alert(`Erro: ${error.message}`);
    }
  });
  