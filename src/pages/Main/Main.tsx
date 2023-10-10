import { useDispatch } from 'react-redux'
import { Dispatch, useEffect, useState } from 'react'
import { AddProjectForm } from '../../components/forms/AddProjectForm'
import { BackgroundAnimation } from '../../components/BackgroundAnimation'
import { useTypedSelector } from '../../utils/hooks/useTypedSelector'
import { fetchProjects } from '../../store/action-creator/project'
import { Loader } from '../../components/Loader'
import { ProjectCard } from '../../components/block/ProjectCard'
import { ProjectData } from '../../types/project'
import  './Main.scss'

export const Main = () => {
    const {projects, loading, error} = useTypedSelector(state => state.projects)
    const [projectsInState, setProjects] = useState<Array<ProjectData>>([])
    const dispatch: Dispatch<any> = useDispatch()

    useEffect(() => {
        dispatch(fetchProjects('get'))
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
                :   projectsInState.map((item) => {
                    
                        return <ProjectCard 
                                    id={item.id}
                                    title={item.title} 
                                    onDeleteProject={() => {
                                            dispatch(fetchProjects('delete',projects, item))
                                        }}
                                    
                                />
                    })
            }
            <AddProjectForm  />       
            <BackgroundAnimation />
        </div>
    )
}
