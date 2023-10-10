import { FC, MouseEventHandler, ReactEventHandler, ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../Button'
import { storage } from '../../../services/LocalStorage/LocalStorage'
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

    const onNavigate:ReactEventHandler = () => {
            storage.set('currentProject', id)
            navigate(`/project`)
    }

    return (
        <div className='projectCard' key={id!}>
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
