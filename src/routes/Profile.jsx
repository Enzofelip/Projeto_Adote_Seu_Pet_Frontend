import Input from "../componentes/form/Input";
import "./Profile.css"
import { useState, useEffect } from "react";
import api from "../utils/api";


import useFlashMessage from "../hooks/useFlashMessage";

import Roudedimage from "../componentes/Roudedimage";


const Profile = () => {
    const env = import.meta.env.REACT_APP_API
    const [user, setUser] = useState({})
    const [preview, setPreview] = useState()
    const [token] = useState(localStorage.getItem('token') || '')
    const {setFlashMessage} = useFlashMessage()

    useEffect(() => {
        api.get('users/checkuser', {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`
            }
        }).then((response) => {
            setUser(response.data)
        })
    }, [token])

    const handleFile = (e) => {
        setPreview(e.target.files[0])
        setUser({...user, [e.target.name]: e.target.files[0]})
    }

    const handleChange = (e) => {
        setUser({...user, [e.target.name]: e.target.value})
    }

    const handleSubmit = async(e) => {
        e.preventDefault()

        let msgType = 'success'

        const formData = new FormData()

        await Object.keys(user).forEach((key) => {
            formData.append(key, user[key])
        })

       

        const data = await api.patch(`/users/edit/${user._id}`, formData, {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`,
                'Content-Type': 'multipart/form-data'
            }
        }).then((response) => {
            console.log(response.data)
            return response.data
        }).catch((err) => {
            msgType = 'error'
            return err.response.data
        })

        setFlashMessage(data.message, msgType)

    }

   

    return(
       <section className="form-container">
           <div className="conteiner-header"> 
                <h1>Usuário</h1>

                {(user.image || preview) && (
                    <Roudedimage src={preview ? URL.createObjectURL(preview) : `http://localhost:5000/public/images/${user.image}`} alt={user.name} />
                )}
           </div>

            <form onSubmit={handleSubmit}>
                <Input
                    text="imagem"
                    type="file"
                    name="image"
                    handleOnchange={handleFile}
                />

                <Input
                    text="Email"
                    type="email"
                    name="email"
                    placeholder="Digite seu Email"
                    handleOnchange={handleChange}
                    value={user.email || ""}
                />

                <Input
                    text="Nome"
                    type="text"
                    name="name"
                    placeholder="Digite seu Nome"
                    handleOnchange={handleChange}
                    value={user.name || ""}
                />

                <Input
                    text="Telefone"
                    type="text"
                    name="phone"
                    placeholder="Digite seu Telefone"
                    handleOnchange={handleChange}
                    value={user.phone || ""}
                />

                <Input
                    text="Senha"
                    type="password"
                    name="password"
                    placeholder="Digite sua Senha"
                    handleOnchange={handleChange}
                />

                <Input
                    text="Confirme sua senha"
                    type="password"
                    name="confipassword"
                    placeholder="Confirme sua senha"
                    handleOnchange={handleChange}
                />
                <input type="submit" value="Cadastrar"/>
            </form>
       </section>
    )
}

export default Profile