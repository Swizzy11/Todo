import { FC } from "react"
import './Input.scss'

type InputProps = {
    type: string,
    name?: string,
    value?: string,
    className?: string,
    textLabel?: string,
    pattern?: string,
    onChange?: React.ChangeEventHandler<HTMLInputElement>
}

export const Input:FC<InputProps> = ({
    type,
    name,
    value,
    className,
    textLabel,
    pattern,
    onChange
}) => {
    return (
        <>  
            <input
                className={className || 'defaultInput'}
                name={name}
                type={type}
                value={value}
                pattern={pattern}
                onChange={onChange}
                required 
            />
        <label htmlFor={name} className={`label`}>{textLabel}</label>
        </>
    )
}
