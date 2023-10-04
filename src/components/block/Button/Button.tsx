import { FC, MouseEventHandler, ReactNode } from "react";
import './Button.scss'

type ButtonProps = {
    type:  "button" | "submit" | "reset" | undefined,
    children?: ReactNode,
    classname?: string,
    onClick?: MouseEventHandler<HTMLButtonElement>,
    isActive?: boolean
}

export const Button:FC<ButtonProps> = ({
    type,
    children,
    classname,
    onClick,
    isActive
}) => {
    return (
        <button 
            type={type} 
            className={classname || 'menu'}
            onClick={onClick}
            disabled={isActive}
        >
            {children}
        </button>
    )
}
