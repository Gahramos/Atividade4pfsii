-- Estrutura para tabela `categoria_premio`
--

CREATE TABLE `categoria_premio` (
  `codigo` int NOT NULL,
  `categoria` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `categoria_premio`
--

INSERT INTO `categoria_premio` (`codigo`, `categoria`) VALUES
(1, 'Sorteio mensal'),
(2, 'Programa Zero e Mais'),
(3, 'Campanha Ipiranga')


-- --------------------------------------------------------

--
-- Estrutura para tabela `cidades`
--

CREATE TABLE `cidades` (
  `codigo` int NOT NULL,
  `nome` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `cidades`
--

INSERT INTO `cidades` (`codigo`, `nome`) VALUES
(5, 'Rancharia'),
(9, 'Alvares Machado'),
(10, 'Presidente Prudente')


-- --------------------------------------------------------

--
-- Estrutura para tabela `premiacao`
--

CREATE TABLE `premiacao` (
  `codigo` int NOT NULL,
  `dataPremiacao` date NOT NULL,
  `cpfMotorista` varchar(16) COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `premiacao`
--

INSERT INTO `premiacao` (`codigo`, `dataPremiacao`, `cpfMotorista`) VALUES
(10, '2024-04-01', '45845845811'),
(11, '2024-04-04', '45845845957'),


-- --------------------------------------------------------

--
-- Estrutura para tabela `premiacao_premio`
--

CREATE TABLE `premiacao_premio` (
  `codigoPremio` bigint UNSIGNED NOT NULL,
  `codigoPremiacao` int NOT NULL,
  `quantidade` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `premiacao_premio`
--

INSERT INTO `premiacao_premio` (`codigoPremio`, `codigoPremiacao`, `quantidade`) VALUES
(3, 10, 1),
(3, 11, 1),
(4, 11, 1),

-- --------------------------------------------------------

--
-- Estrutura para tabela `Motoristas`
--

CREATE TABLE `motoristas` (
  `cpf` varchar(15) COLLATE utf8mb4_general_ci NOT NULL,
  `nome` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `nascimento` varchar(11) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `endereco` varchar(200) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `cidade` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `telefone` varchar(20) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `email` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `categoria` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `cnh` varchar(15) COLLATE utf8mb4_general_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `motoristas`
--

INSERT INTO `motoristas` (`cpf`, `nome`, `nascimento`, `endereco`, `cidade`, `telefone`, `email`, `categoria`, `cnh`) VALUES
('45805694824', ' Gabriel Ramos', '1997-09-25', 'Rua Olavo Bilac 257', 'Alvares Machado', '18998132224', 'gabriel@gmail.com', 'Carreteiro', '45845845822'),
('45845845824', ' Marcos Ramos', '2001-10-10', 'Rua Japao 123', 'Presidente Venceslau', '18998142224', 'marcos@gmail.com', 'Carreteiro', '95445845854');

-- --------------------------------------------------------

--
-- Estrutura para tabela `premio`
--

CREATE TABLE `premio` (
  `codigo` bigint UNSIGNED NOT NULL,
  `nome` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `descricao` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `categoria` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `premio`
--

INSERT INTO `premio` (`codigo`, `nome`, `descricao`, `categoria`) VALUES 
(3, 'Cesta basica', 'O motorista vencedor do sorteio irá  uma cesta básica por não ter cometido nenhuma violação durante o mês.	', 1),
(4, 'Adicional de R$ 200,00 no salário', 'Adicional de duzentos reais no salário para o motorista que não atingir nenhuma violação de velociadade, estouro de jornada durante o mês.', 2),
(5, 'Premiação de R$ 4.000,00', 'Prêmio no valor de quatro mil reais para o vencedor da campanha com o tema "Maio Amarelo"', 3)


--
-- Índices para tabelas despejadas
--

--
-- Índices de tabela `categoria_premio`
--
ALTER TABLE `categoria_premio`
  ADD PRIMARY KEY (`codigo`);

--
-- Índices de tabela `cidades`
--
ALTER TABLE `cidades`
  ADD PRIMARY KEY (`codigo`);

--
-- Índices de tabela `premiacao`
--
ALTER TABLE `premiacao`
  ADD PRIMARY KEY (`codigo`),
  ADD KEY `cpfMotorista` (`cpfMotorista`);

--
-- Índices de tabela `premiacao_premio`
--
ALTER TABLE `premiacao_premio`
  ADD PRIMARY KEY (`codigopremio`,`codigoPremiacao`),
  ADD KEY `codigoPremiacao` (`codigoPremiacao`);

--
-- Índices de tabela `motoristas`
--
ALTER TABLE `motoristas`
  ADD PRIMARY KEY (`cpf`);

--
-- Índices de tabela `premio`
--
ALTER TABLE `premio`
  ADD PRIMARY KEY (`codigo`),
  ADD UNIQUE KEY `codigo` (`codigo`),
  ADD KEY `FK_CATEGORIA_PREMIO` (`categoria`);

--
-- AUTO_INCREMENT para tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `categoria_premio`
--
ALTER TABLE `categoria_premio`
  MODIFY `codigo` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de tabela `cidades`
--
ALTER TABLE `cidades`
  MODIFY `codigo` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT de tabela `premiacao`
--
ALTER TABLE `premiacao`
  MODIFY `codigo` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de tabela `premio`
--
ALTER TABLE `premio`
  MODIFY `codigo` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Restrições para tabelas despejadas
--

--
-- Restrições para tabelas `premiacao`
--
ALTER TABLE `premiacao`
  ADD CONSTRAINT `premiacao_ibfk_1` FOREIGN KEY (`cpfMotorista`) REFERENCES `motoristas` (`cpf`);

--
-- Restrições para tabelas `premiacao_premio`
--
ALTER TABLE `premiacao_premio`
  ADD CONSTRAINT `premiacao_premio_ibfk_1` FOREIGN KEY (`codigoPremio`) REFERENCES `premio` (`codigo`),
  ADD CONSTRAINT `premiacao_premio_ibfk_2` FOREIGN KEY (`codigoPremiacao`) REFERENCES `premiacao` (`codigo`);

--
-- Restrições para tabelas `premio`
--
ALTER TABLE `premio`
  ADD CONSTRAINT `FK_CATEGORIA_PREMIO` FOREIGN KEY (`categoria`) REFERENCES `categoria_premio` (`codigo`);
