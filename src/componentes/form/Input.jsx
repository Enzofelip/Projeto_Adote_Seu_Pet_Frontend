import './Input.css'

const Input = ({
    type,
    text,
    name,
    placeholder,
    handleOnchange,
    value,
    multiple,
}) => {
    return(
        <div className='form-control'>
            <label htmlFor={name}>{text}:</label>
            <input
                type={type}
                name={name}
                id={name}
                placeholder={placeholder}
                onChange={handleOnchange}
                value={value}
                {...(multiple ? { multiple } : '')}
            />
        </div>
    )
}

export default Input;