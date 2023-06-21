import { Outlet } from "react-router-dom";
import Navbar from "./componentes/Navbar";
import Footer from "./componentes/Footer"
import './App.css'

// Message de erro
import Message from "./componentes/messageErro/Message";

import { UserProvider } from "./context/UserContext";

function App() {

 
  return (
   <div>
    <UserProvider>
      <Navbar/>
      <Message/>
      <div className="conteiner">
        <Outlet/>
      </div>
      <Footer/> 
    </UserProvider>
   </div>
  )
}

export default App
