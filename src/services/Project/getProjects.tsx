import { storage } from "../LocalStorage/LocalStorage";


export const getProjects = () => {
    let projectsData = storage.getAllByKey('Project');

    return projectsData
}
