import PremioBDPid from "../Persistencia/PremioBdPid.js";

export default class Premio {
    #codigo;
    #nome;
    #descricao;
    #categoria;
    #codigoCategoria;

    constructor(codigo, nome, descricao, codigoCategoria, categoria) {
        this.#codigo = codigo;
        this.#nome = nome;
        this.#descricao = descricao;
        this.#codigoCategoria = codigoCategoria;
        this.#categoria = categoria;
    }

    get codigo() {
        return this.#codigo
    }

    set codigo(novoCodigo) {
        if (novoCodigo != '')
            this.#nome = novoCodigo;
    }

    get nome() {
        return this.#nome;
    }

    set nome(newNome) {
        if (newNome != '')
            this.#nome = newNome;
    }

    get descricao() {
        return this.#descricao;
    }

    set descricao(newDescricao) {
        this.#descricao = newDescricao;
    }

    get categoria() {
        return this.#categoria;
    }

    set categoria(novaCat) {
        this.#categoria = novaCat;
    }

    get codigoCategoria() {
        return this.#codigoCategoria;
    }

    set codigoCategoria(novaCodCat) {
        this.#codigoCategoria = novaCodCat;
    }

    toJSON() {
        return {
            "codigo": this.#codigo,
            "nome": this.#nome,
            "descricao": this.#descricao,
            "codigoCategoria": this.#codigoCategoria,
            "categoria": this.#categoria
        }
    }

    async gravar() {
        const premioBD = new PremioBDPid();
        await premioBD.incluir(this);

    }

    async atualizar() {
        const premioBD = new PremioBDPid();
        await premioBD.alterar(this);
    }

    async remover() {
        const premioBD = new PremioBDPid();
        await premioBD.excluir(this);
    }

    async consultar(termo) {
        const premioBD = new PremioBDPid();
        const premios = await premioBD.consutlar(termo);
        return premios;
    }

    async consultarCodigo(codigo) {
        const premioBD = new PremioBDPid();
        const premios = await premioBD.consultarId(termo);
        return premios;
    }

}