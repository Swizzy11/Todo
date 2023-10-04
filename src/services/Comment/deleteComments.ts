import { TaskData } from "../../types/task"
import { storage } from "../LocalStorage/LocalStorage"


export const deleteComments = (currentTask:TaskData) => {
    const tasks:Array<TaskData> = storage.get(`Tasks_${currentTask.projectID}`)!

    for(let i = 0; i < tasks.length; i++) {
        if(tasks[i].id === currentTask.id) {
           tasks[i].comments.splice(i,1)
           storage.set(`Tasks_${currentTask.projectID}`, tasks)
           return tasks[i].comments
        }
    }
    
}
