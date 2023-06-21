import Input from "../componentes/form/Input";
import "./cssdetodososformulario/Form.css"
import { Link } from "react-router-dom"
import { useState, useContext } from "react";

//Context
import { Context } from "../context/UserContext";
import useAuth from "../hooks/useAuth";

const Register = () =>{
    const [user, setUser] = useState({})
    const {register} = useContext(Context)

    const handleChange = (e) =>{
        setUser({...user, [e.target.name]: e.target.value})
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        
        //Enviando usuário para o banco

        register(user)
    }

    return(
        <section className="form-container">
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <Input
                    text="Nome"
                    type="text"
                    name="name"
                    placeholder="Digite seu nome"
                    handleOnchange={handleChange}
                />

                 <Input
                    text="Telefone"
                    type="text"
                    name="phone"
                    placeholder="Digite seu Telefone"
                    handleOnchange={handleChange}
                />

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
                    placeholder="Digite sua senha"
                    handleOnchange={handleChange}
                />

                <Input
                    text="Confirme sua Senha"
                    type="password"
                    name="confipassword"
                    placeholder="Confirme sua senha"
                    handleOnchange={handleChange}
                />

                <input type="submit" value="Cadastrar"/>
            </form>

            <p>Já tem conta? <Link to="/login"> Clique aqui.</Link> </p>
        </section>
    )
}

export default Register;