import { ProjectData } from "../../types/project"
import { keyGen } from "./keyGen"


export const createProject = (title:string) => {
    const id = keyGen()

    const newProject:ProjectData = {
        id: `${id}`,
        title: title
    }
    return newProject
}
