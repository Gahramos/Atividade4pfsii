import CategoriaPremioBD from "../Persistencia/CategoriaPremBD.js";

export default class CategoriaPrem {
  #codigo;
  #categoria;

  constructor(codigo, categoria) {
    this.#codigo = codigo;
    this.#categoria = categoria;
  }

  get codigo() {
    return this.#codigo;
  }

  set codigo(novoCodigo) {
    if (novoCodigo !== '') {
      this.#codigo = novoCodigo;
    }
  }

  get categoria() {
    return this.#categoria;
  }

  set categoria(novocategoria) {
    if (novocategoria !== '') {
      this.#categoria = novocategoria;
    }
  }

  
  toJSON() {
    return {
      codigo: this.#codigo,
      categoria: this.#categoria,
    };
  }

  async gravar() {
    const categoriaPremioBD = new CategoriaPremioBD();
    await categoriaPremioBD.incluir(this);
  }

  async atualizar() {
    const categoriaPremioBD = new CategoriaPremioBD();
    await categoriaPremioBD.alterar(this);
  }

  async remover() {
    const categoriaPremioBD = new CategoriaPremioBD();
    await categoriaPremioBD.excluir(this);
  }

  async consultar(termo) {
    const categoriaPremioBD = new CategoriaPremioBD();
    const categorias = await categoriaPremioBD.consultar(termo);
    return categorias;
  }

  async consultarCodigo(codigo) {
    const categoriaPremioBD = new CategoriaPremioBD();
    const categorias = await categoriaPremioBD.consultarCodigo(codigo);
    return categorias;
  }
}
