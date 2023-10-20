import { storage } from "../LocalStorage/LocalStorage"
import { ProjectData } from "../../types/project"

export const addProject = (
    projects: ProjectData[],
    currentProject: ProjectData,
    ) => {
        if(!projects) return []

        projects.push(currentProject)
        storage.set(`Project_${currentProject.id}`, currentProject)

        return projects
}
