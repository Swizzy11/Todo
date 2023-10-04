import { ReactNode } from "react"
import { ProjectCard } from "../../components/block/ProjectCard"
import { keyGen } from "../../utils/hooks/keyGen"
import { getProjects } from "./getProjects"
import { storage } from "../LocalStorage/LocalStorage"

export const addProject = (
    projects: ReactNode[],
    title: string,
    setProject: React.Dispatch<React.SetStateAction<ReactNode[]>>
    ) => {
        const key = keyGen()
        const project = <ProjectCard 
                            title={title} 
                            key={key} 

                            onClick={
                                () => {
                                    return key
                                }
                            } 

                            onDeleteProject={
                                (e) => {
                                    let divProject = e.currentTarget.parentNode

                                    localStorage.removeItem(`Project_${key}`)
                                    if(divProject && divProject.parentNode) {
                                        divProject.parentNode.removeChild(divProject)
                                        getProjects()
                                    }
                                    
                                }
                            }
                            />

        const projectInfo = {
            id: key,
            title: title
        }

        storage.set(`Project_${key}`, JSON.stringify(projectInfo))
        setProject([...projects, project])

        return projects
}
