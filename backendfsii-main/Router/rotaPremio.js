import { Router } from "express";
import PremioCTRL from "../Controle/premioCtrlPid.js";

const rotaPremio = new Router();
const premioCtrl = new PremioCTRL();

rotaPremio.get('/', premioCtrl.consultar)
.post('/' ,premioCtrl.gravar)
.put('/' ,premioCtrl.atualizar)
.delete('/' ,premioCtrl.excluir);

export default rotaPremio;
