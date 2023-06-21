import api from "../utils/api"
import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import "./PetDetails.css"
import useFlashMessage from "../hooks/useFlashMessage"


const PetDetails = () => {
    const env = import.meta.env.REACT_APP_API
    const [pet, setPet] = useState({});
    const {id} = useParams();
    const[token] = useState(localStorage.getItem("token") || '')
    const {setFlashMessage} = useFlashMessage()

    useEffect(() => {
        api.get(`/pets/${id}`).then((response) => {
            setPet(response.data.pet)
        })
    }, [id])

   async function schedule(){
    let msgType = 'success'

    const data = await api.patch(`/pets/schedule/${pet._id}`, "Oi", {
        headers: {
            Authorization: `Bearer ${JSON.parse(token)}`,
        },
    }).then((response) => {
        return response.data
    }).catch((err) => {
        msgType = 'error'
        return err.response.data
    })

    setFlashMessage(data.message, msgType)
   }
    return(
        <div>
          {pet.name && (
            <section className="petdetails-conteiner">
                <div className="petdetails-header">
                    <h1>Conhecendo o pet: {pet.name}</h1>
                    <p>Se tiver interesse, marque uma visita para conhece-lo</p>
                </div>
                <div className="pet-image">
                    {pet.images.map((image, index) => (
                        <img
                            src={`${env}/images/pets/${image}`}
                            alt={pet.name}
                            key={pet._id}
                        />
                    ))}
                </div>
                <p>
                    <span className="bold">Peso:</span>{pet.weight}kg
                </p>
                <p>
                    <span className="bold">Idade:</span>{pet.age} anos
                </p>

                {token ? (
                    <button onClick={schedule}>Solicitar visita</button>
                ) : (
                    <p>Você precisa <Link to='/register'>criar uma conta </Link>para solicitar a visita</p>
                )}
            </section>
          )}
        </div>
    )
}

export default PetDetails