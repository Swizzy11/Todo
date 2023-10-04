import { FC, MouseEventHandler, ReactEventHandler, ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../Button'
import { storage } from '../../../services/LocalStorage/LocalStorage'
import './ProjectCard.scss'

type ProjectCardProps = {
    title: ReactNode,
    onClick?: () => void,
    key: number,
    onDeleteProject: MouseEventHandler<HTMLButtonElement>
}

export const ProjectCard:FC<ProjectCardProps> = ({
    title,
    onClick,
    key,
    onDeleteProject
}) => {
    const navigate = useNavigate()

    const onNavigate:ReactEventHandler = () => {
        if(onClick) {
            const key = onClick()
            storage.set('currentProject', JSON.stringify(key))
            navigate(`/project`)
        }
    }

    return (
        <div className='projectCard' key={key!}>
            <div className="projectCardName" onClick={onNavigate} >
                {title}
            </div>
            <Button 
                type={'button'} 
                classname={'btn-exit'} 
                onClick={onDeleteProject}
            >
                x
            </Button>
        </div>
        
    )
}
