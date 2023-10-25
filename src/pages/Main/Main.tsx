import { FC, useEffect, useState } from 'react'
import { AddProjectForm } from '../../modules/forms/AddProjectForm'
import { BackgroundAnimation } from '../../UI/BackgroundAnimation'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import { Loader } from '../../UI/Loader'
import { ProjectCard } from '../../components/ProjectCard'
import { ProjectData } from '../../types/project'
import { useActions } from '../../hooks/useActions'
import  './Main.scss'

export const Main:FC = () => {
    const {projects, loading, error} = useTypedSelector(state => state.projects)
    const [projectsInState, setProjects] = useState<Array<ProjectData>>([])
    const {fetchProjects} = useActions()

    useEffect(() => {
        fetchProjects('get')
    }, [])

    useEffect(() => {
        setProjects([ ...projects])
    }, [projects])

    return (
        <div className='main'>
            
            {   (loading) 
                ? 
                    <div className='loaderContainer'>
                        <Loader />
                    </div>
                :   projectsInState.map((item, index) => {
                    
                        return <ProjectCard
                                    key={index} 
                                    id={item.id}
                                    title={item.title} 
                                    onDeleteProject={() => {
                                            fetchProjects('delete',projects, item)
                                        }}
                                    
                                />
                    })
            }
            <AddProjectForm  />       
            <BackgroundAnimation />
        </div>
    )
}
