import { useDispatch } from 'react-redux'
import { Dispatch, ReactNode, useEffect, useState } from 'react'
import { AddProjectForm } from '../../components/forms/AddProjectForm'
import { BackgroundAnimation } from '../../components/BackgroundAnimation'
import { useTypedSelector } from '../../utils/hooks/useTypedSelector'
import { fetchProjects } from '../../store/action-creator/project'
import { Loader } from '../../components/Loader'
import  './Main.scss'

export const Main = () => {
    const {projects, loading, error} = useTypedSelector(state => state.projects)
    const [projectsInState, setProjects] = useState<Array<ReactNode>>([])
    const dispatch: Dispatch<any> = useDispatch()

    useEffect(() => {
        setProjects([])
        dispatch(fetchProjects(setProjects))
    }, [])

    return (
        <div className='main'>
            {   (loading) 
                ? <Loader />
                :   [...projectsInState, projects].map((item) => {
                        return item
                    })
            }
            <AddProjectForm setProject={setProjects} projects={projectsInState}/>       
            <BackgroundAnimation />
        </div>
    )
}
