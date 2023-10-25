import { Dispatch } from "react";
import { TaskData } from "../../../types/task";
import { storage } from "../../LocalStorage/LocalStorage";
import { fetchTasks } from "../../../store/action-creator/task";
import { getTasksInStorage } from "../../../utils/getTasksInStorage";


export const updateCurrentTask = (currentTask: TaskData, dispatch:Dispatch<any>) => {
    const tasks = getTasksInStorage(currentTask)

    for(let i=0; i < tasks.length; i++) {

        if(tasks[i].id === currentTask.id) {
            tasks[i] = currentTask

            dispatch(fetchTasks('update', currentTask, tasks, currentTask.projectID))
            storage.set(`currentTask`, currentTask)

            return currentTask
        }
    } 
}
