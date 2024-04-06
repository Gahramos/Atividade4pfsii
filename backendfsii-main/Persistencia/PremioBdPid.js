import conectar from "./Conexao.js";
import Premio from "../Modelo/PremioPid.js";


export default class PremioBDPid {

    async incluir(premio) {
        if (premio instanceof Premio) {
            const conexao = await conectar();

            const sql = "INSERT INTO premio(nome, descricao, categoria) VALUES ( ?, ?, ?)";
            const valores = [
                premio.nome,
                premio.descricao,
                premio.codigoCategoria,
            ];
            const resultado = await conexao.query(sql, valores);
            conexao.release()
            return await resultado[0].insertId;

        }
    }


    async alterar(premio) {
        if (premio instanceof Premio) {
            const conexao = await conectar();

            const sql = "UPDATE premio SET nome = ?, descricao = ?, categoria = ? WHERE codigo = ?";

            const valores = [
                premio.nome,
                premio.descricao,
                premio.codigoCategoria,
                premio.codigo,
            ];

            await conexao.query(sql, valores);
            conexao.release()
        }
    }


    async excluir(premio) {
        if (premio instanceof Premio) {
            const conexao = await conectar();

            const sql = "DELETE FROM premio WHERE codigo = ? ";

            const valores = [premio.codigo]

            await conexao.query(sql, valores);
            conexao.release()
        }
    }

    async consutlar(termo) {
        const conexao = await conectar();

        const sql = "SELECT p.*, cp.codigo AS codigoCategoria, cp.categoria FROM premio p INNER JOIN categoria_premio cp on cp.codigo = p.categoria WHERE p.nome LIKE ?";

        const valores = ['%' + termo + '%'];

        const [rows] = await conexao.query(sql, valores);
        const listaPremios = [];

        for (const row of rows) {
            const premio = new Premio(

                row['codigo'],
                row['nome'],
                row['descricao'],
                row['codigoCategoria'],
                row['categoria'],
            );
            listaPremios.push(premio);
        }
        conexao.release()
        return listaPremios;       
    }
}