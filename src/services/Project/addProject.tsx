import { Dispatch, ReactNode } from "react"
import { ProjectCard } from "../../components/block/ProjectCard"
import { keyGen } from "../../utils/keyGen"
import { getProjects } from "./getProjects"
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
