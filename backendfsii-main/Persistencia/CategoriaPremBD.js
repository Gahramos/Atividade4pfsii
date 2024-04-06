import conectar from "./Conexao.js";
import CategoriaPrem from "../Modelo/CategoriaPrem.js";

export default class CategoriaPremioBD {
  async incluir(categoriaPrem) {
    if (categoriaPrem instanceof CategoriaPrem) {
      const conexao = await conectar();
      const sql = "INSERT INTO categoria_premio (categoria) VALUES (?)";
      const valores = [categoriaPrem.categoria];
      const resultado = await conexao.query(sql, valores);
      conexao.release()
      return await resultado[0].insertId;
    }
  }

  async alterar(categoriaPrem) {
    if (categoriaPrem instanceof CategoriaPrem) {
      const conexao = await conectar();
      const sql = "UPDATE categoria_premio SET categoria = ? WHERE codigo = ?";
      const valores = [categoriaPrem.categoria, categoriaPrem.codigo];
      await conexao.query(sql, valores);
      conexao.release()
    }
  }

  async excluir(categoriaPrem) {
    if (categoriaPrem instanceof CategoriaPrem) {
      const conexao = await conectar();
      const sql = "DELETE FROM categoria_premio WHERE codigo = ?";
      const valores = [categoriaPrem.codigo];
      await conexao.query(sql, valores);
      conexao.release()
    }
  }

  async consultar(termo) {
    const conexao = await conectar();
    const sql = "SELECT * FROM categoria_premio WHERE categoria LIKE ?";
    const valores = ["%" + termo + "%"];
    const [rows] = await conexao.query(sql, valores);
    const listaCategorias = [];
    for (const row of rows) {
      const categoriaPrem = new CategoriaPrem(row["codigo"], row["categoria"]);
      listaCategorias.push(categoriaPrem);
    }
    conexao.release()
    return listaCategorias;
  }
}
