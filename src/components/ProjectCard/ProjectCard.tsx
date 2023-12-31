import { FC, ReactEventHandler, ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import { ButtonHost } from '../../UI/ButtonHost'
import { storage } from '../../services/LocalStorage/LocalStorage'
import './ProjectCard.scss'

type ProjectCardProps = {
    title: string,
    id: string,
    onDeleteProject: () => void
}

export const ProjectCard:FC<ProjectCardProps> = ({
    title,
    id,
    onDeleteProject
}) => {
    const navigate = useNavigate()

    const onClick:ReactEventHandler = () => {
            storage.set('currentProject', id)
            navigate(`/project`)
    }

    return (
        <div className='projectCard' key={id!}>
            <div className="projectCardName" onClick={onClick} >
                {title}
            </div>
            <ButtonHost 
                type={'button'} 
                classname={'btn-exit'} 
                onClick={onDeleteProject}
            >
                x
            </ButtonHost>
        </div>
        
    )
}
