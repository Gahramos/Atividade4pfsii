import { Router } from "express";
import MotoristasCTRL from "../Controle/MotoristasCTRL.js";

const routerMotorista = new Router();
const motoristasCTRL = new MotoristasCTRL();

routerMotorista
  .get("/", motoristasCTRL.consultar)
  .put("/", motoristasCTRL.atualizar)
  .post("/", motoristasCTRL.gravar)
  .delete("/", motoristasCTRL.excluir);

export default routerMotorista;
