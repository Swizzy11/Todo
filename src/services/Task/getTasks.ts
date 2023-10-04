import { TaskData } from "../../types/task";
import { storage } from "../LocalStorage/LocalStorage";

export const getTasks = () => {
    const currentProject = storage.get('currentProject')?.match(/[0-9]+/g)![0]
    const tasksData = storage.get(`Tasks_${currentProject}`)!
    
    if(tasksData === null) {
        const newTask:TaskData = {
            id: "",
            status: "",
            projectID: "",
            title: "",
            content: "",
            createTime: "",
            closeTime: "",
            subtasks: [],
            comments: []
        }
        storage.set(`Tasks_${currentProject}`, [newTask])
        return [newTask] 
    }
    return tasksData
}
