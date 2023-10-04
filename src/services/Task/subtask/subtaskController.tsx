import { SubtaskData, TaskData } from "../../../types/task"
import { addSubtask } from "./addSubtask"
import { deleteSubtask } from "./deleteSubtask"
import { getSubtasks } from "./getSubtasks"


export const subtaskController = (
    method: string,
    currentTask: TaskData,
    subtask?: SubtaskData,
    ) => {
            switch(method) {
                case('add'): 
                    return addSubtask(currentTask, subtask!)
                case('get'): 
                    return getSubtasks(currentTask)
                case('delete'):
                    return deleteSubtask(currentTask, subtask!)
                default:
                    return [<>Что то пошло не так</>]
            }  
    }
