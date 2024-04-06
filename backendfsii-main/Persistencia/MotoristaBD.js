import Motoristas from "../Modelo/Motoristas.js";
import conectar from "./Conexao.js";

export default class MotoristaBD {
  async gravar(motoristas) {
    if (motoristas instanceof Motoristas) {
      const conexao = await conectar();
      const sql =
        "INSERT INTO motoristas(cpf,nome,nascimento,endereco,cidade,telefone,categoria,cnh,email) VALUES (?,?,?,?,?,?,?,?,?) ";
      const values = [
        motoristas.cpf,
        motoristas.nome,
        motoristas.nascimento,
        motoristas.endereco,
        motoristas.cidade,
        motoristas.telefone,
        motoristas.categoria,
        motoristas.cnh,
        motoristas.email      
      ];
      
      await conexao.query(sql, values);
      conexao.release()
    }
  }

  async atualizar(motoristas) {
    if (motoristas instanceof Motoristas) {
      const conexao = await conectar();
      const sql =
        "UPDATE motoristas SET nome=?,nascimento=?,endereco=?,cidade=?,telefone=?,categoria=?,cnh=?,email=? WHERE cpf=?";
      const values = [
        motoristas.nome,
        motoristas.nascimento,
        motoristas.endereco,
        motoristas.cidade,
        motoristas.telefone,
        motoristas.categoria,
        motoristas.cnh,
        motoristas.email, 
        motoristas.cpf
      ];
      await conexao.query(sql, values);
      conexao.release()
    }
  }
  async excluir(motoristas) {
    if (motoristas instanceof Motoristas) {
      const conexao = await conectar();
      const sql = "DELETE FROM motoristas WHERE cpf=? ";
      const values = [motoristas.cpf];
      await conexao.query(sql, values);
      conexao.release()
    }
  }
  async consultar(term) {
    const conexao = await conectar();
    const sql = "SELECT * FROM motoristas";
    const values = ["%" + term + "%"];
    const [rows] = await conexao.query(sql, values);
    const listMotoristas = [];
    for (const row of rows) {
      const motoristas = new Motoristas(
        row["cpf"],
        row["nome"],
        row["nascimento"],
        row["endereco"],
        row["cidade"],
        row["telefone"],
        row["categoria"],
        row["cnh"],
        row["email"]     
        
        
        
      );
      listMotoristas.push(motoristas);
    }
    conexao.release()
    return listMotoristas;
  }
}
