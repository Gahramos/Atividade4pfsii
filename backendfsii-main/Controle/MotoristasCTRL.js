import Motoristas from "../Modelo/Motoristas.js";

export default class MotoristasCTRL {

  consultar(request, response) {
    response.type("application/json");

    if (request.method === "GET") {
      const motoristas = new Motoristas();
      motoristas
        .consultar("")
        .then((motoristas) => {
          response.status(200).json(motoristas);
        })
        .catch((erro) => {
          response.status(500).json({
            status: false,
            message: erro.message,
          });
        });
    } else {
      response.status(400).json({
        status: false,
        mensagem: "Método não permitido, consulte a API",
      });
    }
  }
  // Função para gravar uma novo motorista
  gravar(request, response) {
    response.type("application/json");
    if (request.method === "POST" && request.is("application/json")) {
      const data = request.body;
      const cpf = data.cpf;      
      const nome = data.nome;
      const nascimento = data.nascimento;
      const endereco = data.endereco;
      const cidade = data.cidade;
      const telefone = data.telefone;
      const categoria = data.categoria;
      const cnh = data.cnh;
      const email = data.email;       
      if (
        cpf &&
        nome &&
        nascimento &&
        endereco &&
        cidade &&
        telefone &&
        categoria &&
        cnh &&
        email      
            
      ) {
        const motorista = new Motoristas(
        cpf,
        nome,
        nascimento,
        endereco,
        cidade,
        telefone,
        categoria,
        cnh,
        email      
        );
        motorista
          .gravar()
          .then(() => {
            response.status(200).json({
              status: true,
              mensagem: "Motorista cadastrado com sucesso!",
            });
          })
          .catch((erro) => {
            response.status(500).json({
              status: false,
              mensagem: erro.message,
            });
          });
      } else {
        response.status(400).json({
          status: false,
          mensagem: "Insira todos os dados",
        });
      }
    } else {
      response.status(400).json({
        status: false,
        mensagem: "Método não permitido, consulte a API",
      });
    }
  }

  // Método PUT
  atualizar(request, response) {
    response.type("application/json");
    if (request.method === "PUT" && request.is("application/json")) {
      const data = request.body;
      const cpf = data.cpf;      
      const nome = data.nome;
      const nascimento = data.nascimento;
      const endereco = data.endereco;
      const cidade = data.cidade;
      const telefone = data.telefone;
      const categoria = data.categoria;
      const cnh = data.cnh;
      const email = data.email;  
      if (
        cpf &&
        nome &&
        nascimento &&
        endereco &&
        cidade &&
        telefone &&
        categoria &&
        cnh &&
        email      
      ) {
        const motoristas = new Motoristas(
        cpf,
        nome,
        nascimento,
        endereco,
        cidade,
        telefone,
        categoria,
        cnh,
        email      
        );
        motoristas
          .atualizar()
          .then(() => {
            response.status(200).json({
              status: true,
              mensagem: "Atualizado com sucesso!",
            });
          })
          .catch((erro) => {
            response.status(500).json({
              status: false,
              mensagem: erro.message,
            });
          });
      } else {
        response.status(400).json({
          status: false,
          mensagem: "Por favor, preencha com os dados corretos",
        });
      }
    } else {
      response.status(400).json({
        status: false,
        mensagem: "Método não permitido, consulte a API",
      });
    }
  }

  // Método DELETE
  excluir(request, response) {
    response.type("application/json");
    if (request.method === "DELETE" && request.is("application/json")) {
      const data = request.body;
      const cpf = data.cpf;
      if (cpf) {
        const motoristas = new Motoristas(cpf);
        motoristas
          .excluir()
          .then(() => {
            response.status(200).json({
              status: true,
              mensagem: "Motorista excluída com sucesso",
            });
          })
          .catch((erro) => {
            response.status(500).json({
              status: false,
              message: erro.message,
            });
          });
      } else {
        response.status(400).json({
          status: false,
          mensagem: "Falha ao excluir a motorista",
        });
      }
    } else {
      response.status(400).json({
        status: false,
        mensagem: "Método não permitido, consulte a API",
      });
    }
  }
  
}
