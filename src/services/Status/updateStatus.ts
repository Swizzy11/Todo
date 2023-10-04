import { useDispatch } from "react-redux"
import { TaskData } from "../../types/task"
import { storage } from "../LocalStorage/LocalStorage"
import { Dispatch } from "react"
import { fetchTasks } from "../../store/action-creator/task"
import { fetchCurrentTask } from "../../store/action-creator/currentTask"

export const updateStatus = (currentTask:TaskData, status:string, dispatch:Dispatch<any>) => {
    const tasks:Array<TaskData> = storage.get(`Tasks_${currentTask.projectID}`)
    console.log(currentTask)
    for(let i=0; i < tasks.length; i++) {
        if(tasks[i].id === currentTask.id) {
            tasks[i].status = status
            storage.set(`currentTask`, tasks[i])
            storage.set(`Tasks_${currentTask.projectID}`, tasks)
            dispatch(fetchTasks('update', tasks[i], tasks, tasks[i].projectID))
            dispatch(fetchCurrentTask('update', tasks[i]))
            return tasks[i].status
        }
    }
}
