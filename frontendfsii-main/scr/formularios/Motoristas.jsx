import { useEffect, useState } from "react";
import { Form, Button, Col, Row } from "react-bootstrap";
import { urlBackend } from "../assets/funcoes";
import SearchBar from "../templates/Searchbar/Searchbar";

function FormMotorista(props) {
  const [data, setData] = useState([]);    
  const [validated, setValidated] = useState(false);
  const [motorista, setMotorista] = useState(props.motorista);
  const [cidadeSelecionada, setCidadeSelecionada] = useState(props.cidade)
  const [ listaCidades ,setListaCidades] = useState ([])
  useEffect(() => {
    fetch(urlBackend + "/cidades", { method: "GET" })
      .then((resposta) => {
        return resposta.json();
      })
      .then((dados) => {
        setListaCidades(dados);
      });
  });

  function manipularMudanca(e) {
    const elemForm = e.currentTarget;
    const id = elemForm.id;
    const valor = elemForm.value;
    setMotorista({ ...motorista, [id]: valor });
  }

  function handleSubmit(event) {
    const form = event.currentTarget;
    console.log("entrei aqui");
    if (form.checkValidity()) {
      if (!props.modoEdicao) {
        fetch(urlBackend + "/motoristas", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(motorista),
        })
          .then((resposta) => {
            return resposta.json();
          })
          .then((dados) => {
            if (dados.status) {
              props.setModoEdicao(false);
              let novaLista = props.listaMotoristas;
              novaLista.push(motorista);
              props.setMotoristas(novaLista);
              props.exibirTabela(true);
              window.location.reload();
            }
            window.alert(dados.mensagem);
          })
          .catch((erro) => {
            window.alert("Erro ao executar a requisição :" + erro.message);
          });
      } else {
        fetch(urlBackend + "/motoristas", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(motorista),
        }).then((resposta) => {
          
          return resposta.json();
        }).then((dados) => {
          if (dados.status) {
            props.setModoEdicao(false);
            let novaLista = props.listaMotoristas;
            novaLista.push(motorista);
            props.setMotoristas(novaLista);
            props.exibirTabela(true);
            setData(novaLista); // Atualize o estado com os dados mais recentes
            window.location.reload();
          }
          window.alert(dados.mensagem);
        })
        .catch((erro) => {
          window.alert("Erro ao executar a requisição: " + erro.message);
        });
      }

      setValidated(false);
    } else {
      setValidated(true);
    }
    event.preventDefault();
  }

  return (
    <div>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Row>
          <Form.Group>
            <Form.Label>Nome</Form.Label>
            <Form.Control
              type="text"
              placeholder="Digite o nome da motorista"
              required
              value={motorista.nome}
              id="nome"
              onChange={manipularMudanca}
            />
          </Form.Group>
          <Form.Control.Feedback type="invalid">
            Por favor, informe o nome da motorista!
          </Form.Control.Feedback>
        </Row>

        <Row>
          <Col>
            <Form.Group className="mb-5">
              <Form.Label>CPF</Form.Label>
              <Form.Control
                type="text"
                placeholder="111.111.111-11"
                required
                value={motorista.cpf}
                id="cpf"
                onChange={manipularMudanca}
              />
            </Form.Group>
            <Form.Control.Feedback type="invalid">
              Por favor, informe um cpf válido!
            </Form.Control.Feedback>
          </Col>

          <Col>
            <Form.Group className="mb-5">
              <Form.Label>Data de Nascimento</Form.Label>
              <Form.Control
                type="date"
                placeholder="ex: 11/11/1111"
                required
                value={motorista.nascimento}
                id="nascimento"
                onChange={manipularMudanca}
              />
            </Form.Group>
            <Form.Control.Feedback type="invalid">
              Por favor informe uma data de nasciemento
            </Form.Control.Feedback>
          </Col>
        </Row>

        <Row>
          <Form.Group>
            <Form.Label>Endereço</Form.Label>
            <Form.Control
              type="text"
              placeholder="Digite o endereço completo (Rua/av , número , complemento)"
              required
              value={motorista.endereco}
              id="endereco"
              onChange={manipularMudanca}
            />
          </Form.Group>
          <Form.Control.Feedback type="invalid">
            Por favor, informe um endereço!
          </Form.Control.Feedback>
        </Row>
        <br />
        <Row>
          <Col>
            <Form.Group className="mb-5">
              <Form.Label>Categoria Motorista</Form.Label>
              <Form.Select
                aria-label="Categoria Motorista"
                value={motorista.categoria}
                id="categoria"
                onChange={manipularMudanca}
              >
                <option>Escolha uma das opções </option>
                <option value="Bitrem">Bitrem</option>
                <option value="Carreteiro">Carreteiro</option>
              </Form.Select>
            </Form.Group>
            <Form.Control.Feedback type="invalid"></Form.Control.Feedback>
          </Col>

          <Col>
            <Form.Group className="mb-5">
              <Form.Label>Telefone</Form.Label>
              <Form.Control
                type="text"
                placeholder="ex:(11)11111-1111"
                required
                value={motorista.telefone}
                id="telefone"
                onChange={manipularMudanca}
              />
            </Form.Group>
            <Form.Control.Feedback type="invalid">
              Por favor, informe um telefone
            </Form.Control.Feedback>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group>
              <Form.Label>Selecione uma cidade:</Form.Label>
              <SearchBar
                placeHolder={"Busque cidades"}
                dados={listaCidades}
                campoChave={"codigo"}
                campoBusca={"nome"}
                funcaoSelecao={(cidadeSelecionada) =>{
                  setCidadeSelecionada(cidadeSelecionada);
                  setMotorista({...motorista, cidade:cidadeSelecionada.nome})
                }}
                valor={cidadeSelecionada ? cidadeSelecionada.nome : ""}
                id="cidade"
                onChange={manipularMudanca}
              />
            </Form.Group>
            {/* <Form.Group className="mb-5">
              <Form.Label>Cidade</Form.Label>
              <Form.Control
                type="text"
                placeholder="Digite a cidade"
                required
                value={motorista.cidade}
                id="cidade"
                onChange={manipularMudanca}
              />
            </Form.Group>
            <Form.Control.Feedback type="invalid">
              Por favor, informe uma cidade!
            </Form.Control.Feedback> */}
          </Col>
        </Row>
        <br/>

        <Row>
          <Col>
            <Form.Group className="mb-5">
              <Form.Label>CNH</Form.Label>
              <Form.Control
                type="text"
                placeholder="Digite o número da CNH"
                value={motorista.cnh}
                id="cnh"
                onChange={manipularMudanca}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-5">
              <Form.Label>E-Mail</Form.Label>
              <Form.Control
                type="text"
                placeholder="exemplo@exemplo.com.br"
                value={motorista.email}
                id="email"
                onChange={manipularMudanca}
              />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col>
            <Button variant="primary" type="submit" className="mb-3">
              {props.modoEdicao ? "Atualizar" : "Cadastrar"}
            </Button>
          </Col>
        </Row>
        <Row>
          <Col>
            <Button
              variant="danger"
              type="button"
              className="mb-3"
              onClick={() => {
                props.exibirTabela(true);
              }}
            >
              Voltar
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
}

export default FormMotorista;
