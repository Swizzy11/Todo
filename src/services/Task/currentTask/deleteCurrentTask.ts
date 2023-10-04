import { Dispatch } from "react";
import { TaskAction, TaskData } from "../../../types/task";
import { storage } from "../../LocalStorage/LocalStorage";
import { fetchTasks } from "../../../store/action-creator/task";


export const deleteCurrentTask = (currentTask: TaskData, dispatch: Dispatch<any>) => {
    const clearTask = ''
    storage.set(`currentTask`, clearTask)
    return clearTask
}
