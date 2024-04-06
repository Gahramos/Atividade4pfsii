import Premiacao from "../Modelo/Premiacao.js";

export default class PremiacaoCTRL {

    consultar(requisicao, resposta) {
        resposta.type('application/json');

        if (requisicao.method === 'GET') {

            const premiacao = new Premiacao();

            premiacao.consultar('').then((premiacoes) => {
                resposta.status(200).json(premiacoes);

            }).catch((erro) => {
                resposta.status(500).json({
                    status: false,
                    mensagem: erro.message
                });
            });
        } else {
            resposta.status(400).json({
                status: false,
                mensagem: 'Método não permitido! Consulte a documentação da API'
            });
        }
    }

    gravar(requisicao, resposta) {
        resposta.type('application/json');
        if (requisicao.method === 'POST' && requisicao.is('application/json')) {
            
            const dados = requisicao.body;            
            const dataPremiacao = dados.dataPremiacao;
            const cpfMotorista = dados.cpfMotorista;
            const listaItens = dados.listaItens;

            if (dataPremiacao && cpfMotorista && listaItens) {

                const premiacao = new Premiacao(0, dataPremiacao, cpfMotorista, listaItens);

                premiacao.gravar().then(() => {
                    resposta.status(200).json({
                        status: true,
                        codigo: premiacao.codigo,
                        mensagem: 'Premiação gravada com sucesso!'
                    });
                }).catch((erro) => {
                    resposta.status(500).json({
                        status: false,
                        mensagem: erro.message
                    });
                });

            } else {
                resposta.status(400).json({
                    status: false,
                    mensagem: 'Registro inválido! Informe adequadamente todos os dados da premiação conforme a documentação da API'
                });
            }
        } else {
            resposta.status(400).json({
                status: false,
                mensagem: 'Método não permitido ou premia no formato JSON não fornecido! Consulte a documentação da API'
            });
        }
    }

}