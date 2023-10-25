import { TaskData } from "../../types/task"
import { storage } from "../LocalStorage/LocalStorage"
import { Dispatch } from "react"
import { fetchTasks } from "../../store/action-creator/task"
import { fetchCurrentTask } from "../../store/action-creator/currentTask"
import { getTasksInStorage } from "../../utils/getTasksInStorage"
import { getCurrentTime } from "../../utils/getCurrentTime"

export const updateStatus = (currentTask:TaskData, status:string, dispatch:Dispatch<any>) => {
    if(!currentTask) {
        currentTask = storage.get('currentTask')
    }

    const tasks = getTasksInStorage(currentTask)
    let subtasks = currentTask.subtasks
    let isClose = false

    if(!subtasks) return

    for(let i=0; i < subtasks.length; i++) {
        isClose = (subtasks[i].status === 'done') ? true : false
    }

    if(subtasks.length === 0) {
        isClose = true
    }
    
    for(let i=0; i < tasks.length; i++) {
     
        if(tasks[i].id === currentTask.id) {
            tasks[i].status = status

            if(status === 'done' && isClose) {
                tasks[i].closeTime = getCurrentTime()
            }else {
                tasks[i].closeTime = ''
            }

            storage.set(`currentTask`, tasks[i])
            storage.set(`Tasks_${currentTask.projectID}`, tasks)

            dispatch(fetchTasks('update', tasks[i], tasks, tasks[i].projectID))
            dispatch(fetchCurrentTask('update', tasks[i], dispatch))

            return status
        }
    }
}
