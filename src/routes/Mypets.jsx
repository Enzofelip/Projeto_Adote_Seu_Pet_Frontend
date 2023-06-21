import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import api from "../utils/api"
import Roudedimage from "../componentes/Roudedimage"
import "./Mypetsdash.css"
import useFlashMessage from "../hooks/useFlashMessage"
import Logo from "../assets/img/logo.png"

const Mypets = () => {
    
    const [pets, setPets] = useState([])
    const [token] = useState(localStorage.getItem('token') || '')
    const {setFlashMessage} = useFlashMessage()
    useEffect(() => {
        api.get("/pets/mypets", {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`,
            },
        }).then((response) => {
            console.log(response.data)
            setPets(response.data.pets)
        })
    }, [token])

    async function removePet(id){
        let msgType =  'success'

       const data = await api.delete(`/pets/${id}`, {
        headers: {
            Authorization: `Bearer ${JSON.parse(token)}`,
        },
       }).then((response) => {
        const updatePets = pets.filter((pet) => pet._id !== id)
        setPets(updatePets)
        return response.data
       }).catch((err) => {
        msgType = 'error'
        return err.response.data
       })

       setFlashMessage(data.message, msgType)
    }

    async function concludpet(id){
        let msgType = 'success'

        const data = await api.patch(`/pets/conclude/${id}`,'', {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`,
            },
        }).then((response) => {
            return response.data.pets
        }).catch((err) => {
            msgType = 'error'
            return err.response.data
        })

        setFlashMessage(data.message, msgType)
    }

    return(
        <div>
            <div className="petlist-header">
                <h1>Mypets</h1>
                <Link to="/pet/addpet">Cadastrar pets</Link>
                <h1>{pets.name}</h1>
            </div>
            
            <div className="petlist-conteiner">
                {pets.length > 0 && (
                  pets.map((pet) => (
                   <div className="petlist-row" key={pet._id}>
                        <Roudedimage
                            src={`http://localhost:5000/images/pets/${pet.images[0]}`}
                            alt={pet.name}
                        />
                        
                        <span>{pet.name}</span>
                        <div className="actions">
                            {pet.available ? (
                                <>
                                    {pet.adopter && (
                                        <button className="conclude-btn" onClick={() => {
                                            concludpet(pet._id)
                                        }}>Concluir adoção</button>
                                    )}
                                    <Link to={`/pet/edit/${pet._id}`}>Editar</Link>
                                    <button onClick={() => {
                                        removePet(pet._id)
                                    }}>Excluir</button>
                                </>
                            ) : (
                                <p>Pet já adotado</p>
                            )}
                        </div>
                   </div>
                  ))
                )}
                {pets.length === 0 && (
                    <p>Não tem pets cadastrados</p>
                )}
            </div>
        </div>
    )
}

export default Mypets