import { ProjectCard } from "../../components/block/ProjectCard"
import { storage } from "../LocalStorage/LocalStorage";


export const getProjects = () => {
    let projectsData = storage.getAllByKey('Project');
    let projects = []

    for(let i = 0; i < projectsData.length; i++) {
        const project = <ProjectCard 
                        title={projectsData[i].title} 
                        key={projectsData[i].id}

                        onClick={() => {
                            return projectsData[i].id
                        }}

                        onDeleteProject={
                            (e) => {
                                let divProject = e.currentTarget.parentNode

                                storage.remove(`Project_${projectsData[i].id}`)
                                divProject!.parentNode!.removeChild(divProject!)

                                getProjects()
                            }
                        } 
                    />
        projects.push(project)
    }
    return projects
}
