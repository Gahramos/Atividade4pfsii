import mysql from "mysql2/promise";

export default async function Conect() {
  if (global.conexao) {
    return await global.conexao.getConnection();
  }
  const conexao = mysql.createPool({
    host: "129.146.68.51",
    user: "aluno10-pfsii",
    porta: "3306",
    // password: "aluno16-pfsii",
    password: "aluno10-pfsii",
    // user: "root",
    // password : "",    
    database: "backendaluno10pfsii",
    waitForConnections : true,
    connectionLimit: 10,
    maxIdle: 10,
    queueLimit: 0,
    enableKeepAlive :true,
    keepAliveInitialDelay: 0,
  });
  global.conexao = conexao;
  return await global.conexao.getConnection();
}
