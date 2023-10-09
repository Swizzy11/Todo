import { TaskData } from "../../types/task"
import { storage } from "../LocalStorage/LocalStorage"
import { Dispatch } from "react"
import { fetchTasks } from "../../store/action-creator/task"
import { fetchCurrentTask } from "../../store/action-creator/currentTask"
import { getTasksInStorage } from "../../utils/hooks/getTasksInStorage"

export const updatePriority = (currentTask:TaskData, priority:string, dispatch:Dispatch<any>) => {
    if(!currentTask) {
        currentTask = storage.get('currentTask')
    }

    const tasks = getTasksInStorage(currentTask)
    
    for(let i=0; i < tasks.length; i++) {
     
        if(tasks[i].id === currentTask.id) {
            tasks[i].priority = priority

            storage.set(`currentTask`, tasks[i])
            storage.set(`Tasks_${currentTask.projectID}`, tasks)

            dispatch(fetchTasks('update', tasks[i], tasks, tasks[i].projectID))
            dispatch(fetchCurrentTask('update', tasks[i]))

            return priority
        }
    }
}
