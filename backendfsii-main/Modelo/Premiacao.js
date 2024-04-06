import PremiacaoBD from "../Persistencia/PremiacaoBD.js";

export default class Premiacao {
    #codigo;        
    #dataPremiacao;
    #cpfMotorista;
    #listaItens;
    #quantidade;

    constructor(codigo, dataPremiacao, cpfMotorista, listaItens) {
        this.#codigo = codigo;
        this.#dataPremiacao = dataPremiacao;
        this.#cpfMotorista = cpfMotorista;
        this.#listaItens = listaItens;
        
    }

    get codigo() {
        return this.#codigo;
    }

    set codigo(codigo) {
        this.#codigo = codigo;
    }

    get cpfMotorista() {
        return this.#cpfMotorista;
    }

    set cpfMotorista(newcpfMotorista) {
        this.#cpfMotorista = newcpfMotorista;
    }

    get quantidade() {
        return this.#quantidade;
    }

    set quantidade(newQuantidade) {
        this.#quantidade = newQuantidade;
    }

    get dataPremiacao() {
        return this.#dataPremiacao;
    }

    set dataPremiacao(newDataPremiacao) {
        this.#dataPremiacao = newDataPremiacao;
    }

    get listaItens() {
        return this.#listaItens
    }

    set listaItens(newListaItens) {
        this.#listaItens = newListaItens;
    }

    toJSON() {
        return {
            "codigo": this.#codigo,
            "dataPremiacao": this.#dataPremiacao,
            "cpfMotorista": this.#cpfMotorista,
            "listaItens": this.#listaItens.map(item => ({
                "premio": item.premio,
                "quantidade": item.quantidade
            }))
        };
    }

    async gravar() {
        const premiacaoBD = new PremiacaoBD();
        await premiacaoBD.gravar(this);
    }

    async consultar(termo) {
        const premiacaoBD = new PremiacaoBD();
        const premiacoes = await premiacaoBD.consultar(termo);
        return premiacoes;
    }

    async consultarCodigo(codigo){
           const premiacaoBD = new PremiacaoBD();
           const premiacao = await premiacaoBD.consultarCodigo(codigo);
           return premiacao;
    }
}
