import express from "express";
import routerMotorista from "./Router/RouterMotoristas.js";
import routerCidade from "./Router/RouterCidades.js";
import rotaPremio from "./Router/rotaPremio.js";
import rotaCategoriaPrem from "./Router/rotaCategoriaPrem.js";
import cors from "cors";
import rotaPremiacao from "./Router/rotaPremiacao.js";

const porta=4016;
const hostname = '0.0.0.0';
const server = express();
server.use(cors({ origin: "*" }));
server.use(express.urlencoded({ extended: false }));
server.use(express.json());
server.use("/motoristas", routerMotorista);
server.use("/cidades", routerCidade);
server.use("/premio", rotaPremio);
server.use("/categoria", rotaCategoriaPrem);
server.use("/premiacao", rotaPremiacao);
server.listen(porta,hostname, () => {
  console.log("Backend ouvindo em http://"+hostname+":"+porta);
});
 