-- Estrutura para tabela `categoria_produto`
--

CREATE TABLE `categoria_produto` (
  `codigo` int NOT NULL,
  `categoria` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL
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
  `nome` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `cidades`
--

INSERT INTO `cidades` (`codigo`, `nome`) VALUES
(5, 'Rancharia'),
(9, 'Alvares Machado'),
(10, 'Nantes'),
(15, 'Palotina'),
(17, 'Araraquara');

-- --------------------------------------------------------

--
-- Estrutura para tabela `doacao`
--

CREATE TABLE `doacao` (
  `codigo` int NOT NULL,
  `dataDoacao` date NOT NULL,
  `cpfPessoa` varchar(16) COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `doacao`
--

INSERT INTO `doacao` (`codigo`, `dataDoacao`, `cpfPessoa`) VALUES
(1, '2023-07-24', '0000000011'),
(2, '2023-09-05', '0000000011'),
(4, '2023-10-10', '0000000011'),
(5, '2023-10-18', '78955578744'),
(6, '2023-09-24', '00000000001'),
(7, '2023-10-16', '00000000001'),
(8, '2023-10-16', '00000000001'),
(9, '2023-10-27', '0000000011');

-- --------------------------------------------------------

--
-- Estrutura para tabela `doacao_produto`
--

CREATE TABLE `doacao_produto` (
  `codigoProduto` bigint UNSIGNED NOT NULL,
  `codigoDoacao` int NOT NULL,
  `quantidade` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `doacao_produto`
--

INSERT INTO `doacao_produto` (`codigoProduto`, `codigoDoacao`, `quantidade`) VALUES
(2, 1, 0),
(2, 4, 2),
(2, 6, 1),
(2, 7, 1),
(3, 4, 4),
(3, 9, 1),
(4, 2, 1),
(4, 4, 1),
(4, 5, 1),
(4, 9, 1),
(6, 7, 2),
(6, 8, 1),
(7, 8, 4);

-- --------------------------------------------------------

--
-- Estrutura para tabela `pessoas`
--

CREATE TABLE `pessoas` (
  `cpf` varchar(15) COLLATE utf8mb4_general_ci NOT NULL,
  `nome` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `nascimento` varchar(11) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `endereco` varchar(200) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `cidade` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `telefone` varchar(20) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `email` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `categoria` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `profissao1` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `pessoas`
--

INSERT INTO `pessoas` (`cpf`, `nome`, `nascimento`, `endereco`, `cidade`, `telefone`, `email`, `categoria`, `profissao1`) VALUES
('00000000001', ' teste', '1989-07-06', 'rua teste ', 'Presidente Prudente', '18999990000', 'teste@teste.com.br', 'Prestador', 'Tecnico'),
('0000000011', ' Alexandre Gutierry', '2011-11-11', 'Rua 11, 11', 'Eleven cityyyy', '11111111111', 'ale@11.com', 'Prestador', 'Tecnico'),
('35710571806', 'Francisco Carlos Souza Junior', '1987-10-25', 'Rua Maria Aparecida 467', 'Presidente Prudente', '(18) 98809-6903', 'gerencia.digitalcelulares@hotmail.com', 'Prestador', 'Tecnico'),
('78955578744', ' Adelson souza', '1991-11-18', 'Rua michelangelo 29', 'Presidente Prudente', '18997778788', 'adelson@moto.com.br', 'Recebedor', 'Moto entrega');

-- --------------------------------------------------------

--
-- Estrutura para tabela `produto`
--

CREATE TABLE `produto` (
  `codigo` bigint UNSIGNED NOT NULL,
  `nome` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `descricao` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
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
-- Índices de tabela `pessoas`
--
ALTER TABLE `pessoas`
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
  MODIFY `codigo` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

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
  ADD CONSTRAINT `doacao_ibfk_1` FOREIGN KEY (`cpfPessoa`) REFERENCES `pessoas` (`cpf`);

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
