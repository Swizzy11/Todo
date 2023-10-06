import { Dispatch } from "react"
import { SubtaskData, TaskData } from "../../../types/task"
import { addSubtask } from "./addSubtask"
import { deleteSubtask } from "./deleteSubtask"
import { getSubtasks } from "./getSubtasks"
import { updateSubtask } from "./updateSubtask"


export const subtaskController = (
    method: string,
    currentTask: TaskData,
    subtask?: SubtaskData,
    status?: string,
    dispatch?: Dispatch<any>
    ) => {
            switch(method) {
                case('add'): 
                    return addSubtask(currentTask, subtask!)
                case('get'): 
                    return getSubtasks(currentTask)
                case('delete'):
                    return deleteSubtask(currentTask, subtask!)
                case('update'):
                    return updateSubtask(currentTask, subtask!, status!, dispatch)
                default:
                    return [<>Что то пошло не так</>]
            }  
    }
