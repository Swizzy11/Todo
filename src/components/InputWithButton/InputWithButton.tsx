import { FC, ReactEventHandler } from 'react'
import { ButtonHost } from '../../UI/ButtonHost'
import { Input } from '../../UI/Input'
import './InputWithButton.scss'

type InputWithButtonProps = {
    groupClass: string,
    inputClass: string,
    inputValue?: string,
    textLabel?: string,
    buttonType: "button" | "reset" | "submit" | undefined,
    buttonClass: string,
    buttonContent?: string,
    onClick?: ReactEventHandler,
    onChangeInput?: React.ChangeEventHandler<HTMLInputElement>
}

export const InputWithButton:FC<InputWithButtonProps> = ({
    groupClass,
    inputClass,
    inputValue,
    textLabel,
    buttonType,
    buttonClass,
    buttonContent,
    onClick,
    onChangeInput
}) => {
    return (
        <div className={groupClass || 'group'}>
            <Input
                className={inputClass} 
                type={'text'}
                value={inputValue!}
                textLabel={textLabel}
                onChange={onChangeInput} 
            />
            <ButtonHost 
                type={buttonType} 
                classname={buttonClass}
                onClick={onClick}
            >
                {buttonContent}
            </ButtonHost>
        </div>
    )
}
