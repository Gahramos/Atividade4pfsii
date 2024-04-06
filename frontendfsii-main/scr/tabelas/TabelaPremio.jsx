import {
  Table,
  Container,
  Button,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import { MdModeEdit } from "react-icons/md";
import { HiTrash } from "react-icons/hi";
import { RiSearchLine } from "react-icons/ri";
import { urlBackend } from "../assets/funcoes";

export default function TablePremio(props) {

  function filtrarPremios(e) {
    const termoBusca = e.currentTarget.value;
    fetch(urlBackend + "/premio", { method: "GET" })
      .then((resposta) => {
        return resposta.json();
      })
      .then((listaPremios) => {
        if (Array.isArray(listaPremios)) {
          const resultadoBusca = listaPremios.filter((premio) =>
            premio.nome.toLowerCase().includes(termoBusca.toLowerCase())
          );
          props.setPremios(resultadoBusca);
        }
      });
  }

  return (
    <Container>
      <Button
        className="mb-4"
        onClick={() => {
          props.exibirTabela(false);
        }}
      >
        Cadastrar prêmios
      </Button>

      <InputGroup className="mt-2">
        <FormControl
          type="text"
          id="termoBusca"
          placeholder="Busque aqui o prêmio desejado"
          onChange={filtrarPremios}
        />
        <InputGroup.Text>
          <RiSearchLine />
        </InputGroup.Text>
      </InputGroup>

      <Table striped bordered hover size="sm" className="mt-5">
        <thead>
          <tr className="text-center">
            <th className="text-center">Código</th>
            <th className="text-center">Nome</th>
            <th className="text-center">Descrição</th>
            <th className="text-center">Categoria</th>
            <th className="text-center">Ações</th>
          </tr>
        </thead>
        <tbody>
          {props.listaPremios?.map((premio) => {
            return (
              <tr key={premio.codigo}>
                <td>{premio.codigo}</td>
                <td>{premio.nome}</td>
                <td>{premio.descricao}</td>
                <td>{premio.categoria}</td>
                <td>
                  <Button variant="outline-primary"
                    onClick={() => {
                      if (
                        window.confirm("Deseja atualizar os dados do prêmio?")
                      ) {
                        props.editar(premio);
                      }
                    }}
                  >
                    <MdModeEdit />
                  </Button>
                  {""}
                  <Button variant="outline-danger"
                    onClick={() => {
                      if (window.confirm("Deseja excluir?")) {
                        props.deletar(premio);
                      }
                    }}
                  >
                    <HiTrash />
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </Container>
  );
}