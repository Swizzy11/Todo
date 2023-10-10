import { Dispatch, ReactNode } from "react"
import { addProject } from "./addProject"
import { getProjects } from "./getProjects"
import { deleteProject } from "./deleteProject"
import { ProjectData } from "../../types/project"

export const projectController = (
    method: string,
    projects?: ProjectData[],
    currentProject?: ProjectData
    ) => {
            switch(method) {
                case('add'):
                    return addProject(projects!, currentProject!)
                case('get'):
                    return getProjects()
                case('delete'):
                    return deleteProject(projects!, currentProject!)
                default:
                    return [<>Что то пошло не так</>]
            }  
    }
