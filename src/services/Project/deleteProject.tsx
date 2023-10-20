import { ProjectData } from "../../types/project"

export const deleteProject = (
    projects: ProjectData[], 
    currentProject: ProjectData
) => {

    for(let i = 0; i < projects.length; i++) {
        if(projects[i].id === currentProject.id) {
            projects.splice(i,1)
            localStorage.removeItem(`Project_${currentProject.id}`)

            return projects
        }
    }
}
