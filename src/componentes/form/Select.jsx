import "./Input.css"

const Select = ({text, name, options, handleOnChange, value}) => {
    return(
        <div className="form-control">
            <label htmlFor={name}>{text}:</label>
            <select
                name={name}
                id={name}
                onChange={handleOnChange}
                value={value || ''}
            >
                <option>Selecione uma opção</option>
                {options.map((opition) => (
                    <option value={opition } key={opition}>
                        {opition}
                    </option>
                ))}
            </select>
        </div>
    )
}

export default Select