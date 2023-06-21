import { useState, useEffect } from "react"
import api from "../utils/api"
import Roudedimage from "../componentes/Roudedimage"
import "./Mypetsdash.css"

const MyAdocao = () => {
    const env = import.meta.env.REACT_APP_API
    const [pets, setPets] = useState({})
    const [token] = useState(localStorage.getItem('token') || '')
    
    
    useEffect(() => {
        

        api.get("/pets/myadoptions", {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`,
            },
        }).then((response) => {
            setPets(response.data.pets)
            console.log(response.data.pets)
        }).catch((err) => {
            console.log(err)
        })

        
    }, [token])
    
    return(

        <section>
            <div className="petlist-header">
            <h1>Minhas Adoções</h1>
            </div>

            <div className="petlist-conteiner">
            {pets.length > 0 && (
                  pets.map((pet) => (
                   <div className="petlist-row" key={pet._id}>
                        <Roudedimage
                            src={`${env}/images/pets/${pet.images[0]}`}
                            alt={pet.name}
                        />
                        <span>{pet.name}</span>
                        <div className="contacts">
                            <p>
                                <span className="bold">Ligue para:</span> {pet.user.phone}
                            </p>
                            <p>
                                <span className="bold">Fale com:</span> {pet.user.name}
                            </p>
                        </div>
                        <div className="actions">
                            {pet.available ? (
                                <p>Adoção em processo</p>
                            ) : (
                                <p>Parabéns por concluir a adoção</p>
                            )}
                        </div>
                   </div>
                  ))
                )}
            </div>
        </section>
    )
}

export default MyAdocao