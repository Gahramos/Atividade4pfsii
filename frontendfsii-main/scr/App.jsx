import CadCidades from "./telas/CadCidade"
import TelaCadMotorista from "./telas/CadMotorista"
import CadPremios from "./telas/CadPremio"
import CadCategoria from "./telas/CadCategoriaPremio"
import TelaCadPremiacao from "./telas/CadPremiacoes"
import TelaMenu from "./telas/TelaMenu"
import Tela404 from "./telas/Tela404"

import {BrowserRouter, Routes, Route} from "react-router-dom"

function App() {
    return (    
      <div>
       <BrowserRouter>
          <Routes>
            <Route path="/cadastroMotorista" element={<TelaCadMotorista/>}/>     
            <Route path="/cadastroCidade" element={<CadCidades/>}/> 
            <Route path="/cadastroPremio" element={<CadPremios/>}/>
            <Route path="/cadastroCategoria" element={<CadCategoria/>}/>
            <Route path="/cadastroPremiacao" element={<TelaCadPremiacao/>}/>
            <Route path="/" element={<TelaMenu/>}/>
            <Route path="*" element={<Tela404/>}/>
          </Routes>
        </BrowserRouter>
      </div>    
    
  )
}
export default App

