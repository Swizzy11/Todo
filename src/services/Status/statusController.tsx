import { Dispatch } from "react"
import { TaskData } from "../../types/task"
import { updateStatus } from "./updateStatus"
import { updatePriority } from "./updatePriority"

export const statusController = (
    method: string,
    currentTask: TaskData,
    status: string,
    dispatch: Dispatch<any>,
    priority?: string
    ) => {
            switch(method) {
                case('update'):
                    return updateStatus(currentTask, status, dispatch)
                case('priority'):
                    return updatePriority(currentTask, priority!, dispatch)
                default:
                    return [<>Что то пошло не так</>]
            }  
    }
