import { TaskData } from "../../../types/task"
import { getTasksInStorage } from "../../../utils/getTasksInStorage"

export const getSubtasks = (currentTask: TaskData) => {
    const tasks = getTasksInStorage(currentTask)
    
    for(let i = 0; i < tasks.length; i++ ) {
        if(currentTask.id === tasks[i].id) {
            return tasks[i].subtasks
        }
    }
}
