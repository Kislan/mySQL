-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 10-Fev-2025 às 12:50
-- Versão do servidor: 10.4.27-MariaDB
-- versão do PHP: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `sistema_escolar`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `aluno`
--

CREATE TABLE `aluno` (
  `id` int(11) NOT NULL,
  `nome` varchar(255) NOT NULL,
  `data_nascimento` date NOT NULL,
  `endereco` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `usuario` varchar(100) NOT NULL,
  `senha` varchar(255) NOT NULL,
  `turma_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Extraindo dados da tabela `aluno`
--

INSERT INTO `aluno` (`id`, `nome`, `data_nascimento`, `endereco`, `email`, `usuario`, `senha`, `turma_id`) VALUES
(1, 'Kislan Lima', '2007-06-13', 'arenã', 'kislan@escolar.ifrn.edu.br', 'kislanL1', '1234lima', 3),
(2, 'Mariane Yasmim', '2008-01-13', 'monte alegre', 'mariane@escolar.ifrn.edu.br', 'minmari', '1234mari', 3),
(3, 'Rayka Alessandra', '2007-05-13', 'parnamirim', 'rayka.alessandra@escolar.ifrn.edu.br', 'rayka999', '1234ralg', 3),
(4, 'Ludmila Tawane', '2007-10-05', 'São José', 'ludmila@escolar.ifrn.edu.br', 'lud1234', 'ludmila1', 3),
(5, 'Micael França', '2007-10-10', 'Natal-RN', 'micael@escolar.ifrn.edu.br', 'micael16', 'mica1234', 4),
(6, 'Abimael Juvino', '2007-01-28', 'parnamirim', 'abimael@escolar.ifrn.edu.br', 'abimael18', 'biel1234', 3),
(7, 'Stefany Lopes', '2007-10-11', 'parnamirim', 'stefany@escolar.ifrn.edu.br', 'stefany17', 'fany1234', 3),
(8, 'Gustavo Andrey', '2006-10-10', 'parnamirim', 'abimael@escolar.ifrn.edu.br', 'gustavo18', 'gusta123', 3),
(9, 'agata', '2007-03-15', 'Natal-RN', 'agata@escolar.ifrn.edu.br', 'agata123', '1234gata', 3),
(10, 'agata', '2007-10-10', 'Natal-RN', 'agata@escolar.ifrn.edu.br', 'agata123', '12345678', 6),
(11, 'Abimael Juvino', '2008-10-10', 'parnamirim', 'abimael@escolar.ifrn.edu.br', 'AbimaelJuvino', '1234lkjh', 2),
(12, 'Romulo Alexandre ', '2005-02-08', 'parnamirim-RN', 'romulo@escolar.ifrn.edu.br', 'rourou', '1234ralg', 2);

-- --------------------------------------------------------

--
-- Estrutura da tabela `aluno_disciplina`
--

CREATE TABLE `aluno_disciplina` (
  `id` int(11) NOT NULL,
  `aluno_id` int(11) DEFAULT NULL,
  `disciplina_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Extraindo dados da tabela `aluno_disciplina`
--

INSERT INTO `aluno_disciplina` (`id`, `aluno_id`, `disciplina_id`) VALUES
(1, 5, 2),
(2, 6, 1),
(3, 7, 1),
(4, 8, 1),
(5, 9, 1),
(6, 10, 2),
(7, 11, 2),
(8, 12, 2),
(9, 12, 4),
(10, 12, 6);

-- --------------------------------------------------------

--
-- Estrutura da tabela `disciplina`
--

CREATE TABLE `disciplina` (
  `id` int(11) NOT NULL,
  `nome` varchar(255) NOT NULL,
  `quantidade_aulas` int(11) NOT NULL,
  `professor_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Extraindo dados da tabela `disciplina`
--

INSERT INTO `disciplina` (`id`, `nome`, `quantidade_aulas`, `professor_id`) VALUES
(1, 'Matemática', 80, 1),
(2, 'Matemática', 80, 2),
(3, 'Física', 80, 3),
(4, 'Física', 80, 4),
(5, 'Geografia', 60, 5),
(6, 'Geografia', 60, 6);

-- --------------------------------------------------------

--
-- Estrutura da tabela `nota`
--

CREATE TABLE `nota` (
  `id` int(11) NOT NULL,
  `valorNota` decimal(5,2) NOT NULL,
  `tipo_avaliacao` varchar(100) NOT NULL,
  `bimestre` int(11) NOT NULL,
  `aluno_id` int(11) DEFAULT NULL,
  `disciplina_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura da tabela `professor`
--

CREATE TABLE `professor` (
  `id` int(11) NOT NULL,
  `nome` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `nome_usuario` varchar(255) NOT NULL,
  `senha` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Extraindo dados da tabela `professor`
--

INSERT INTO `professor` (`id`, `nome`, `email`, `nome_usuario`, `senha`) VALUES
(1, 'Carlos Silva', 'carlos.silva@email.com', 'carlos123', 'senha123'),
(2, 'Maria Oliveira', 'maria.oliveira@email.com', 'maria2025', 'senha456'),
(3, 'João Pereira', 'joao.pereira@email.com', 'joao987', 'senha234'),
(4, 'Ana Costa', 'ana.costa@email.com', 'ana102', 'senha143'),
(5, 'Lucas Souza', 'lucas.souza@email.com', 'lucas123', 'senha124'),
(6, 'Fernanda Lima', 'fernanda.lima@email.com', 'fernanda123', 'senha745');

-- --------------------------------------------------------

--
-- Estrutura da tabela `registro_frequencia`
--

CREATE TABLE `registro_frequencia` (
  `id` int(11) NOT NULL,
  `aluno_id` int(11) DEFAULT NULL,
  `disciplina_id` int(11) DEFAULT NULL,
  `aulas_dadas` int(11) NOT NULL,
  `faltas` int(11) NOT NULL,
  `data` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura da tabela `turma`
--

CREATE TABLE `turma` (
  `id` int(11) NOT NULL,
  `nome` varchar(255) NOT NULL,
  `ano_letivo` int(11) NOT NULL,
  `turno` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Extraindo dados da tabela `turma`
--

INSERT INTO `turma` (`id`, `nome`, `ano_letivo`, `turno`) VALUES
(1, '1° ano A', 2024, 'Matutino'),
(2, '1° ano B', 2024, 'Vespertino'),
(3, '2° ano A', 2024, 'Matutino'),
(4, '2° ano B', 2024, 'Vespertino'),
(5, '3° ano A', 2024, 'Matutino'),
(6, '3° ano B', 2024, 'Vespertino');

-- --------------------------------------------------------

--
-- Estrutura da tabela `turma_disciplina`
--

CREATE TABLE `turma_disciplina` (
  `id` int(11) NOT NULL,
  `turma_id` int(11) NOT NULL,
  `disciplina_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Extraindo dados da tabela `turma_disciplina`
--

INSERT INTO `turma_disciplina` (`id`, `turma_id`, `disciplina_id`) VALUES
(1, 1, 1),
(2, 1, 3),
(3, 1, 5),
(4, 3, 1),
(5, 3, 3),
(6, 3, 5),
(7, 5, 1),
(8, 5, 3),
(9, 5, 5),
(10, 2, 2),
(11, 2, 4),
(12, 2, 6),
(13, 4, 2),
(14, 4, 4),
(15, 4, 6),
(16, 6, 2),
(17, 6, 4),
(18, 6, 6);

--
-- Índices para tabelas despejadas
--

--
-- Índices para tabela `aluno`
--
ALTER TABLE `aluno`
  ADD PRIMARY KEY (`id`),
  ADD KEY `turma_id` (`turma_id`);

--
-- Índices para tabela `aluno_disciplina`
--
ALTER TABLE `aluno_disciplina`
  ADD PRIMARY KEY (`id`),
  ADD KEY `aluno_id` (`aluno_id`),
  ADD KEY `disciplina_id` (`disciplina_id`);

--
-- Índices para tabela `disciplina`
--
ALTER TABLE `disciplina`
  ADD PRIMARY KEY (`id`),
  ADD KEY `professor_id` (`professor_id`);

--
-- Índices para tabela `nota`
--
ALTER TABLE `nota`
  ADD PRIMARY KEY (`id`),
  ADD KEY `aluno_id` (`aluno_id`),
  ADD KEY `disciplina_id` (`disciplina_id`);

--
-- Índices para tabela `professor`
--
ALTER TABLE `professor`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `nome_usuario` (`nome_usuario`);

--
-- Índices para tabela `registro_frequencia`
--
ALTER TABLE `registro_frequencia`
  ADD PRIMARY KEY (`id`),
  ADD KEY `aluno_id` (`aluno_id`),
  ADD KEY `disciplina_id` (`disciplina_id`);

--
-- Índices para tabela `turma`
--
ALTER TABLE `turma`
  ADD PRIMARY KEY (`id`);

--
-- Índices para tabela `turma_disciplina`
--
ALTER TABLE `turma_disciplina`
  ADD PRIMARY KEY (`id`),
  ADD KEY `turma_id` (`turma_id`),
  ADD KEY `disciplina_id` (`disciplina_id`);

--
-- AUTO_INCREMENT de tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `aluno`
--
ALTER TABLE `aluno`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT de tabela `aluno_disciplina`
--
ALTER TABLE `aluno_disciplina`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de tabela `disciplina`
--
ALTER TABLE `disciplina`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de tabela `nota`
--
ALTER TABLE `nota`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `professor`
--
ALTER TABLE `professor`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de tabela `registro_frequencia`
--
ALTER TABLE `registro_frequencia`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `turma`
--
ALTER TABLE `turma`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de tabela `turma_disciplina`
--
ALTER TABLE `turma_disciplina`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- Restrições para despejos de tabelas
--

--
-- Limitadores para a tabela `aluno`
--
ALTER TABLE `aluno`
  ADD CONSTRAINT `aluno_ibfk_1` FOREIGN KEY (`turma_id`) REFERENCES `turma` (`id`);

--
-- Limitadores para a tabela `aluno_disciplina`
--
ALTER TABLE `aluno_disciplina`
  ADD CONSTRAINT `aluno_disciplina_ibfk_1` FOREIGN KEY (`aluno_id`) REFERENCES `aluno` (`id`),
  ADD CONSTRAINT `aluno_disciplina_ibfk_2` FOREIGN KEY (`disciplina_id`) REFERENCES `disciplina` (`id`);

--
-- Limitadores para a tabela `disciplina`
--
ALTER TABLE `disciplina`
  ADD CONSTRAINT `disciplina_ibfk_1` FOREIGN KEY (`professor_id`) REFERENCES `professor` (`id`) ON DELETE CASCADE;

--
-- Limitadores para a tabela `nota`
--
ALTER TABLE `nota`
  ADD CONSTRAINT `nota_ibfk_1` FOREIGN KEY (`aluno_id`) REFERENCES `aluno` (`id`),
  ADD CONSTRAINT `nota_ibfk_2` FOREIGN KEY (`disciplina_id`) REFERENCES `disciplina` (`id`);

--
-- Limitadores para a tabela `registro_frequencia`
--
ALTER TABLE `registro_frequencia`
  ADD CONSTRAINT `registro_frequencia_ibfk_1` FOREIGN KEY (`aluno_id`) REFERENCES `aluno` (`id`),
  ADD CONSTRAINT `registro_frequencia_ibfk_2` FOREIGN KEY (`disciplina_id`) REFERENCES `disciplina` (`id`);

--
-- Limitadores para a tabela `turma_disciplina`
--
ALTER TABLE `turma_disciplina`
  ADD CONSTRAINT `turma_disciplina_ibfk_1` FOREIGN KEY (`turma_id`) REFERENCES `turma` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `turma_disciplina_ibfk_2` FOREIGN KEY (`disciplina_id`) REFERENCES `disciplina` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
