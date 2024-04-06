import { Container } from "react-bootstrap";
import { Cabecalho } from "./Cabecalho";
import Menu from "./Menu";

export default function Pagina(props){
  return(
    <>
    <Cabecalho texto="TRABALHO FULLSTACK II - ATIVIDADE 4 - Gabriel Ramos - Transportadora Sposito "/>
    <Menu/>
    <Container>
    {props.children}
    </Container>
    <br/>
    <br/>
    </>

  )
}