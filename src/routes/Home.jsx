import { Link } from "react-router-dom"
import api from "../utils/api"
import { useState, useEffect } from "react"
import "./Home.css"

const Home = () => {
    const env = import.meta.env.VITE_BACKEND_URL
    const [pets, setPets] = useState({})
    const [fit, setFit] = useState();
    const url = 'http://localhost:5000'

    useEffect(() => {
        api.get("/pets").then((response) => {
            setPets(response.data.pets)
            console.log(response.data.pets)
           
        }).catch((err) => {
            console.log(err)
        })
    }, [])


    return(
        <section>
            <div className="pethome-header">
                <h1>Adote um Pet</h1>
                <p>Veja os deltalhes de cada um e conhça seus tutores</p>
                
            </div>
            <div className="pet-conteiner">
                {pets.length > 0 && (
                    pets.map((pet) => (
                            <div className="pet-card" key={pet._id}>
                            <div style={{backgroundImage: `url(http://localhost:5000/images/${pet.images[0]})`}} className="pet-image"></div>
                            <h3>{pet.name}</h3>
                            <img src={pet.images} alt={pet.name}/>
                            <p>
                                <span>Peso:</span> {pet.weight}kg
                            </p>
                            {pet.available ? (
                                <Link to={`/pet/${pet._id}`}>Mais detalhes</Link>
                            ) : (
                                <p className="adopted-text">Adotado</p>
                            )}
                        </div>
                    ))
                )}
            </div>
           
        </section>
    )
}

export default Home