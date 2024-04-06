import Pagina from "../templates/Pagina";
import FormPremiacao from "../formularios/Premiacao";
import TabelaPremiacoes from "../tabelas/TabelaPremiacoes";
import { useState, useEffect } from "react";
import { Container, Alert } from "react-bootstrap";
import { urlBackend } from "../assets/funcoes";

export default function TelaCadPremiacao(props) {
  const [exibirTabela, setExibirTabela] = useState(true);
  const [premios, setPremios] = useState([]);
  const [modoEdicao, setModoEdicao] = useState(false);
  const [premioEdicao, setPremioEdicao] = useState({
    codigo: "",
    nome: "",
    descricao: "",
    codigoCidade: "",
  });
  const [cidade, setCidades] = useState();

  const [premiacoes, setPremiacoes] = useState([]);

  function prepararTela(premio) {
    setModoEdicao(true);

    setPremioEdicao(premio);
    setExibirTabela(false);
  }

  useEffect(() => {
    buscarPremiacao();
  }, []);

  function buscarPremiacao() {
    fetch(urlBackend + "/premiacao", {
      method: "GET",
    })
      .then((resposta) => {
        return resposta.json();
      })
      .then((dados) => {
        if (Array.isArray(dados)) {
          setPremiacoes(dados);
        } else {
        }
      });
  }

  return (
    <Pagina>
      <Container className="border">
        <Alert variant={"secondary"}>Cadastro de Premiações</Alert>
        {exibirTabela ? (
          <TabelaPremiacoes
            listaPremios={premios}
            listaPremiacoes={premiacoes}
            setPremiacoes={setPremiacoes}
            exibirTabela={setExibirTabela}
            editar={prepararTela}
            // excluir={excluirMotorista}
          />
        ) : (
          <FormPremiacao
            // listaPremiacao={premiacao}
            // setPremiacao={setPremiacao}
            exibirTabela={setExibirTabela}
            // modoEdicao={modoEdicao}
            // setModoEdicao={setModoEdicao}
            // editar={preparaTela}
            // motorista={editMotorista}
          />
        )}
      </Container>
    </Pagina>
  );
}
