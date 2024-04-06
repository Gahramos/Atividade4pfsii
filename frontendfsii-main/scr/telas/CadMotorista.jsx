import Pagina from "../templates/Pagina";
import FormMotorista from "../formularios/Motoristas";
import TabelaMotoristas from "../tabelas/TabelaMotorista";
import { useState, useEffect } from "react";
import { Container, Alert } from "react-bootstrap";
import { urlBackend } from "../assets/funcoes";

export default function TelaCadMotorista(props) {
  const [exibirTabela, setExibirTabela] = useState(true);
  const [motoristas, setMotoristas] = useState([]);
  const [modoEdicao, setModoEdicao] = useState(false);
  const [editMotorista, setEditMotorista] = useState({
    nome: " ",
    cpf: "",
    nascimento: "",
    endereco: "",
    cidade: "",
    telefone: "",
    categoria: "",
    cnh: "",
    email: "",
  });

  function preparaTela(motorista) {
    setModoEdicao(true);
    setEditMotorista(motorista);
    setExibirTabela(false);
  }

  function excluirMotorista(motorista) {
    fetch(urlBackend + "/motoristas", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(motorista),
    }).then((resposta) => {
      window.alert("Motorista excluído com sucesso!");
      
      return resposta.json();
    });
  }

  useEffect(() => {
    fetch(urlBackend + "/motoristas", {
      method: "GET",
    })
      .then((resposta) => {
        return resposta.json();
      })
      .then((dados) => {
        if (Array.isArray(dados)) {
          setMotoristas(dados);
        } else {
        }
      });
  }, []);

  return (
    <Pagina>
      <Container className="border">
        <Alert style={{ backgroundColor: 'yellow', textAlign:"center", fontSize:'20px' }} variant={"secondary"}>Cadastro de Motoristas</Alert>
        {exibirTabela ? (
          <TabelaMotoristas
            listaMotoristas={motoristas}
            setMotoristas={setMotoristas}
            exibirTabela={setExibirTabela}
            editar={preparaTela}
            excluir={excluirMotorista}
          />
        ) : (
          <FormMotorista
            listaMotoristas={motoristas}
            setMotoristas={setMotoristas}
            exibirTabela={setExibirTabela}
            modoEdicao={modoEdicao}
            setModoEdicao={setModoEdicao}
            editar={preparaTela}
            motorista={editMotorista}
          />
        )}
      </Container>
    </Pagina>
  );
}
