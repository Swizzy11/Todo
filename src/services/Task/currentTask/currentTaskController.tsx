import { Dispatch } from "react"
import { TaskData } from "../../../types/task"
import { getCurrentTask } from "./getCurrentTask"
import { addCurrentTask } from "./addCurrentTask"
import { deleteCurrentTask } from "./deleteCurrentTask"
import { updateCurrentTask } from "./updateCurrentTask"


export const currentTaskController = (
    method: string,
    currentTask: TaskData,
    dispatch?: Dispatch<any>,
    ) => {
            switch(method) {
                case('add'):
                    return addCurrentTask(currentTask)
                case('get'): 
                    return getCurrentTask()
                case('delete'): 
                    return deleteCurrentTask(currentTask, dispatch!)
                case('update'):
                    return updateCurrentTask(currentTask)
                default:
                    return [<>Что то пошло не так</>]
            }  
    }
