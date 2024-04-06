import { Router } from "express";
import PremiacaoCTRL from "../Controle/PremiacaoCTRL.js";

const premiacaoCTRL = new PremiacaoCTRL();
const rotaPremiacao = Router();
rotaPremiacao.get("/", premiacaoCTRL.consultar);
rotaPremiacao.post("/", premiacaoCTRL.gravar);
rotaPremiacao.get("/:codigo", premiacaoCTRL.consultar);
export default rotaPremiacao;