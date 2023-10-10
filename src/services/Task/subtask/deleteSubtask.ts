import { SubtaskData, TaskData } from "../../../types/task"
import { getTasksInStorage } from "../../../utils/hooks/getTasksInStorage";
import { storage } from "../../LocalStorage/LocalStorage"


export const deleteSubtask = (currentTask:TaskData, subtask:SubtaskData ) => {
    const tasks = getTasksInStorage(currentTask)
    let subtasks:Array<SubtaskData> = [];
    
    for(let i=0; i < tasks.length; i++) {
        if(tasks[i].id === subtask.taskID) {
            subtasks.push(...tasks[i].subtasks)
        }
    }

    for(let i = 0; i < subtasks.length; i++) {
        if(subtasks[i].id === subtask.id) {
            subtasks.splice(i, 1) 
        }
    }
    
    for(let i=0; i < tasks.length; i++) {
        if(tasks[i].id === subtask.taskID) {
            tasks[i].subtasks = subtasks
            
        }
    }
    currentTask.subtasks = subtasks

    storage.set(`Tasks_${currentTask.projectID}`, tasks)
    storage.set('currentTask', currentTask)
    
    return subtasks
}
