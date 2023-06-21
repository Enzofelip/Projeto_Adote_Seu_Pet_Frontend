import PetForm from "../componentes/form/PetForm"
import "./cssdetodososformulario/Form.css"
import { useState } from "react"
import useFlashMessage from "../hooks/useFlashMessage"
import api from "../utils/api"

const Addpet = () => {
    const [token] = useState(localStorage.getItem('token') || '')
    console.log(token)
    const {setFlashMessage} = useFlashMessage()

    async function registerPet(pet){
       let msgType = 'success'

        const formData = new FormData

        await Object.keys(pet).forEach((key) => {
            if(key === 'images') {
                for(let i = 0; i < pet[key].length; i++){
                    formData.append('images', pet[key][i])
                }
            }else{
                formData.append(key, pet[key])
            }
        })

        const data = await api.post('/pets/create', formData, {
           headers: {
            Authorization: `Bearer ${JSON.parse(token)}`,
            'Content-Type': 'multipart/form-data'
           }
        }).then((response) => {
            return response.data
        }).catch((err) => {
            msgType = 'error'
            return err.response.data
        })

        setFlashMessage(data.message, msgType)
    }
    return(
        <div className="add-cnteiner">
            <div>
                <h1>Cadastrar um pet</h1>
                <p>Depois ele ficará disponivel para adoção</p>
            </div>
            <PetForm  handleSubmit={registerPet}  btntext="Cadastrar Pet"/>
        </div>
    )
}

export default Addpet