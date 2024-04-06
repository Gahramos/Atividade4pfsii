-- phpMyAdmin SQL Dump
-- version 5.1.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Tempo de geração: 25/03/2024 às 22:18
-- Versão do servidor: 8.0.34-0ubuntu0.22.04.1
-- Versão do PHP: 8.1.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `backendaluno10pfsii`
--

-- --------------------------------------------------------

--
-- Estrutura para tabela `categoria_produto`
--

CREATE TABLE `categoria_produto` (
  `codigo` int NOT NULL,
  `categoria` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `categoria_produto`
--

INSERT INTO `categoria_produto` (`codigo`, `categoria`) VALUES
(1, 'Alimento'),
(2, 'Brinquedo'),
(3, 'Móveis'),
(4, 'Diversos'),
(5, 'Teste'),
(6, 'teste2');

-- --------------------------------------------------------

--
-- Estrutura para tabela `cidades`
--

CREATE TABLE `cidades` (
  `codigo` int NOT NULL,
  `nome` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `cidades`
--

INSERT INTO `cidades` (`codigo`, `nome`) VALUES
(5, 'Presidente Prudente'),
(9, 'Alvares Machado'),
(19, 'Presidente Venceslau');

-- --------------------------------------------------------

--
-- Estrutura para tabela `doacao`
--

CREATE TABLE `doacao` (
  `codigo` int NOT NULL,
  `dataDoacao` date NOT NULL,
  `cpfPessoa` varchar(16) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `doacao_produto`
--

CREATE TABLE `doacao_produto` (
  `codigoProduto` bigint UNSIGNED NOT NULL,
  `codigoDoacao` int NOT NULL,
  `quantidade` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `motoristas`
--

CREATE TABLE `motoristas` (
  `cpf` varchar(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `nome` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `nascimento` varchar(11) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `endereco` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `cidade` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `telefone` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `categoria` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `profissao1` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `motoristas`
--

INSERT INTO `motoristas` (`cpf`, `nome`, `nascimento`, `endereco`, `cidade`, `telefone`, `email`, `categoria`, `profissao1`) VALUES
('45805694824', ' Gabriel Ramos', '1997-09-25', 'Rua Olavo Bilac 257', 'Alvares Machado', '18998132224', 'gabriel@gmail.com', 'Carreteiro', '45845845822'),
('45845845824', ' Marcos Ramos', '2001-10-10', 'Rua Japao 123', 'Presidente Venceslau', '18998142224', 'marcos@gmail.com', 'Carreteiro', '45845845854');

-- --------------------------------------------------------

--
-- Estrutura para tabela `produto`
--

CREATE TABLE `produto` (
  `codigo` bigint UNSIGNED NOT NULL,
  `nome` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `descricao` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `categoria` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `produto`
--

INSERT INTO `produto` (`codigo`, `nome`, `descricao`, `categoria`) VALUES
(2, 'Arroz', 'Unidade', 'Arroz anceli 5kg tipo 1 agulhinha', 1),
(3, 'Boneca', 'Peça', 'Boneca barbie surfista ', 2),
(4, 'Armário de cozinha', 'Unidade', 'Armário de cozinha para embutir', 3),
(5, 'Leite Condensado', 'Unidade', 'Embalagem leite condensado moça 395g', 1),
(6, 'Teste', 'Unidade', 'TEste', 5),
(7, 'teste2', 'Unidade', 'teste2', 6);

--
-- Índices para tabelas despejadas
--

--
-- Índices de tabela `categoria_produto`
--
ALTER TABLE `categoria_produto`
  ADD PRIMARY KEY (`codigo`);

--
-- Índices de tabela `cidades`
--
ALTER TABLE `cidades`
  ADD PRIMARY KEY (`codigo`);

--
-- Índices de tabela `doacao`
--
ALTER TABLE `doacao`
  ADD PRIMARY KEY (`codigo`),
  ADD KEY `cpfPessoa` (`cpfPessoa`);

--
-- Índices de tabela `doacao_produto`
--
ALTER TABLE `doacao_produto`
  ADD PRIMARY KEY (`codigoProduto`,`codigoDoacao`),
  ADD KEY `codigoDoacao` (`codigoDoacao`);

--
-- Índices de tabela `motoristas`
--
ALTER TABLE `motoristas`
  ADD PRIMARY KEY (`cpf`);

--
-- Índices de tabela `produto`
--
ALTER TABLE `produto`
  ADD PRIMARY KEY (`codigo`),
  ADD UNIQUE KEY `codigo` (`codigo`),
  ADD KEY `FK_CATEGORIA_PRODUTO` (`categoria`);

--
-- AUTO_INCREMENT para tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `categoria_produto`
--
ALTER TABLE `categoria_produto`
  MODIFY `codigo` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de tabela `cidades`
--
ALTER TABLE `cidades`
  MODIFY `codigo` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT de tabela `doacao`
--
ALTER TABLE `doacao`
  MODIFY `codigo` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de tabela `produto`
--
ALTER TABLE `produto`
  MODIFY `codigo` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Restrições para tabelas despejadas
--

--
-- Restrições para tabelas `doacao`
--
ALTER TABLE `doacao`
  ADD CONSTRAINT `doacao_ibfk_1` FOREIGN KEY (`cpfPessoa`) REFERENCES `motoristas` (`cpf`);

--
-- Restrições para tabelas `doacao_produto`
--
ALTER TABLE `doacao_produto`
  ADD CONSTRAINT `doacao_produto_ibfk_1` FOREIGN KEY (`codigoProduto`) REFERENCES `produto` (`codigo`),
  ADD CONSTRAINT `doacao_produto_ibfk_2` FOREIGN KEY (`codigoDoacao`) REFERENCES `doacao` (`codigo`);

--
-- Restrições para tabelas `produto`
--
ALTER TABLE `produto`
  ADD CONSTRAINT `FK_CATEGORIA_PRODUTO` FOREIGN KEY (`categoria`) REFERENCES `categoria_produto` (`codigo`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
