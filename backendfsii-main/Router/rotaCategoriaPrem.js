import { Router } from "express";
import CategoriaPremCTRL from '../Controle/CategoriaPremCtrl.js'

const rotaCategoriaPrem = new Router();
const categoriaPremCTRL = new CategoriaPremCTRL();

rotaCategoriaPrem.get('/', categoriaPremCTRL.consultar)
.post('/' ,categoriaPremCTRL.gravar)
.put('/' ,categoriaPremCTRL.atualizar)
.delete('/' ,categoriaPremCTRL.excluir);

export default rotaCategoriaPrem;