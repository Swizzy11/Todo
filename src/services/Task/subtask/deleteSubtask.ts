import { SubtaskData, TaskData } from "../../../types/task"
import { storage } from "../../LocalStorage/LocalStorage"


export const deleteSubtask = (currentTask:TaskData, subtask:SubtaskData ) => {
    const tasks:Array<TaskData> = storage.get(`Tasks_${currentTask.projectID}`)!
    let subtasks:Array<SubtaskData> = [];
    
    for(let i=0; i < tasks.length; i++) {
        if(tasks[i].id === subtask.taskID) {
            subtasks.push(...tasks[i].subtasks)
        }
    }

    for(let i = 0; i < subtasks.length; i++) {
        console.log(subtasks[i].id === subtask.id)
        if(subtasks[i].id === subtask.id) {
            subtasks.splice(i, 1) 
        }
    }
    
    for(let i=0; i < tasks.length; i++) {
        if(tasks[i].id === subtask.taskID) {
            tasks[i].subtasks = subtasks
            
        }
    }

    storage.set(`Tasks_${currentTask.projectID}`, tasks)

    return subtasks
}
