import { ReactNode } from "react"
import { addProject } from "./addProject"
import { getProjects } from "./getProjects"

export const projectController = (
    method: string,
    projects?: ReactNode[],
    title?: string,
    setProject?: React.Dispatch<React.SetStateAction<ReactNode[]>>
    ) => {
            switch(method) {
                case('add'):
                    return addProject(projects!, title!, setProject!)
                case('get'):
                    return getProjects()
                default:
                    return [<>Что то пошло не так</>]
            }  
    }
