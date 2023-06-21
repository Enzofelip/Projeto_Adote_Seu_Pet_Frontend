import Input from "../componentes/form/Input";
import "./cssdetodososformulario/Form.css"
import { Link } from "react-router-dom"
import { useState, useContext } from "react";

import { Context } from "../context/UserContext";


const Login = () => {
    const [user, setUser] = useState({})
    const {login} = useContext(Context)

    const handleChange = (e) => {
        setUser({...user, [e.target.name]: e.target.value})
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        login(user)
    }

    return(
        <section className="form-container">
            <h1>Login</h1>

            <form onSubmit={handleSubmit}>
                <Input
                    text="Email"
                    type="email"
                    name="email"
                    placeholder="Digite seu Email"
                    handleOnchange={handleChange}
                />

                 <Input
                    text="Senha"
                    type="password"
                    name="password"
                    placeholder="Digite sua Senha"
                    handleOnchange={handleChange}
                />
                <input type="submit" value="Cadastrar"/>
            </form>
        </section>
    )
}

export default Login;