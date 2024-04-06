import MotoristaBD from "../Persistencia/MotoristaBD.js";

export default class Motoristas {
  #cpf;
  #nome;
  #nascimento;
  #endereco;
  #cidade;
  #telefone;
  #categoria;
  #cnh;
  #email;     

  constructor(
    cpf,
    nome,
    nascimento,
    endereco,
    cidade,
    telefone,
    categoria,
    cnh,
    email      
  ) {
    this.#cpf = cpf;
    this.#nome = nome;
    this.#nascimento = nascimento;
    this.#endereco = endereco;
    this.#cidade = cidade;
    this.#telefone = telefone;
    this.#categoria = categoria;
    this.#cnh = cnh;
    this.#email = email;
   
   
  }

  

  get cpf() {
    return this.#cpf;
  }

  set cpf(newCpf) {
    this.#cpf = newCpf;
  }

  get categoria() {
    return this.#categoria;
  }

  set categoria(newcategoria) {
    this.#categoria = newcategoria;
  }

  get nome() {
    return this.#nome;
  }

  set nome(newNome) {
    this.#nome = newNome;
  }

  get telefone() {
    return this.#telefone;
  }

  set telefone(newTelefone) {
    this.#telefone = newTelefone;
  }

  get nascimento() {
    return this.#nascimento;
  }

  set nascimento(newNascimento) {
    this.#nascimento = newNascimento;
  }

  

  get endereco() {
    return this.#endereco;
  }

  set endereco(newEndereco) {
    this.#endereco = newEndereco;
  }

  get cidade() {
    return this.#cidade;
  }

  set cidade(newCidade) {
    this.#cidade = newCidade;
  }

  
  get cnh() {
    return this.#cnh;
  }

  set cnh(newCnh) {
    this.#cnh = newCnh;
  }

  get email() {
    return this.#email;
  }

  set email(newEmail) {
    this.#email = newEmail;
  }

  

  toJSON() {
    return {
    cpf:this.#cpf,
    nome:this.#nome ,
    nascimento:this.#nascimento,
    endereco:this.#endereco ,
    cidade:this.#cidade,
    telefone:this.#telefone,
    categoria:this.#categoria,
    cnh:this.#cnh,
    email:this.#email
    };
  }

  async gravar() {
    const motoristaBD = new MotoristaBD();
    await motoristaBD.gravar(this);
  }
  async excluir() {
    const motoristaBD = new MotoristaBD();
    await motoristaBD.excluir(this);
  }
  async atualizar() {
    const motoristaBD = new MotoristaBD();
    await motoristaBD.atualizar(this);
  }
  async consultar(term) {
    const motoristaBD = new MotoristaBD();
    const motoristas = await motoristaBD.consultar(term);
    return motoristas;
  }
}
