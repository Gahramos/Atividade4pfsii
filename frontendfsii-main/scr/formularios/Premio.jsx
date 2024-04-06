import { useState } from "react";
import { Form, Button, Col, Row, Stack, } from "react-bootstrap";
import { urlBackend } from "../assets/funcoes";


export default function PremioForm(props) {
  const [data, setData] = useState([]);
  const [validated, setValidated] = useState(false);
  const [premio, setPremio] = useState(props.premio);


  function manipularOnChange(e) {
    const elementForm = e.currentTarget;
    const id = elementForm.id;
    const valor = elementForm.value;
    setPremio({ ...premio, [id]: valor });
  }

  function manipulaSubmissao(evento) {
    const form = evento.currentTarget;
    if (form.checkValidity()) {
      if (!props.modoEdicao) {
        fetch(urlBackend + "/premio", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(premio)
        })
          .then((resposta) => {
            return resposta.json()
          })
          .then((dados) => {
            if (dados.status) {
              props.setModoEdicao(false)
              let novaLista = props.listaPremios;
              novaLista.push(premio)
              props.setPremios(novaLista)
              props.buscarPremio()
              props.exibirTabela(true)
              setData(novaLista);
            }
            window.alert(dados.mensagem)
          })
          .catch((erro) => {
            window.alert("Erro ao executar a requisição: " + erro.message)
          })
      }
      else {
        fetch(urlBackend + '/premio', {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(premio)
        })
          .then((resposta) => {

            
            return resposta.json()

          }).then((dados) => {
            if (dados.status) {
              props.setModoEdicao(false)
              let novaLista = props.listaPremios;
              novaLista.push(premio)
              props.setPremios(novaLista)
              props.buscarPremio()
              props.exibirTabela(true)
              setData(novaLista);
            }
            window.alert(dados.mensagem)
          })
      }
      setValidated(false)
    } else {

      setValidated(true)
    }
    evento.preventDefault();
    evento.stopPropagation();
  }

  return (
    <>
      <Form
        noValidate
        validated={validated}
        onSubmit={manipulaSubmissao}
        variant="light"
      >
        <Form.Group className="mb-3">
          <h3>Cadastro de Prêmios</h3>
        </Form.Group>

        <Row>
          
          <Col>
            <Form.Group>
              <Form.Label>Nome</Form.Label>
              <Form.Control
                value={premio.nome}
                type="text"
                placeholder="Digite o nome do prêmio"
                id="nome"
                onChange={manipularOnChange}
                required
              />
              <Form.Control.Feedback type="invalid">
                Por favor, informe o nome do prêmio!
              </Form.Control.Feedback>
            </Form.Group>
          </Col>



        </Row>
        <Form.Group>
          <Form.Label>Descrição</Form.Label>
          <Form.Control
            value={premio.descricao}
            as="textarea"
            rows={5}
            placeholder="Digite a descrição do premio"
            id="descricao"
            onChange={manipularOnChange}
            required
          />
          <Form.Control.Feedback type="invalid">
            Por favor, informe a descrição!
          </Form.Control.Feedback>
        </Form.Group>

        <Row>
          {

            <Col>
              <Form.Group>
                <Form.Label>Categoria</Form.Label>
                <Form.Control
                  value={premio.codigoCategoria}
                  as="select"
                  id="codigoCategoria"
                  onChange={manipularOnChange}
                  required
                >
                  <option></option>
                  {props.categorias.map((categoria) => (
                    
                    <option value={categoria.codigo}>{categoria.categoria}</option>
                  ))}
                </Form.Control>
                <Form.Control.Feedback type="invalid">
                  Por favor, informe a categoria!
                </Form.Control.Feedback>
              </Form.Group>
            </Col>}

        </Row>

        <Stack className="mt-3 mb-3" direction="horizontal" gap={3}>
          <Button variant="primary" type="submit">
            {props.modoEdicao ? "Atualizar" : "Cadastrar"}
          </Button>
          <Button
            variant="danger"
            type="button"
            onClick={() => {
              props.exibirTabela(true);
            }}
          >
            Voltar
          </Button>
        </Stack>
      </Form>
    </>
  );
}