import Premio from "../Modelo/PremioPid.js";

export default class PremioCTRL {

    consultar(requiscao, resposta) {
        resposta.type('application/json')

        if (requiscao.method === 'GET') {

            const premio = new Premio();

            premio.consultar('').then((premios) => {
                resposta.status(200).json(premios);

            }).catch((erro) => {
                resposta.status(500).json({
                    status: false,
                    mensagem: erro.message
                })
            });
        } else {
            resposta.status(400).json({
                status: false,
                mensagem: 'Método não permitido! Consulte a documentação da API'
            });
        }
    }

    gravar(requiscao, resposta) {
        resposta.type('application/json')
        if (requiscao.method === 'POST' && requiscao.is('application/json')) {

            const dados = requiscao.body;
            const nome = dados.nome;
            const descricao = dados.descricao;
            const categoria = dados.codigoCategoria;


            if (nome && descricao && categoria) {

                const premio = new Premio(0, nome, descricao, categoria);

                premio.gravar().then(() => {
                    resposta.status(200).json({
                        status: true,
                        id: premio.codigo,
                        mensagem: 'Prêmio gravado com sucesso!'
                    });
                }).catch((erro) => {
                    resposta.status(500).json({
                        status: false,
                        mensagem: erro.message
                    })
                });

            } else {
                resposta.status(400).json({
                    status: false,
                    mensagem: 'Registro inválido! informe adequadamente todos os dados do prêmio conforme a documentação da API'

                });
            }
        } else {
            resposta.status(400).json({
                status: false,
                mensagem: 'Método não permitido ou prêmio no formato JSON não fornecido! Consulte a documentação da API'

            });
        }
    }


    atualizar(requiscao, resposta) {
        resposta.type('application/json')

        if (requiscao.method === 'PUT' && requiscao.is('application/json')) {
            const dados = requiscao.body;
            console.log(dados)
            const codigo = dados.codigo;
            const nome = dados.nome;
            const descricao = dados.descricao;
            const codigoCategoria = dados.codigoCategoria;
            const categoria = dados.categoria;

            if (codigo && nome && descricao && categoria && codigoCategoria) {

                const premio = new Premio(codigo, nome, descricao, codigoCategoria, categoria);

                premio.atualizar().then(() => {
                    resposta.status(200).json({
                        status: true,
                        mensagem: 'Prêmio atualizado com sucesso!'
                    });

                }).catch((erro) => {
                    resposta.status(500).json({
                        status: false,
                        mensagem: erro.message
                    })
                });

            } else {
                resposta.status(400).json({
                    status: false,
                    mensagem: 'Atualização inválida! informe adequadamente todos os dados do prêmio conforme a documentação da API'

                });
            }
        } else {
            resposta.status(400).json({
                status: false,
                mensagem: 'Método não permitido ou prêmio no formato JSON não fornecido! Consulte a documentação da API'

            });
        }
    }

    excluir(requiscao, resposta) {

        resposta.type('application/json')

        if (requiscao.method === 'DELETE' && requiscao.is('application/json')) {

            const dados = requiscao.body;
            const codigo = dados.codigo;

            if (codigo) {

                const premio = new Premio(codigo);

                premio.remover().then(() => {
                    resposta.status(200).json({
                        status: true,
                        mensagem: 'Prêmio excluído com sucesso!'
                    });

                }).catch((erro) => {
                    resposta.status(500).json({
                        status: false,
                        mensagem: erro.message
                    })
                });

            } else {
                resposta.status(400).json({
                    status: false,
                    mensagem: 'Exclusão inválida! informe adequadamente o nome do prêmio conforme a documentação da API.'

                });
            }
        } else {
            resposta.status(400).json({
                status: false,
                mensagem: 'Método não permitido ou prêmio no formato JSON não fornecido! Consulte a documentação da API'

            });
        }
    }
}