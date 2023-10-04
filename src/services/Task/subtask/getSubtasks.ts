import { TaskData } from "../../../types/task"
import { storage } from "../../LocalStorage/LocalStorage"

export const getSubtasks = (currentTask: TaskData) => {
    const tasks = storage.get(`Tasks_${currentTask.projectID}`)!
    
    for(let i = 0; i < tasks.length; i++ ) {
        if(currentTask.id === tasks[i].id) {
            return tasks[i].subtasks
        }
    }
}
