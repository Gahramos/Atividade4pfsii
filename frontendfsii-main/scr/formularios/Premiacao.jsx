import React, { useEffect, useState } from "react";
import { Form, Button, FormControl, InputGroup } from "react-bootstrap";
import { urlBackend } from "../assets/funcoes";

export default function FormPremiacao(props) {
  const [editMotorista, setEditMotorista] = useState([]);
  const [editPremio, setEditPremio] = useState([]);
  const [listaMotorista, setListaMotorista] = useState([]);
  const [listaPremio, setListaPremio] = useState([]);
  const [premiacao, setPremiacao] = useState({
    ganhador: null,
    dataPremiacao: "",
    listaItens: [],
  });

  useEffect(() => {
    const getMotorista = async () => {
      try {
        const retornoMotoristas = await fetch(urlBackend + "/motoristas", {
          method: "GET",
        });

        if (retornoMotoristas.ok) {
          const listaMotorista = await retornoMotoristas.json();
          setListaMotorista(listaMotorista);

          const nomes = listaMotorista.map((motorista) => motorista.nome);

          setEditMotorista(nomes);
        } else {
          console.error("Erro ao buscar motoristas:", retornoMotoristas.statusText);
        }

        const retornoPremio = await fetch(urlBackend + "/premio", {
          method: "GET",
        });

        if (retornoPremio.ok) {
          const listaPremio = await retornoPremio.json();
          setListaPremio(listaPremio);

          const nomesPremios = listaPremio.map((premio) => premio.nome);

          setEditPremio(nomesPremios);
        } else {
          console.error("Erro ao buscar premios:", retornoPremio.statusText);
        }
      } catch (error) {
        console.error("Erro inesperado:", error);
      }
    };

    getMotorista();
  }, []);

  const handleGanhadorChange = (e) => {
    const ganhadorSelecionado = listaMotorista.find(
      (motorista) => motorista.nome === e.target.value
    );

    setPremiacao({ ...premiacao, ganhador: ganhadorSelecionado });
  };

  const handlePremioChange = (index, e) => {
    const premioSelecionado = listaPremio.find(
      (premio) => premio.nome === e.target.value
    );

    const updatedItens = [...premiacao.listaItens];
    updatedItens[index].premio = premioSelecionado;
    setPremiacao({ ...premiacao, listaItens: updatedItens });
  };

  const handleDataPremiacaoChange = (e) => {
    setPremiacao({ ...premiacao, dataPremiacao: e.target.value });
  };

  const handleQuantidadeChange = (index, e) => {
    const updatedItens = [...premiacao.listaItens];
    updatedItens[index].quantidade = e.target.value;
    setPremiacao({ ...premiacao, listaItens: updatedItens });
  };

  const handleAddItem = () => {
    setPremiacao({
      ...premiacao,
      listaItens: [...premiacao.listaItens, { premio: "", quantidade: 1 }],
    });
  };
  const handleRemoveItem = (index) => {
    const updatedItens = [...premiacao.listaItens];
    updatedItens.splice(index, 1);
    setPremiacao({ ...premiacao, listaItens: updatedItens });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const cpfGanhadorSelecionado = premiacao.ganhador
        ? premiacao.ganhador.cpf.replace(/[.-]/g, "")
        : "";
      const listaItensFormatada = premiacao.listaItens.map((item) => ({
        codigoPremio: item.premio.codigo,
        quantidade: item.quantidade,
      }));

      const requestBody = {
        dataPremiacao: premiacao.dataPremiacao,
        cpfMotorista: cpfGanhadorSelecionado,
        listaItens: listaItensFormatada,
      };

      const response = await fetch(urlBackend + "/premiacao", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        window.alert("Premiação enviada com sucesso!");
        console.log("Premiação enviada com sucesso!", JSON.stringify(requestBody));
        window.location.reload();
        setPremiacao({
          ganhador: null,
          dataPremiacao: "",
          listaItens: [],
        });
      } else {
        window.alert("Erro ao enviar a premiação.");
        console.error("Erro ao enviar a premiação.", JSON.stringify(requestBody));
      }
    } catch (error) {
      console.error("Erro inesperado:", error);
      window.alert("Erro inesperado:", error, JSON.stringify(requestBody));
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>Ganhador</Form.Label>
        <InputGroup className="mb-3">
          <FormControl
            as="select"
            onChange={handleGanhadorChange}
            value={premiacao.ganhador ? premiacao.ganhador.nome : ""}
          >
            <option value="" disabled>
              Selecione um ganhador da premiação
            </option>
            {editMotorista.map((ganhador, index) => (
              <option key={index} value={ganhador}>
                {ganhador}
              </option>
            ))}
          </FormControl>
        </InputGroup>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Data da Premiação</Form.Label>
        <FormControl
          type="date"
          onChange={handleDataPremiacaoChange}
          value={premiacao.dataPremiacao}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label className="mb-3">Itens da Premiação</Form.Label>
        {premiacao.listaItens.map((item, index) => (
          <div key={index} className="mb-3">
            <InputGroup className="mb-3">
              <FormControl
                as="select"
                onChange={(e) => handlePremioChange(index, e)}
                value={item.premio ? item.premio.nome : ""}
              >
                <option value="" disabled>
                  Selecione o prêmio e a quantidade
                </option>
                {editPremio.map((premio, index) => (
                  <option key={index} value={premio}>
                    {premio}
                  </option>
                ))}
              </FormControl>
              <FormControl
                type="number"
                min="1"
                onChange={(e) => handleQuantidadeChange(index, e)}
                value={item.quantidade}
              />
              <Button variant="danger" onClick={() => handleRemoveItem(index)}>
                Remover
              </Button>
            </InputGroup>
          </div>
        ))}
        <Button variant="secondary" onClick={handleAddItem} className="ml-5">
          Adicionar Premiação
        </Button>
      </Form.Group>

      <Button
        variant="danger"
        type="button"
        onClick={() => {
          props.exibirTabela(true);
        }}
      >
        Voltar
      </Button>
      <Button variant="primary" type="submit" onSubmit={handleSubmit}>
        Enviar Premiação
      </Button>
    </Form>
  );
}
