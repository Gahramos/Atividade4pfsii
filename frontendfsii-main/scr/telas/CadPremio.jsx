import { useState, useEffect } from "react";
import TablePremio from "../tabelas/TabelaPremio";
import PremioForm from "../formularios/Premio";
import { urlBackend } from "../assets/funcoes";
import Pagina from "../templates/Pagina";
import { Container, Alert } from "react-bootstrap";

export default function CadPremios(props) {
  const [exibirTabela, setExibirTabela] = useState(true);
  const [premios, setPremios] = useState([]);
  const [modoEdicao, setModoEdicao] = useState(false);
  const [premioEdicao, setPremioEdicao] = useState({
    codigo: "",
    nome: "",
    descricao: "",
    codigoCategoria: "",
  });
  const [categoria, setCategoria] = useState();

  function prepararTela(premio) {
    setModoEdicao(true);

    setPremioEdicao(premio);
    setExibirTabela(false);
  }

  function deletarPremio(premio) {
    fetch(urlBackend + "/premio", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(premio),
    }).then((resposta) => {
      window.alert("Prêmio excluído com sucesso!!!");
      window.location.reload();
      return resposta.json();
    });
  }

  useEffect(() => {
    buscarPremio();
    buscarCategoria();
  }, []);

  function buscarPremio() {
    fetch(urlBackend + "/premio", {
      method: "GET",
    })
      .then((resposta) => {
        return resposta.json();
      })
      .then((dados) => {
        if (Array.isArray(dados)) {
          setPremios(dados);
        } else {
        }
      });
  }

  function buscarCategoria() {
    fetch(urlBackend + "/categoria", {
      method: "GET",
    })
      .then((resposta) => {
        return resposta.json();
      })
      .then((dados) => {
        if (Array.isArray(dados)) {
          setCategoria(dados);
        } else {
        }
      });
  }

  return (
    <Pagina>
      <Container>
        <Alert variant={"secondary"}>Cadastro de Prêmios</Alert>
        {exibirTabela ? (
          <TablePremio
            listaPremios={premios}
            setPremios={setPremios}
            exibirTabela={setExibirTabela}
            editar={prepararTela}
            deletar={deletarPremio}
          />
        ) : (
          <PremioForm
            listaPremios={premios}
            setPremios={setPremios}
            exibirTabela={setExibirTabela}
            modoEdicao={modoEdicao}
            editar={prepararTela}
            setModoEdicao={setModoEdicao}
            premio={premioEdicao}
            buscarPremio={buscarPremio}
            categorias={categoria}
          />
        )}
      </Container>
    </Pagina>
  );
}
