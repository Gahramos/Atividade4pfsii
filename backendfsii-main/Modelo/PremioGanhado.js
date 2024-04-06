export default class PremioGanhado{
  #premio

  constructor(premio){
    this.#premio = premio;    
  }

  get premio(){
    return this.#premio
  }

  set premio(novoPremio){
    this.#premio = novoPremio
  }

  toJSON(){
    return{
      "premio":this.#premio 
       }
  }

}