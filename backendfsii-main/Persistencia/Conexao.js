import mysql from "mysql2/promise"; //Teste local

export default async function Conect() {
  if (global.conexao) {
    return await global.conexao.getConnection();
  }
  const conexao = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "admin",  
    database: "atividade4",
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


// import mysql from "mysql2/promise"; //Teste cloudpanel

// export default async function Conect() {
//   if (global.conexao) {
//     return await global.conexao.getConnection();
//   }
//   const conexao = mysql.createPool({
//     host: "129.146.68.51",
//     user: "aluno10-pfsii",
//     porta: "3306",
//     password: "aluno10-pfsii", 
//     database: "backendaluno10pfsii",
//     waitForConnections : true,
//     connectionLimit: 10,
//     maxIdle: 10,
//     queueLimit: 0,
//     enableKeepAlive :true,
//     keepAliveInitialDelay: 0,
//   });
//   global.conexao = conexao;
//   return await global.conexao.getConnection();
// }