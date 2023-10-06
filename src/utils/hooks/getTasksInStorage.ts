import { storage } from "../../services/LocalStorage/LocalStorage"
import { TaskData } from "../../types/task"


export const getTasksInStorage = (currentTask: TaskData):Array<TaskData> => {
    const tasks:Array<TaskData> = storage.get(`Tasks_${currentTask.projectID}`)
    
    return tasks
}
