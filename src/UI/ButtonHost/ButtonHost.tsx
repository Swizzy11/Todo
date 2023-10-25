import { FC, MouseEventHandler, ReactNode } from "react";
import './ButtonHost.scss'

type ButtonHostProps = {
    type:  "button" | "submit" | "reset" | undefined,
    children?: ReactNode,
    classname?: string,
    onClick?: MouseEventHandler<HTMLButtonElement>,
    isActive?: boolean
}

export const ButtonHost:FC<ButtonHostProps> = ({
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
