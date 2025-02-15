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

async function verificarUsuarioExistente(usuario) {
  try {
      const response = await fetch('http://localhost:3000/api/aluno');
      const alunos = await response.json();
      
      // Verifica se já existe um aluno com o mesmo nome de usuário
      const usuarioExistente = alunos.find(aluno => aluno.usuario === usuario);
      return usuarioExistente;  // Retorna o aluno se encontrado, caso contrário retorna undefined
  } catch (error) {
      console.error("Erro ao verificar usuário:", error.message);
      alert("Erro ao verificar o nome de usuário. Tente novamente mais tarde.");
      return null;
  }
}

async function associarAlunoAsDisciplinas(aluno_id, turmaId) {
  try {
      // Faz a requisição para pegar as disciplinas associadas à turma
      const response = await fetch('http://localhost:3000/api/turma_disciplina');
      const turma_disciplina = await response.json();
      console.log("disciplina", turma_disciplina)
      if (!turma_disciplina || turma_disciplina.length === 0) {
          alert("Estas turmas não possuem disciplinas associadas.");
          return;
      }

      // Filtra as disciplinas pela turmaId
      let disciplinas = [];
      for (let t_d of turma_disciplina) {
          console.log(t_d);
          if (t_d.turma_id == turmaId) {
              disciplinas.push(t_d.disciplina_id);
              console.log(disciplinas);
          }
      }

      console.log('Disciplinas associadas à turma:', disciplinas);

      if (disciplinas.length === 0) {
          alert("Não há disciplinas associadas a esta turma.");
          return;
      }

      // Agora associamos o aluno a cada disciplina
      for (let disciplina_id of disciplinas) {
          try {
              const associarResponse = await fetch('http://localhost:3000/api/aluno_disciplina', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ aluno_id: aluno_id, disciplina_id: disciplina_id })
              });

              if (!associarResponse.ok) {
                  const errorDetails = await associarResponse.json();
                  console.error(`Erro ao associar aluno à disciplina ${disciplina_id}:`, errorDetails);
                  // Aqui o código continua mesmo com o erro
                  continue;
              }

              console.log(`Aluno ${aluno_id} associado à disciplina ${disciplina_id}`);
          } catch (err) {
              console.error(`Erro ao associar aluno à disciplina ${disciplina_id}:`, err.message);
              // Aqui o código continua mesmo com o erro
              continue;
          }
      }

      alert("Aluno associado às disciplinas da turma com sucesso!");
  } catch (error) {
      console.error("Erro ao associar aluno às disciplinas:", error.message);
      alert(`Erro ao associar aluno às disciplinas: ${error.message}`);
  }
}

async function criarAlunoECadastrar(nome, data_nascimento, endereco, email, usuario, senha, turma_id) {
  try {
      // Verifica se o nome de usuário já existe
      const usuarioExistente = await verificarUsuarioExistente(usuario);
      
      if (usuarioExistente) {
          alert("O nome de usuário escolhido já está em uso. Por favor, escolha outro nome de usuário.");
          return;  // Não segue com o cadastro se o usuário já existir
      }
      
      // Se o nome de usuário não existe, continua o processo de criação do aluno
      const response = await fetch('http://localhost:3000/api/aluno', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ nome, data_nascimento, endereco, email, usuario, senha, turma_id })
      });

      if (!response.ok) {
          const errorDetails = await response.json();
          throw new Error(`Erro ao cadastrar aluno: ${errorDetails.message || 'Erro desconhecido'}`);
      }

      const result = await response.json();
      await associarAlunoAsDisciplinas(result.id, turma_id);
      alert(`Cadastro realizado com sucesso! Estudante ${nome} foi matriculado(a) na turma.`);
      console.log('Aluno cadastrado com ID:', result.id);

      // Redireciona após o cadastro ser realizado com sucesso
      window.location.href = 'index.html';  // Redireciona para a página de índice após o cadastro com sucesso.
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
      criarAlunoECadastrar(nome, dataNascimento, endereco, email, usuario, senha, turmaID);
      
  } catch (error) {
      console.error("Erro no formulário de cadastro:", error.message);
      alert(`Erro: ${error.message}`);
  }
});
