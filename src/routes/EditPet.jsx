import {useParams} from "react-router-dom"
import { useState, useEffect } from "react"
import useFlashMessage from "../hooks/useFlashMessage"
import api from "../utils/api"
import PetForm from "../componentes/form/PetForm"
import '../routes/cssdetodososformulario/Form.css'

const EditePet = () => {
    const [pet, setPet] =useState({})
    const {id} = useParams()
    const [token] = useState(localStorage.getItem('token') || '')
    const {setFlashMessage} = useFlashMessage()

    useEffect(() => {
        api.get(`/pets/${id}`, {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`
            },
        }).then((response) => {
            setPet(response.data.pet)
        }).catch((err) => {
            msgType = 'error'
            return err.response.data
        })
    }, [token, id])

    async function updatePet(pet){
        let msgType = 'success'

      const  formData = new FormData

        await Object.keys(pet).forEach((key) => {
            if(key === 'images'){
                for(let i = 0; i < pet[key].length; i++){
                    formData.append('images', pet[key][i])
                }
            }else{
                formData.append(key, pet[key])
            }
        })

        const data = await api.patch(`/pets/${pet._id}`, formData, {
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
        <section>
            <div className="addpet-header">
                <h1>Editando o Pet: {pet.name}</h1>
                <p>Depois de edição os dados serão atualizados no sistema</p>
            </div>
            {pet.name &&(
                <PetForm handleSubmit={updatePet} btntext='Atualizar' petData={pet}/>
            )}
        </section>
    )
}
export default EditePet