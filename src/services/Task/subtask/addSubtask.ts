import { SubtaskData, TaskData } from "../../../types/task"
import { getTasksInStorage } from "../../../utils/getTasksInStorage"
import { storage } from "../../LocalStorage/LocalStorage"

export const addSubtask = (
    currentTask: TaskData,
    subtask: SubtaskData,
    ) => { 
        const tasks = getTasksInStorage(currentTask)
      
        for(let i = 0; i < tasks.length; i++ ) {

            if(currentTask.id === tasks[i].id) { 

                if(tasks[i].subtasks) {
                    tasks[i].subtasks.push(subtask)
                }else {
                    tasks[i].subtasks = [subtask]
                }
                
                storage.set(`Tasks_${currentTask.projectID}`, tasks)
                storage.set('currentTask', tasks[i])
                
                return tasks[i].subtasks
            }
        }
        
}
