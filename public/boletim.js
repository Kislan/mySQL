/*import { Aluno } from "../dist/Aluno.js";
import { Disciplina } from "../dist/Disciplina.js";
import { Nota } from "../dist/Nota.js";*/

let aluno_carregado;
let turma_carregada;
let disciplinas_carregadas=[];
let notas_carregadas=[];
let professores_carregados=[];
let frequencias_carregadas=[];

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
            let aluno = alunos.find(al => al.usuario === aluno_nomeUsuario.usuario)

            if (!aluno) {
                alert("O aluno(a) não possui disciplinas associadas a ele(a).");
                return;
            }
            
            // Exibe o nome do aluno
            document.getElementById('nomeAluno').textContent = aluno.nome;
            aluno_carregado=aluno;

            const response_al = await fetch('http://localhost:3000/api/aluno_disciplina');
            const aluno_disciplina = await response_al.json();
        
            if (!aluno_disciplina || aluno_disciplina.length === 0) {
                alert("O aluno(a) não possui disciplinas associadas a ele(a).");
                return;
            }
            
            let disciplinas = [];
            for (let t_d of aluno_disciplina) {
                if (t_d.aluno_id == aluno_carregado.id) {
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
            
            const response_notas = await fetch('http://localhost:3000/api/nota');
            if (!response_notas.ok) {
                throw new Error('Falha ao carregar notas.');
            }
            const notas = await response_notas.json();

            notas.forEach(nota => {
                if (nota.aluno_id==aluno_carregado.id){
                    notas_carregadas.push(nota)
                }
            });
        } else {
            throw new Error('Aluno não encontrado no localStorage');
        }

        exibirBoletim();
    } catch (error) {
        console.error("Erro ao recuperar o aluno logado:", error);
        alert("Ocorreu um erro ao carregar os dados do aluno. Por favor, tente novamente.");
    }
});

// Função para exibir o boletim
function exibirBoletim() {
    // Verifica se o aluno está carregado
    if (!aluno_carregado) return;

    // Construção do boletim
    try {
        let boletimDiv = document.getElementById("boletim_grade");
        boletimDiv.innerHTML = '';
        let boletimHtml = '';

        // Criando a tabela para o boletim
        boletimHtml += `
            <table border="1" cellpadding="10" cellspacing="0" style="border-collapse: collapse; width: 100%; text-align: center;">
                <thead>
                    <tr>
                        <th>Disciplina</th>
                        <th>Total de Aulas</th>
                        <th>Faltas</th>
                        <th>Frequência (%)</th>
                        <th>1º Bimestre</th>
                        <th>2º Bimestre</th>
                        <th>3º Bimestre</th>
                        <th>4º Bimestre</th>
                        <th>Média Final</th>
                    </tr>
                </thead>
                <tbody>`;

        // Itera sobre as disciplinas para exibir suas informações
        disciplinas_carregadas.forEach(disciplina => {
            let soma_n1=[]
            let soma_n2=[]
            let soma_n3=[]
            let soma_n4=[]
            let nota1 ;
            let nota2 ;
            let nota3;
            let nota4 ; 
            for (let nota of notas_carregadas){
                if (nota.disciplina_id == disciplina.id && nota.bimestre == 1){
                    soma_n1.push(nota)
                }
                if( nota.disciplina_id == disciplina.id && nota.bimestre == 2){
                    soma_n2.push(nota)
                }
                if(nota.disciplina_id == disciplina.id && nota.bimestre == 3 ){
                    soma_n3.push(nota)
                }
                if (nota.disciplina_id == disciplina.id && nota.bimestre == 4){
                    soma_n4.push(nota)
                }
            }
            if (soma_n1.length ==0 ){
                nota1='-';
            } else {
                nota1 = soma_n1.reduce((acc, obj) => acc + parseFloat(obj.valorNota), 0);
            }
            if (soma_n2.length ==0 ){
                nota2='-';
            } else {
                nota2 = soma_n2.reduce((acc, obj) => acc + parseFloat(obj.valorNota), 0);
            }
            if (soma_n3.length ==0 ){
                nota3='-';
            } else {
                nota3 = soma_n3.reduce((acc, obj) => acc + parseFloat(obj.valorNota), 0);
            }
            if (soma_n4.length ==0 ){
                nota4='-';
            } else {
                nota4 = soma_n2.reduce((acc, obj) => acc + parseFloat(obj.valorNota), 0);
            }
            /*let frequencia = aluno_recriado.calcularFrequencia(disciplina);
            if (frequencia === -1 || !frequencia) {
                frequencia = "-";
            }*/

            let aulas_totais = '-'; // Este valor precisa ser fornecido ou calculado
            let faltas_totais = '-'; // Este valor precisa ser fornecido ou calculado

            // Cálculo da média final
            /*let media_final = '-';
            if (nota1 !== undefined && nota2 !== undefined && nota3 !== undefined && nota4 !== undefined) {
                media_final = ((nota1 + nota2 + nota3 + nota4) / 4).toFixed(2); // Média dos 4 bimestres
            }*/

            // Adicionando a linha da disciplina na tabela
            boletimHtml += `
                <tr>
                    <td>${disciplina.nome}</td>
                    <td>${aulas_totais}</td>
                    <td>${faltas_totais}</td>
                    <td></td>
                    <td>${nota1}</td>
                    <td>${nota2}</td>
                    <td>${nota3}</td>
                    <td>${nota4}</td>
                    <td></td>
                </tr>`;
        });

        boletimHtml += `
                </tbody>
            </table>`;

        // Adicionando o conteúdo da tabela à div
        boletimDiv.innerHTML = boletimHtml;

    } catch (error) {
        console.error("Erro ao gerar o boletim:", error);
        alert("Ocorreu um erro ao gerar o boletim.");
    }
}



/*

    let aluno_recriado;
    try {
        aluno_recriado = new Aluno(
            aluno_carregado.nome,
            aluno_carregado.data_nascimento,
            aluno_carregado.endereco,
            aluno_carregado.email,
            turma_aluno,
            aluno_carregado.usuario,
            aluno_carregado .senha
        );
        turma_aluno.adicionarAluno(aluno_recriado);
    } catch (error) {
        console.error("Erro ao criar o aluno:", error);
        alert("Erro ao carregar os dados do aluno.");
        return;
    }

    disciplinas_aluno.forEach(disciplina => {
        try {
            turma_aluno.matricularAlunoNaDisciplina(aluno_recriado, disciplina);
        } catch (error) {
            console.error(`Erro ao matricular aluno na disciplina ${disciplina._nome}:`, error);
        }
    });

    // Variáveis para armazenar as aulas e faltas
    let aulasDadasExistentes = 0;
    let faltasExistentes = 0;

    // Verifica se o aluno já tem dados de aulas e faltas registrados
    try {
        if (Object.keys(aluno._aulasEFaltas).length > 0) {
            turma_aluno._disciplinas.forEach(disciplina => {
                if (aluno._aulasEFaltas[disciplina._nome]) {
                    const dadosAntigos = aluno._aulasEFaltas[disciplina._nome];
                    aulasDadasExistentes = dadosAntigos.aulasDadas || 0;
                    faltasExistentes = dadosAntigos.faltas || 0;

                    aluno_recriado.registrarAulasEFaltas(disciplina, aulasDadasExistentes, faltasExistentes);
                    console.log(`Atualizando - Disciplina: ${disciplina._nome}, Aulas Dadas: ${aulasDadasExistentes}, Faltas: ${faltasExistentes}`);
                }
            });
        }
    } catch (error) {
        console.error("Erro ao processar as aulas e faltas do aluno:", error);
    }

    // Processamento das notas
    try {
        if (aluno._notas.length > 0) {
            aluno._notas.forEach(nota => {
                let tipoavaliação = nota._tipoAvaliacao;
                let valor = nota._valorNota;
                let bimestre = nota._bimestre;
                let disci_nota = '';
    
                turma_aluno._disciplinas.forEach(d => {
                    if (d._nome === nota._disciplina._nome) {
                        disci_nota = d;
                    }
                });
    
                let nota_nova = new Nota(valor, disci_nota, aluno_recriado, tipoavaliação, bimestre);
                aluno_recriado.adicionarNota(nota_nova);
            });
        }
    } catch (error) {
        console.error("Erro ao processar as notas do aluno:", error);
    }
*/

/*                 
                    <td>${frequencia}</td>
                    <td>${nota1}</td>
                    <td>${nota2}</td>
                    <td>${nota3}</td>
                    <td>${nota4}</td>
                    <td>${media_final}</td>
*/