// Classes importadas
import { Aluno } from "../dist/Aluno.js";
import { Professor } from "../dist/Professor.js";
import { Disciplina } from "../dist/Disciplina.js";
import { Turma } from "../dist/Turma.js";

// Turmas
let turma_1A = new Turma("1° ano A", 2024, "Matutino");
let turma_1B = new Turma("1° ano B", 2024, "Vespertino");
let turma_2A = new Turma("2° ano A", 2024, "Matutino");
let turma_2B = new Turma("2° ano B", 2024, "Vespertino");
let turma_3A = new Turma("3° ano A", 2024, "Matutino");
let turma_3B = new Turma("3° ano B", 2024, "Vespertino");

// Professores
const professor1 = new Professor("Carlos Silva", "carlos.silva@email.com", "carlos123", "senha123");
const professor2 = new Professor("Maria Oliveira", "maria.oliveira@email.com", "maria2025", "senha456");
const professor3 = new Professor("João Pereira", "joao.pereira@email.com", "joao987", "senha234");
const professor4 = new Professor("Ana Costa", "ana.costa@email.com", "ana102", "senha143");
const professor5 = new Professor("Lucas Souza", "lucas.souza@email.com", "lucas123", "senha124");
const professor6 = new Professor("Fernanda Lima", "fernanda.lima@email.com", "fernanda123", "senha745");

let professores = [professor1, professor2, professor3, professor4, professor5, professor6];
localStorage.setItem('professores', JSON.stringify(professores));

// Disciplinas
const matematica_manha = new Disciplina("matemática", 80, professor1);
const matematica_tarde = new Disciplina("matemática", 80, professor2);
const fisica_manha = new Disciplina("Física", 80, professor3);
const fisica_tarde = new Disciplina("Física", 80, professor4);
const geografia_manha = new Disciplina("Geografia", 60, professor5);
const geografia_tarde = new Disciplina("Geografia", 60, professor6);

// Adicionando disciplinas às turmas

// Adicionando as disciplinas para as turmas da manhã
turma_1A.adicionarDisciplina(matematica_manha);
turma_1A.adicionarDisciplina(fisica_manha);
turma_1A.adicionarDisciplina(geografia_manha);

turma_2A.adicionarDisciplina(matematica_manha);
turma_2A.adicionarDisciplina(fisica_manha);
turma_2A.adicionarDisciplina(geografia_manha);

turma_3A.adicionarDisciplina(matematica_manha);
turma_3A.adicionarDisciplina(fisica_manha);
turma_3A.adicionarDisciplina(geografia_manha);

// Adicionando as disciplinas para as turmas da tarde
turma_1B.adicionarDisciplina(matematica_tarde);
turma_1B.adicionarDisciplina(fisica_tarde);
turma_1B.adicionarDisciplina(geografia_tarde);

turma_2B.adicionarDisciplina(matematica_tarde);
turma_2B.adicionarDisciplina(fisica_tarde);
turma_2B.adicionarDisciplina(geografia_tarde);

turma_3B.adicionarDisciplina(matematica_tarde);
turma_3B.adicionarDisciplina(fisica_tarde);
turma_3B.adicionarDisciplina(geografia_tarde);

let turmas_2024 = [turma_1A, turma_1B, turma_2A, turma_2B, turma_3A, turma_3B];

// Função para listar as turmas no select
function listar_turmas() {
    try {
        let select = document.getElementById("turma");
        if (!select) throw new Error("Elemento 'turma' não encontrado no DOM.");

        for (let i = 0; i < turmas_2024.length; i++) {
            let novaOpcao = new Option(turmas_2024[i].nome, turmas_2024[i].nome);
            select.options[select.options.length] = novaOpcao;
        }
    } catch (error) {
        console.error("Erro ao listar turmas:", error.message);
        alert("Erro ao carregar as turmas. Tente novamente mais tarde.");
    }
}

// Chama a função para listar as turmas quando o DOM for carregado
document.addEventListener('DOMContentLoaded', function() {
    listar_turmas();
});

// Função para criar aluno e cadastrá-lo
function criarAlunoECadastrar(nome, dataNascimento, endereco, email, turma, usuario, senha) {
    try {
        let aluno = new Aluno(nome, dataNascimento, endereco, email, turma, usuario, senha);

        // Recupera os alunos já cadastrados do localStorage (se houver)
        let alunos = JSON.parse(localStorage.getItem('alunos')) || [];


        // Adiciona o novo aluno ao array de alunos
        alunos.push(aluno);

        // Armazena o array de alunos atualizado no localStorage
        localStorage.setItem('alunos', JSON.stringify(alunos));

        turma.adicionarAluno(aluno);

        // Matricula o aluno nas disciplinas da turma
        turma._disciplinas.forEach(disciplina => {
            turma.matricularAlunoNaDisciplina(aluno, disciplina);
        });

        // Exibe uma mensagem de sucesso
        alert(`Cadastro realizado com sucesso! Estudante ${aluno.nome} foi adicionado(a) à turma ${turma._nome}.`);
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
        const turmaIndex = document.getElementById("turma").value;
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
        if (turmaIndex === "") {
            throw new Error("Por favor, selecione uma turma.");
        }

        // Encontra a turma pelo nome selecionado
        const turma = turmas_2024.find(t => t.nome === turmaIndex);
        if (!turma) throw new Error("Turma não encontrada.");

        // Chama a função para criar o aluno e cadastrá-lo na turma
        criarAlunoECadastrar(nome, dataNascimento, endereco, email, turma, usuario, senha);

        // Redirecionar para a página do aluno
        setTimeout(function() {
            window.location.href = 'index.html';  // Altere para a URL da página do aluno
        }, 500);  // Aguarda 500ms para garantir que o aluno foi adicionado antes de redirecionar
    } catch (error) {
        console.error("Erro no formulário de cadastro:", error.message);
        alert(`Erro: ${error.message}`);
    }
});
