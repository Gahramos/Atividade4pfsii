import {
  Table,
  Container,
  Button,
  InputGroup,
  FormControl,
} from "react-bootstrap";
// import { MdModeEdit } from "react-icons/md";
// import { HiTrash } from "react-icons/hi";
import { RiSearchLine } from "react-icons/ri";
import { urlBackend } from "../assets/funcoes";

export default function TabelaPremiacoes(props) {
  function filtrarPremiacoesPorCPF(e) {
    const termoBusca = e.currentTarget.value;

    fetch(urlBackend + "/premiacao", { method: "GET" })
      .then((resposta) => resposta.json())
      .then((listaPremiacoes) => {
        if (Array.isArray(listaPremiacoes)) {
          const resultadoBusca = listaPremiacoes.filter((premiacao) =>
            premiacao.cpfMotorista.nome
              .toLowerCase()
              .includes(termoBusca.toLowerCase())
          );
          props.setPremiacoes(resultadoBusca);
        }
      });
  }

  function formatarData(data) {
    const dataFormatada = new Date(data);
    const dia = dataFormatada.getDate().toString().padStart(2, "0");
    const mes = (dataFormatada.getMonth() + 1).toString().padStart(2, "0");
    const ano = dataFormatada.getFullYear();
    return `${dia}/${mes}/${ano}`;
  }

  return (
    <Container>
      <Button
        className="mb-4"
        onClick={() => {
          props.exibirTabela(false);
        }}
      >
        Nova Premiação
      </Button>

      <InputGroup className="mt-2">
        <FormControl
          type="text"
          id="termoBusca"
          placeholder="Busque aqui o ganhador pelo nome"
          onChange={filtrarPremiacoesPorCPF}
        />
        <InputGroup.Text>
          <RiSearchLine />
        </InputGroup.Text>
      </InputGroup>

      <Table striped bordered hover size="sm" className="mt-5">
        <thead>
          <tr className="text-center">
            {/* <th className="text-center">Código</th> */}
            <th className="text-center">Motorista ganhador</th>
            <th className="text-center">Data da Premiação</th>
            <th className="text-center">Prêmios</th>
            {/* <th className="text-center">Ações</th> */}
          </tr>
        </thead>
        <tbody>
          {props.listaPremiacoes?.map((premiacao) => {
            return (
              <tr key={premiacao.codigo}>
                {/* <td>{premiacao.codigo}</td> */}
                <td>{premiacao.cpfMotorista.nome}</td>
                <td>{formatarData(premiacao.dataPremiacao)}</td>

                <td>
                  <ul>
                    {premiacao.listaItens.map((item, index) => (
                      <li key={index}>
                        {item.premio.nome} - Quantidade: {item.quantidade}
                      </li>
                    ))}
                  </ul>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </Container>
  );
}
