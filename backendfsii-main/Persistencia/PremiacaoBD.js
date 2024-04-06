import Premiacao from "../Modelo/Premiacao.js";
import Conect from "./Conexao.js";
import Premio from "../Modelo/PremioPid.js";
import CategoriaPrem from "../Modelo/CategoriaPrem.js";
import Motoristas from "../Modelo/Motoristas.js";

export default class PremiacaoBD{
  async gravar(premiacao){
    if (premiacao instanceof Premiacao){
      const conexao = await Conect();
      try{      
      await conexao.beginTransaction();
      const sql = "INSERT INTO premiacao(dataPremiacao, cpfMotorista) VALUES(?,?)"
      const valores = [premiacao.dataPremiacao, premiacao.cpfMotorista];
      const resultado = await conexao.query(sql, valores);
      premiacao.codigo = resultado[0].insertId;
      for(const item of premiacao.listaItens){
        const sql2 = "INSERT INTO premiacao_premio(codigoPremio, codigoPremiacao, quantidade ) VALUES (?,?,?)"
        const parametros = [item.codigoPremio, premiacao.codigo, item.quantidade];
        await conexao.query(sql2, parametros);
        
      }
      }catch(e){
        await conexao.rollback();
        throw e;
      }
      await conexao.commit();
      conexao.release()
    }
  }

    async gravar(premiacao) {
        if (premiacao instanceof Premiacao) {
            const conexao = await Conect();
            try {
                await conexao.beginTransaction();
                const sql = "INSERT INTO premiacao(cpfMotorista, dataPremiacao) VALUES (?,?)";
                const valores = [premiacao.cpfMotorista ,premiacao.dataPremiacao];
                const resultado = await conexao.query(sql, valores);
                premiacao.codigo = resultado[0].insertId;

                for (const item of premiacao.listaItens) {
                    const sql2 = "INSERT INTO premiacao_premio(codigoPremio, codigoPremiacao, quantidade) VALUES (?,?,?)";
                    const parametros = [item.codigoPremio, premiacao.codigo, item.quantidade];
                    await conexao.query(sql2, parametros);
                }

                await conexao.commit();
            } catch (e) {
                await conexao.rollback();
                throw e;
            } finally {
                conexao.release();
            }
        }
    }


    async consultar() {
        const listaPremiacoes = [];
        const conexao = await Conect();

        try {
            const sql = "SELECT * FROM premiacao as d \
                  INNER JOIN motoristas as p ON p.cpf = d.cpfMotorista \
                  ORDER BY d.dataPremiacao";

            const [premiacoes] = await conexao.query(sql);

            for (const rows of premiacoes) {
                const motorista = new Motoristas(rows["cpf"], rows["nome"], rows["nascimento"], rows["endereco"], rows["cidade"], rows["telefone"], rows["categoria"], rows["cnh"], rows["email"]);
                const premiacao = new Premiacao(rows["codigo"], rows["dataPremiacao"], motorista, []);

                const sqlitens = "SELECT pr.*, dp.*, cp.codigo AS codigoCategoria, cp.categoria FROM premiacao_premio as dp \
                          INNER JOIN premio as pr ON dp.codigoPremio = pr.codigo \
                          INNER JOIN categoria_premio as cp ON pr.categoria = cp.codigo \
                          WHERE dp.codigoPremiacao = ?";

                const parametros = [premiacao.codigo];
                const [itensPremiacao] = await conexao.query(sqlitens, parametros);
                const listaItens = [];

                for (const item of itensPremiacao) {
                    const categoria = new CategoriaPrem(item["codigoCategoria"], item["categoria"]);
                    const premio = new Premio(item["codigo"], item["nome"], item["descricao"], categoria.codigo, categoria.categoria);

                    listaItens.push({ premio, quantidade: item["quantidade"] });
                }

                premiacao.listaItens = listaItens;
                listaPremiacoes.push(premiacao);
            }

            return listaPremiacoes;
        } finally {
            conexao.release();
        }
    }

    async consultarCodigo(codigo) {
        const listaPremiacoes = [];
        const conexao = await Conect();

        try {
            const sql = "SELECT * FROM premiacao as d \
                  INNER JOIN motoristas as p ON p.cpf = d.cpfMotorista \
                  WHERE d.codigo = ? \
                  ORDER BY d.dataPremiacao";

            const parametros = [codigo];
            const [premiacoes] = await conexao.query(sql, parametros);

            for (const rows of premiacoes) {
                const motorista = new Motoristas(rows["cpf"], rows["nome"], rows["nascimento"], rows["endereco"], rows["cidade"], rows["telefone"], rows["categoria"], rows["cnh"], rows["email"]);
                const premiacao = new Premiacao(rows["codigo"], rows["dataPremiacao"], motorista, []);

                const sqlitens = "SELECT * FROM premiacao_premio as dp \
                          INNER JOIN premio as pr ON dp.codigoPremio = pr.codigo \
                          INNER JOIN categoriapremio as cp ON pr.categoria = cp.codigo \
                          WHERE dp.codigoPremiacao = ?";

                const parametros = [premiacao.codigo];
                const [itensPremiacao] = await conexao.query(sqlitens, parametros);
                const listaItens = [];

                for (const item of itensPremiacao) {
                    const categoria = new CategoriaPrem(item["codigo_categoria"], item["categoria"]);
                    const premio = new Premio(item["codigoPremio"], item["nome"], item["descricao"], categoria);
                    listaItens.push({ premio, quantidade: item["quantidade"] });
                }

                premiacao.listaItens = listaItens;
                listaPremiacoes.push(premiacao);
            }

            return listaPremiacoes;
        } finally {
            conexao.release();
        }
    }

    
}

