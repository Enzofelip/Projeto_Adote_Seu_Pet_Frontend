import { Link } from "react-router-dom"
import Logo from '../assets/img/logo.png'
import './Navbar.css'
import { useContext } from "react"

import { Context } from "../context/UserContext"

const Navbar = () =>{

    const {authenticated, logout} = useContext(Context)

    return(
        <nav className="navbar">
            <div className="navbarlogo">
                <img src={Logo} alt="Imagem logo"/>
                <h2> Get a Pet</h2>
            </div>
            <ul>
                <li><Link to="/">Adotar</Link></li>
                {authenticated ? (
                    <>
                        <li><Link to="/profile">Perfil</Link></li>
                        <li><Link to="/pet/myadocao">Minhas adoções</Link></li>
                        <li><Link to="/pet/mypets">Meus pets</Link></li>
                        <li onClick={logout}>Sair</li>
                    </>
                ) : (
                    <>
                        <li><Link to="/login">Login</Link></li>
                        <li><Link to="/register">Register</Link></li>
                    </>
                )}
               
            </ul>
        </nav>
    )
}

export default Navbar