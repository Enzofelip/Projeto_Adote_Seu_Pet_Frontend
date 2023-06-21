import { useState, useEffect } from "react"
import Input from "./Input"
import Select from "./Select"
import Roudedimage from "../Roudedimage"
import "../../routes/cssdetodososformulario/Form.css"

const PetForm = ({handleSubmit, petData, btntext}) => {
    const env = import.meta.env.REACT_APP_API
    const [pet, setPet] = useState(petData || {})
    const [preview, setPreview] = useState([])
    const colors = ['Branco', 'Preto', 'Cinza', 'Caramelo', 'Mesclado']

    const onFileChange = (e) => {
        setPreview(Array.from(e.target.files))
        setPet({...pet, images: [...e.target.files]})
    }

    const handleChange = (e) => {
        setPet({...pet, [e.target.name]: [e.target.value]})
    }

    const handleColor = (e) => {
        setPet({...pet, color: e.target.options[e.target.selectedIndex].text})
    }

    const submit = (e) => {
        e.preventDefault()

        console.log(pet)
        handleSubmit(pet)
    }

    return(
        <div>
            <form onSubmit={submit} className="form-container">
                <div className="preview_image">
                    {preview.length > 0 
                        ? preview.map((image, index) => (
                            <img 
                                src={URL.createObjectURL(image)}
                                alt={pet.name}
                                key={`${pet.name}+${index}`}
                            />
                        )) : 
                        pet.images &&
                        pet.images.map((image, index) => (
                            <img
                                src={`${env}/images/pets/${image}`}
                                alt={pet.name}
                                key={`${pet.name}+${index}`}
                            />
                        ))
                    }
                </div>
                
                <Input
                    text="Imagem do Pet"
                    type='file'
                    name='images'
                    handleOnchange={onFileChange}
                    multiple={true}
                />

                <Input
                    text="Nome do pet"
                    type='text'
                    name='name'
                    placeholder='Digite seu Nome'
                    handleOnchange={handleChange}
                    value={pet.name || ''}
                />

                <Input
                    text="Idade do Pet"
                    type='text'
                    name='age'
                    placeholder='DIgite a idade'
                    handleOnchange={handleChange}
                    value={pet.age || ''}
                />

                <Input
                    text="Peso do Pet"
                    type='number'
                    name='weight'
                    placeholder='Digite o seu peso'
                    handleOnchange={handleChange}
                    value={pet.weight || ''}
                />

                <Select
                    name='color'
                    text='Selecione a cor'
                    options={colors}
                    handleOnChange={handleColor}
                    value={pet.color || ''}
                />

                <input type="submit" value={btntext}/>
            </form>
        </div>
    )
}

export default PetForm