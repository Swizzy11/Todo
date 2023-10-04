import { SubtaskData, TaskData } from "../../../types/task"
import { storage } from "../../LocalStorage/LocalStorage"

export const addSubtask = (
    currentTask: any,
    subtask: SubtaskData,
    ) => {
        const tasks:Array<TaskData> = storage.get(`Tasks_${JSON.parse(currentTask).projectID}`)!
        
        for(let i = 0; i < tasks.length; i++ ) {
            if(JSON.parse(currentTask).id === tasks[i].id) {  
                if(tasks[i].subtasks) {
                    tasks[i].subtasks.push(subtask)
                }else {
                    tasks[i].subtasks = [subtask]
                }
                
                storage.set(`Tasks_${JSON.parse(currentTask).projectID}`, tasks)

                return tasks[i].subtasks
            }
        }
        
}
