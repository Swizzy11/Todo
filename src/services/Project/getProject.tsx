import { storage } from "../LocalStorage/LocalStorage";

export const getProjects = () => {
    let projectData = storage.getAllByKey('Project');

    return projectData
}
